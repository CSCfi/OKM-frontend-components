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
export const getChangesByLevel = (level, changes) => {
  return changes.filter(change => {
    const categoryDepth = R.filter(v => {
      return v === "categories";
    }, change.path || []).length;
    return categoryDepth === level;
  });
};

export const findCategoryAnchor = (
  category,
  anchor,
  structure = [],
  level = 0,
  path = []
) => {
  if (category.components) {
    path = R.append("components", path);
    R.addIndex(R.forEach)((component, index) => {
      path = R.append(index, path);
      const fullAnchor = R.join(".", [anchor, component.anchor]);
      structure = R.append(
        {
          ...component,
          anchorParts: R.split(".", fullAnchor),
          fullAnchor,
          level,
          columnIndex: index,
          path
        },
        structure
      );
    }, category.components);
  }

  if (category.categories && category.categories.length) {
    path = R.append("categories", path);
    return R.map(_category => {
      return findCategoryAnchor(
        _category,
        R.join(".", [anchor, _category.anchor]),
        structure,
        level + 1,
        path
      );
    }, category.categories);
  }
  return structure;
};

export const getReducedStructure = categories => {
  return R.uniq(
    R.flatten(
      R.map(category => {
        return findCategoryAnchor(category, category.anchor);
      }, categories)
    )
  );
};

export const getTargetNode = (loopChange, reducedStructure) => {
  return {
    original: R.find(
      R.propEq("fullAnchor", R.prop("anchor", loopChange)),
      reducedStructure
    ),
    requestedChanges: loopChange ? loopChange.properties : {}
  };
};

const findParent = (node, reducedStructure) => {
  const parentNode = R.find(_node => {
    return (
      _node.level === node.level - 1 &&
      _node.columnIndex === 0 &&
      R.equals(
        R.dropLast(1, _node.anchorParts),
        R.dropLast(2, node.anchorParts)
      )
    );
  }, reducedStructure);
  return parentNode;
};

const findSiblings = (node, reducedStructure) => {
  const component = R.find(
    R.propEq("fullAnchor", node.fullAnchor),
    reducedStructure
  );
  let siblings = R.filter(_component => {
    const isSibling = !R.equals(node.fullAnchor, _component.fullAnchor);
    return isSibling && R.equals(component.level, _component.level);
  }, reducedStructure);
  if (component.level > 0) {
    siblings = R.filter(component => {
      const isAnchorLengthEqual = R.equals(
        R.prop("anchorParts", component).length,
        node.anchorParts.length
      );
      const isFirstPartOfAnchorEqual = R.compose(
        R.equals(R.head(node.anchorParts)),
        R.head,
        R.split("."),
        R.prop("fullAnchor")
      )(component);
      const isSibling = !R.equals(node.fullAnchor, component.fullAnchor);

      return isAnchorLengthEqual && isFirstPartOfAnchorEqual && isSibling;
    }, reducedStructure);
  }
  return siblings;
};

const getChangeObjIndexByAnchor = (anchor, changes) => {
  return R.findIndex(R.propEq("anchor", anchor), changes);
};

const getChangeObjByAnchor = (anchor, changes) => {
  return R.find(R.propEq("anchor", anchor), changes);
};

const disableNodes = (nodes, reducedStructure, changes, index = 0) => {
  const node = R.view(R.lensIndex(index))(nodes);
  const categoryAnchor = R.dropLast(1, node.anchorParts);
  const childNodes = R.filter(_node => {
    return R.equals(R.dropLast(2, _node.anchorParts), categoryAnchor);
  }, reducedStructure);
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changes);
  if (changeObj) {
    if (changeObj.properties.isChecked) {
      changes = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(
        changes
      );
    }
  } else if (node.properties.isChecked) {
    changes = R.append(
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
          isChecked: false
        }
      },
      changes
    );
  }

  if (childNodes.length) {
    changes = disableNodes(childNodes, reducedStructure, changes);
  }

  if (index < nodes.length - 1) {
    return disableNodes(nodes, reducedStructure, changes, index + 1);
  }
  return changes;
};

function isNodeChecked(node, changes) {
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changes);
  return !changeObj
    ? node.properties.isChecked
    : changeObj.properties.isChecked;
}

export const checkLeafNode = (node, reducedStructure, changes) => {
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changes);
  if (changeObj && !changeObj.properties.isChecked) {
    changes = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(
      changes
    );
  } else if (!changeObj && !node.properties.isChecked) {
    const childNodes = getChildCheckboxNodes(node, reducedStructure);
    const areAllChildNodesChecked = R.find(childNode => {
      return isNodeChecked(childNode, changes);
    }, childNodes);
    console.info(areAllChildNodesChecked);
    changes = R.append(
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
          isChecked: true,
          isIndeterminate: !areAllChildNodesChecked
        }
      },
      changes
    );
  }
  console.info(changes);
  return changes;
};

