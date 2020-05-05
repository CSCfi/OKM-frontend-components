import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import * as R from "ramda";
import { activatePredecessors } from "./utils/activatePredecessors";
import { deactivatePredecessors } from "./utils/deactivatePredecessors";
import { activateNodeAndItsDescendants } from "./utils/activateNodeAndItsDescendants";
import { deactivateNodeAndItsDescendants } from "./utils/deactivateNodeAndItsDescendants";
import { removeAnchorPart } from "../../../utils/common";
import { removeDeprecatedChanges } from "./utils/removeDeprecatedChanges";
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
    path = R.append("components", path);
    R.addIndex(R.forEach)(function (component, index) {
      path = R.append(index, path);
      var fullAnchor = R.join(".", [anchor, component.anchor]);
      structure = R.append(_objectSpread({}, component, {
        anchorParts: R.split(".", fullAnchor),
        formId: category.formId,
        fullAnchor: fullAnchor,
        level: level,
        columnIndex: index,
        path: path
      }), structure);
    }, category.components);
  }

  if (category.categories && category.categories.length) {
    path = R.append("categories", path);
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
export var getChangeObjIndexByAnchor = function getChangeObjIndexByAnchor(anchor, changes) {
  return R.findIndex(R.propEq("anchor", anchor), changes);
};
export var getChangeObjByAnchor = function getChangeObjByAnchor(anchor, changes) {
  return R.find(R.propEq("anchor", anchor), changes);
};

var getPropertiesObject = function getPropertiesObject() {
  var changeObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var requestedChanges = arguments.length > 1 ? arguments[1] : undefined;
  return Object.assign({}, changeObj.properties || {}, requestedChanges);
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
/**
 * Function handles the new changes of a form and returns an updated array of
 * change objects.
 * @param {object} nodeWithRequestedChanges - Target node and requested changes.
 * @param {object} nodeWithRequestedChanges.requestedChanges - Properties object.
 * @param {array} changes - Array of change objects.
 */

export var handleNodeMain = function handleNodeMain(nodeWithRequestedChanges, rootAnchor, reducedStructure) {
  var changes = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  /**
   * node = definition of a component that user has interacted with. Node
   * is an object that includes a name (e.g. CheckboxWithLabel) and the
   * properties defined on the current form.
   * E.g.
   *
   * {
   *   anchor: "A",
   *   name: "CheckboxWithLabel",
   *   properties: {
   *     code: "A.A.A",
   *     isChecked: false,
   *     labelStyles: {
   *       addition: { color: "purple" },
   *       removal: { color: "purple", textDecoration: "line-through" },
   *       custom: { fontWeight: 600 }
   *     },
   *     name: "example-checkbox",
   *     title: "Osaamisala 1",
   *     value: "Testi"
   *   },
   *   anchorParts: ["A", "A", "A"],
   *   fullAnchor: "A.A.A",
   *   level: 1,
   *   columnIndex: 0,
   *   path: ["components", 0, "categories", "components", 0]
   * };
   **/
  var node = R.prop("original", nodeWithRequestedChanges); // Requested changes. E.g. {"isChecked":true}

  var requestedChanges = R.prop("requestedChanges", nodeWithRequestedChanges); // First part of every anchor will be removed.

  var changeObjects = rootAnchor ? R.map(function (changeObj) {
    var reducedAnchor = removeAnchorPart(changeObj.anchor, 0);
    return R.assoc("anchor", reducedAnchor, changeObj);
  }, changes) : changes;

  if (requestedChanges.isChecked) {
    /**
     * If user has clicked an unchecked checkbox or a radio button we must do
     * two things:
     * 1) Activate the node and its descendants.
     */
    changeObjects = activateNodeAndItsDescendants(node, reducedStructure, changeObjects); // 2) Activate the node's predecessors.

    changeObjects = activatePredecessors(node, reducedStructure, changeObjects);
  } else if (requestedChanges.isChecked === false) {
    /**
     * If user has clicked a checked checkbox or a radio button we must do
     * two things:
     * 1) Deactivate the node and its descendants.
     */
    changeObjects = deactivateNodeAndItsDescendants(node, reducedStructure, changeObjects); // 2) Deactivate the node's predecessors.

    changeObjects = deactivatePredecessors(node, reducedStructure, changeObjects);
  } else {
    /**
     * Otherwise the properties of the new change object will be merged with
     * the properties of the earlier changes of the current node.
     **/
    var changeObj = getChangeObjByAnchor(node.fullAnchor, changeObjects);
    var propsObj = getPropertiesObject(changeObj, requestedChanges);
    var updatedChangeObj = {
      anchor: node.fullAnchor,
      properties: propsObj
    };

    if (changeObj) {
      /**
       * The earlier change object related to the node will be replaced with the
       * updated one.
       **/
      changeObjects = R.map(function (_changeObj) {
        if (R.equals(_changeObj.anchor, updatedChangeObj.anchor)) {
          return updatedChangeObj;
        }

        return _changeObj;
      }, changeObjects);
    } else {
      /**
       * If there wasn't an earlier change object then we add the freshly made
       * change object on to the array of change objects.
       **/
      changeObjects = R.append(updatedChangeObj, changeObjects);
    }
  }

  changeObjects = removeDeprecatedChanges(changeObjects); // Last thing is to prefix the anchors of change objects with the root anchor.

  var updatedChangesArr = rootAnchor ? R.map(function (changeObj) {
    return R.assoc("anchor", "".concat(rootAnchor, ".").concat(changeObj.anchor), changeObj);
  }, changeObjects) : changeObjects; // Updated array of change objects will be returned.

  return updatedChangesArr;
};