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

export const getChangeObjIndexByAnchor = (anchor, changes) => {
  return R.findIndex(R.propEq("anchor", anchor), changes);
};

export const getChangeObjByAnchor = (anchor, changes) => {
  return R.find(R.propEq("anchor", anchor), changes);
};

// export const checkLeafNode = (node, reducedStructure, changes) => {
//   const changeObj = getChangeObjByAnchor(node.fullAnchor, changes);
//   if (changeObj && !changeObj.properties.isChecked) {
//     changes = R.filter(R.compose(R.not, R.propEq("anchor")(node.fullAnchor)))(
//       changes
//     );
//   } else if (!changeObj && !node.properties.isChecked) {
//     const childNodes = getChildCheckboxNodes(node, reducedStructure);
//     const areAllChildNodesChecked = R.find(childNode => {
//       return isNodeChecked(childNode, changes);
//     }, childNodes);
//     console.info(areAllChildNodesChecked);
//     changes = R.append(
//       {
//         anchor: node.fullAnchor,
//         properties: {
//           metadata: node.properties.forChangeObject,
//           isChecked: true,
//           isIndeterminate: !areAllChildNodesChecked
//         }
//       },
//       changes
//     );
//   }
//   console.info(changes);
//   return changes;
// };

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
  // Target node.
  const node = R.prop("original", nodeWithRequestedChanges);
  // Requested changes.
  const requestedChanges = R.prop("requestedChanges", nodeWithRequestedChanges);
  // First part of every anchor will be removed.
  let changesWithoutRootAnchor = rootAnchor
    ? R.map(changeObj => {
        const reducedAnchor = removeAnchorPart(changeObj.anchor, 0);
        return R.assoc("anchor", reducedAnchor, changeObj);
      }, changes)
    : changes;

  if (requestedChanges.isChecked) {
    /**
     * If user has clicked an unchecked checkbox or a radio button we must do
     * two things:
     * 1) Activate the node and its descendants.
     */
    changesWithoutRootAnchor = activateNodeAndItsDescendants(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
    // 2) Activate node's predecessors.
    changesWithoutRootAnchor = activatePredecessors(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  } else if (requestedChanges.isChecked === false) {
    /**
     * If user has clicked a checked checkbox or a radio button we must do
     * two things:
     * 1) Deactivate the node and its descendants.
     */
    changesWithoutRootAnchor = deactivateNodeAndItsDescendants(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
    // 2) Deactivate node's predecessors.
    changesWithoutRootAnchor = deactivatePredecessors(
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

  changesWithoutRootAnchor = removeDeprecatedChanges(changesWithoutRootAnchor);

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