export const checkNode = (node, reducedStructure, changes) => {
  changes = checkLeafNode(node, reducedStructure, changes);
  const parentNode = findParent(node, reducedStructure);
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

/**
 * Disables the node's siblings.
 * @param {object} node - Target item.
 * @param {array} reducedStructure - Flatten array of all items on the form.
 * @param {array} changes - Array of change objects.
 */
const disableSiblings = (node, reducedStructure, changes) => {
  const radioSiblings = R.filter(
    R.and(
      R.propEq("columnIndex", node.columnIndex),
      R.propEq("name", "RadioButtonWithLabel")
    )
  )(findSiblings(node, reducedStructure));
  if (radioSiblings.length) {
    return disableNodes(radioSiblings, reducedStructure, changes);
  }
  return changes;
};

function getChildNodes(
  node,
  reducedStructure,
  names = ["CheckboxWithLabel", "RadioButtonWithLabel"]
) {
  // The beginning of descendants' full acnhors equals with the fullAnchorInit.
  const fullAnchorInit = R.compose(
    R.join("."),
    R.init,
    R.prop("anchorParts")
  )(node);
  // Let's find all the checkbox descendants of the checked node.
  const childNodes = R.filter(item => {
    // Both of the following conditions must be fulfilled:
    return (
      item.anchorParts.length - 1 === node.anchorParts.length &&
      R.and(
        // Item must be a descendant of the checked node.
        R.compose(R.startsWith(fullAnchorInit), R.prop("fullAnchor"))(item),
        // Item must be a checkbox.
        R.includes(item.name, names)
      )
    );
  }, reducedStructure);
  return childNodes;
}

function getChildCheckboxNodes(node, reducedStructure) {
  return getChildNodes(node, reducedStructure, ["CheckboxWithLabel"]);
}

function checkChildNodes(node, reducedStructure, changes) {
  const childNodes = getChildCheckboxNodes(node, reducedStructure);

  // Let's check the node
  changes = checkNode(node, reducedStructure, changes);

  // Let's check / activate all the descendants.
  if (childNodes.length) {
    changes = R.uniq(
      R.flatten(
        R.map(childNode => {
          return checkChildNodes(childNode, reducedStructure, changes);
        }, childNodes)
      )
    );
  } else {
    console.info(changes);
  }

  return changes;
}

const runActivationProcedure = (
  node,
  reducedStructure,
  changesWithoutRootAnchor
) => {
  const changeObj = getChangeObjByAnchor(
    node.fullAnchor,
    changesWithoutRootAnchor
  );
  if (changeObj && !changeObj.properties.isChecked) {
    changesWithoutRootAnchor = R.filter(
      R.compose(R.not, R.propEq("anchor")(node.fullAnchor))
    )(changesWithoutRootAnchor);
  } else if (!changeObj && !node.properties.isChecked) {
    changesWithoutRootAnchor = R.append(
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
          isChecked: true
        }
      },
      changesWithoutRootAnchor
    );
  }

  if (node.name === "RadioButtonWithLabel") {
    changesWithoutRootAnchor = disableSiblings(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  }

  if (node.name === "CheckboxWithLabel") {
    changesWithoutRootAnchor = checkChildNodes(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  }

  const parentNode = findParent(node, reducedStructure);

  if (
    parentNode &&
    (parentNode.name === "CheckboxWithLabel" ||
      parentNode.name === "RadioButtonWithLabel")
  ) {
    changesWithoutRootAnchor = checkNode(
      parentNode,
      reducedStructure,
      changesWithoutRootAnchor
    );
  }
  return changesWithoutRootAnchor;
};

/**
 * Function handles the unchecking / deactivation of a radio button or checkbox.
 * @param {object} node - Target node a.k.a clicked checbox / radio button.
 * @param {array} reducedStructure - Flatten array of all items on the form.
 * @param {array} changesWithoutRootAnchor - Array of change objects.
 */
const runDeactivationProcedure = (
  node,
  reducedStructure,
  changesWithoutRootAnchor
) => {
  // Let's find the change object of the node under activation.
  const changeObj = getChangeObjByAnchor(
    node.fullAnchor,
    changesWithoutRootAnchor
  );
  if (changeObj && changeObj.properties.isChecked === true) {
    /**
     * If change object was found and the node is already checked
     * the change object must be removed.
     **/
    changesWithoutRootAnchor = R.filter(
      R.compose(R.not, R.propEq("anchor", node.fullAnchor))
    )(changesWithoutRootAnchor);
  } else if (!changeObj && node.properties.isChecked === true) {
    /**
     * If there are no changes and node was already checked a new change
     * object must be created and added to the array of change objects.
     * The change object overrides the isChecked property of the node and it
     * will include the metadata of the node too.
     */
    changesWithoutRootAnchor = R.append(
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
          isChecked: false
        }
      },
      changesWithoutRootAnchor
    );
  }

  /**
   * Okay... the clicked node has been handled now. Next we have to handle it's
   * parent node and child nodes. If the node has a parent and the name of the
   * parent is CheckboxWithLabel the parent must be put to indeterminate state
   * (-).
   */
  const parentNode = findParent(node, reducedStructure);

  if (parentNode.name === "CheckboxWithLabel") {
    // Let's find out the index of the parent's change object.
    const parentChangeObjIndex = getChangeObjIndexByAnchor(
      parentNode.fullAnchor,
      changesWithoutRootAnchor
    );
    // Index's value greater than -1 means that change object was found.
    if (parentChangeObjIndex > -1) {
      /**
       * This "complex" code sets the value of isIndeterminate property as
       * true. The array of change objects will be updated.
       **/
      changesWithoutRootAnchor = R.over(
        R.lensIndex(parentChangeObjIndex),
        changeObject => {
          return {
            ...changeObject,
            properties: { ...changeObject.properties, isIndeterminate: true }
          };
        },
        changesWithoutRootAnchor
      );
      console.info(changesWithoutRootAnchor);
    }
  }

  /**
   * So what next... the child nodes. They must be walked through and
   * deactivated. Let's find them first.
   */
  const childNodes = getChildNodes(node, reducedStructure);

  // If there are any we deactivate them.
  if (childNodes) {
    return disableNodes(childNodes, reducedStructure, changesWithoutRootAnchor);
  }
  return changesWithoutRootAnchor;
};

