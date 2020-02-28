import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import * as R from "ramda";
import { removeAnchorPart } from "../../../utils/common";
/**
 * @module CategorizedListRoot/utils
 **/

/**
 * Returns changes by level.
 *
 * @param {number} level
 * @param {array} changes
 */

export var getChangesByLevel = function getChangesByLevel(level, changes) {
  return changes.filter(function (change) {
    var categoryDepth = R.filter(function (v) {
      return v === "categories";
    }, change.path || []).length;
    return categoryDepth === level;
  });
};
export var findCategoryAnchor = function findCategoryAnchor(category, anchor) {
  var structure = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  if (category.components) {
    path = R.insert(-1, "components", path);
    R.addIndex(R.forEach)(function (component, index) {
      path = R.insert(-1, index, path);
      var fullAnchor = R.join(".", [anchor, component.anchor]);
      structure = R.insert(-1, _objectSpread({}, component, {
        anchorParts: R.split(".", fullAnchor),
        fullAnchor: fullAnchor,
        level: level,
        columnIndex: index,
        path: path
      }), structure);
    }, category.components);
  }

  if (category.categories && category.categories.length) {
    path = R.insert(-1, "categories", path);
    return R.map(function (_category) {
      return findCategoryAnchor(_category, R.join(".", [anchor, _category.anchor]), structure, level + 1, path);
    }, category.categories);
  }

  return structure;
};
export var getReducedStructure = function getReducedStructure(categories) {
  return R.uniq(R.flatten(R.map(function (category) {
    return findCategoryAnchor(category, category.anchor);
  }, categories)));
};
export var getTargetNode = function getTargetNode(loopChange, reducedStructure) {
  return {
    original: R.find(R.propEq("fullAnchor", R.prop("anchor", loopChange)), reducedStructure),
    requestedChanges: loopChange ? loopChange.properties : {}
  };
};

var findParent = function findParent(node, reducedStructure) {
  var parentNode = R.find(function (_node) {
    return _node.level === node.level - 1 && _node.columnIndex === 0 && R.equals(R.dropLast(1, _node.anchorParts), R.dropLast(2, node.anchorParts));
  }, reducedStructure);
  return parentNode;
};

var findSiblings = function findSiblings(node, reducedStructure) {
  var component = R.find(R.propEq("fullAnchor", node.fullAnchor), reducedStructure);
  var siblings = R.filter(function (_component) {
    var isSibling = !R.equals(node.fullAnchor, _component.fullAnchor);
    return isSibling && R.equals(component.level, _component.level);
  }, reducedStructure);

  if (component.level > 0) {
    siblings = R.filter(function (component) {
      var isAnchorLengthEqual = R.equals(R.prop("anchorParts", component).length, node.anchorParts.length);
      var isFirstPartOfAnchorEqual = R.compose(R.equals(R.head(node.anchorParts)), R.head, R.split("."), R.prop("fullAnchor"))(component);
      var isSibling = !R.equals(node.fullAnchor, component.fullAnchor);
      return isAnchorLengthEqual && isFirstPartOfAnchorEqual && isSibling;
    }, reducedStructure);
  }

  return siblings;
};

var getChangeObjByAnchor = function getChangeObjByAnchor(anchor, changes) {
  return R.find(R.propEq("anchor", anchor), changes);
};

var disableNodes = function disableNodes(nodes, reducedStructure, changes) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var node = R.view(R.lensIndex(index))(nodes);
  var categoryAnchor = R.dropLast(1, node.anchorParts);
  var childNodes = R.filter(function (_node) {
    return R.equals(R.dropLast(2, _node.anchorParts), categoryAnchor);
  }, reducedStructure);
  var changeObj = getChangeObjByAnchor(node.fullAnchor, changes);

  if (changeObj) {
    if (changeObj.properties.isChecked) {
      changes = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(changes);
    }
  } else if (node.properties.isChecked) {
    changes = R.insert(-1, {
      anchor: node.fullAnchor,
      properties: {
        metadata: node.properties.forChangeObject,
        isChecked: false
      }
    }, changes);
  }

  if (childNodes.length) {
    changes = disableNodes(childNodes, reducedStructure, changes);
  }

  if (index < nodes.length - 1) {
    return disableNodes(nodes, reducedStructure, changes, index + 1);
  }

  return changes;
};

export var checkLeafNode = function checkLeafNode(node, changes) {
  var changeObj = getChangeObjByAnchor(node.fullAnchor, changes);

  if (changeObj && !changeObj.properties.isChecked) {
    changes = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(changes);
  } else if (!changeObj && !node.properties.isChecked) {
    changes = R.insert(-1, {
      anchor: node.fullAnchor,
      properties: {
        metadata: node.properties.forChangeObject,
        isChecked: true
      }
    }, changes);
  }

  return changes;
};
export var checkNode = function checkNode(node, reducedStructure, changes) {
  changes = checkLeafNode(node, changes);
  var parentNode = findParent(node, reducedStructure);

  if (parentNode) {
    if (parentNode.name === "RadioButtonWithLabel") {
      changes = disableSiblings(node, reducedStructure, changes);
    }

    changes = checkNode(parentNode, reducedStructure, changes);
  }

  if (node.name === "RadioButtonWithLabel") {
    return disableSiblings(node, reducedStructure, changes);
  }

  return changes;
};

var disableSiblings = function disableSiblings(node, reducedStructure, changes) {
  var radioSiblings = R.filter(R.and(R.propEq("columnIndex", node.columnIndex), R.propEq("name", "RadioButtonWithLabel")))(findSiblings(node, reducedStructure));

  if (radioSiblings.length) {
    return disableNodes(radioSiblings, reducedStructure, changes);
  }

  return changes;
};

var runActivationProcedure = function runActivationProcedure(node, reducedStructure, changesWithoutRootAnchor) {
  var changeObj = getChangeObjByAnchor(node.fullAnchor, changesWithoutRootAnchor);

  if (changeObj && !changeObj.properties.isChecked) {
    changesWithoutRootAnchor = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(changesWithoutRootAnchor);
  } else if (!changeObj && !node.properties.isChecked) {
    changesWithoutRootAnchor = R.insert(-1, {
      anchor: node.fullAnchor,
      properties: {
        metadata: node.properties.forChangeObject,
        isChecked: true
      }
    }, changesWithoutRootAnchor);
  }

  if (node.name === "RadioButtonWithLabel") {
    changesWithoutRootAnchor = disableSiblings(node, reducedStructure, changesWithoutRootAnchor);
  }

  var parentNode = findParent(node, reducedStructure);

  if (parentNode && (parentNode.name === "CheckboxWithLabel" || parentNode.name === "RadioButtonWithLabel")) {
    changesWithoutRootAnchor = checkNode(parentNode, reducedStructure, changesWithoutRootAnchor);
  }

  return changesWithoutRootAnchor;
};

var runDeactivationProcedure = function runDeactivationProcedure(node, reducedStructure, changesWithoutRootAnchor) {
  var changeObj = getChangeObjByAnchor(node.fullAnchor, changesWithoutRootAnchor);

  if (changeObj && changeObj.properties.isChecked === true) {
    changesWithoutRootAnchor = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(changesWithoutRootAnchor);
  } else if (!changeObj && node.properties.isChecked === true) {
    changesWithoutRootAnchor = R.insert(-1, {
      anchor: node.fullAnchor,
      properties: {
        metadata: node.properties.forChangeObject,
        isChecked: false
      }
    }, changesWithoutRootAnchor);
  }

  var categoryAnchor = R.dropLast(1, node.anchorParts);
  var childNodes = R.filter(function (_node) {
    return R.equals(R.dropLast(2, _node.anchorParts), categoryAnchor);
  }, reducedStructure);

  if (childNodes.length) {
    return disableNodes(childNodes, reducedStructure, changesWithoutRootAnchor);
  }

  return changesWithoutRootAnchor;
};

var getPropertiesObject = function getPropertiesObject() {
  var changeObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var requestedChanges = arguments.length > 1 ? arguments[1] : undefined;
  return Object.assign({}, changeObj.properties || {}, requestedChanges);
};
/**
 * Main function. This will be run when user makes changes.
 *
 * @param {object} nodeWithRequestedChanges
 * @param {object} nodeWithRequestedChanges.requestedChanges - Property object.
 * @param {array} changes - Array of change objects.
 */


export var handleNodeMain = function handleNodeMain(nodeWithRequestedChanges, rootAnchor, reducedStructure) {
  var changes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var node = R.prop("original", nodeWithRequestedChanges);
  var requestedChanges = R.prop("requestedChanges", nodeWithRequestedChanges);
  var changesWithoutRootAnchor = rootAnchor ? R.map(function (changeObj) {
    var reducedAnchor = removeAnchorPart(changeObj.anchor, 0);
    return R.assoc("anchor", reducedAnchor, changeObj);
  }, changes) : changes;

  if (requestedChanges.isChecked) {
    changesWithoutRootAnchor = runActivationProcedure(node, reducedStructure, changesWithoutRootAnchor);
  } else if (requestedChanges.isChecked === false) {
    changesWithoutRootAnchor = runDeactivationProcedure(node, reducedStructure, changesWithoutRootAnchor);
  } else {
    var changeObj = getChangeObjByAnchor(node.fullAnchor, changesWithoutRootAnchor);
    var propsObj = getPropertiesObject(changeObj, requestedChanges);
    var updatedChangeObj = {
      anchor: node.fullAnchor,
      properties: propsObj
    };

    if (changeObj) {
      changesWithoutRootAnchor = R.map(function (_changeObj) {
        if (R.equals(_changeObj.anchor, updatedChangeObj.anchor)) {
          return updatedChangeObj;
        }

        return _changeObj;
      }, changesWithoutRootAnchor);
    } else {
      changesWithoutRootAnchor = R.insert(-1, updatedChangeObj, changesWithoutRootAnchor);
    }
  }

  var updatedChangesArr = rootAnchor ? R.map(function (changeObj) {
    return R.assoc("anchor", "".concat(rootAnchor, ".").concat(changeObj.anchor), changeObj);
  }, changesWithoutRootAnchor) : changesWithoutRootAnchor;
  return updatedChangesArr;
};
export var getChangesForReadOnlyLomake = function getChangesForReadOnlyLomake(reducedStructure) {
  var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var changes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var changeObj = {
    anchor: reducedStructure[index].fullAnchor,
    properties: {
      isReadOnly: true
    }
  };
  var targetNode = getTargetNode(changeObj, reducedStructure);
  var cumulativeChanges = handleNodeMain(targetNode, null, reducedStructure, changes);

  if (R.view(R.lensIndex(index + 1))(reducedStructure)) {
    return getChangesForReadOnlyLomake(reducedStructure, index + 1, cumulativeChanges);
  }

  return cumulativeChanges;
};