const getPropertiesObject = (changeObj = {}, requestedChanges) => {
  return Object.assign({}, changeObj.properties || {}, requestedChanges);
};

/**
 * Main function. This will be run when user makes changes.
 *
 * @param {object} nodeWithRequestedChanges
 * @param {object} nodeWithRequestedChanges.requestedChanges - Property object.
 * @param {array} changes - Array of change objects.
 */
export const handleNodeMain = (
  nodeWithRequestedChanges,
  rootAnchor,
  reducedStructure,
  changes = []
) => {
  const node = R.prop("original", nodeWithRequestedChanges);
  const requestedChanges = R.prop("requestedChanges", nodeWithRequestedChanges);
  let changesWithoutRootAnchor = rootAnchor
    ? R.map(changeObj => {
        const reducedAnchor = removeAnchorPart(changeObj.anchor, 0);
        return R.assoc("anchor", reducedAnchor, changeObj);
      }, changes)
    : changes;

  if (requestedChanges.isChecked) {
    changesWithoutRootAnchor = runActivationProcedure(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  } else if (requestedChanges.isChecked === false) {
    changesWithoutRootAnchor = runDeactivationProcedure(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  } else {
    const changeObj = getChangeObjByAnchor(
      node.fullAnchor,
      changesWithoutRootAnchor
    );
    const propsObj = getPropertiesObject(changeObj, requestedChanges);
    const updatedChangeObj = { anchor: node.fullAnchor, properties: propsObj };
    if (changeObj) {
      changesWithoutRootAnchor = R.map(_changeObj => {
        if (R.equals(_changeObj.anchor, updatedChangeObj.anchor)) {
          return updatedChangeObj;
        }
        return _changeObj;
      }, changesWithoutRootAnchor);
    } else {
      changesWithoutRootAnchor = R.append(
        updatedChangeObj,
        changesWithoutRootAnchor
      );
    }
  }

  const updatedChangesArr = rootAnchor
    ? R.map(changeObj => {
        return R.assoc(
          "anchor",
          `${rootAnchor}.${changeObj.anchor}`,
          changeObj
        );
      }, changesWithoutRootAnchor)
    : changesWithoutRootAnchor;
  console.info(updatedChangesArr);
  return updatedChangesArr;
};

export const getChangesForReadOnlyLomake = (
  reducedStructure,
  index = 0,
  changes = []
) => {
  const changeObj = {
    anchor: reducedStructure[index].fullAnchor,
    properties: { isReadOnly: true }
  };
  const targetNode = getTargetNode(changeObj, reducedStructure);
  const cumulativeChanges = handleNodeMain(
    targetNode,
    null,
    reducedStructure,
    changes
  );
  if (R.view(R.lensIndex(index + 1))(reducedStructure)) {
    return getChangesForReadOnlyLomake(
      reducedStructure,
      index + 1,
      cumulativeChanges
    );
  }
  return cumulativeChanges;
};
