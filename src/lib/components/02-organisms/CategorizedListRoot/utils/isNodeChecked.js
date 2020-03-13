import { getChangeObjByAnchor } from "../utils";

/**
 * Finds out if the given node is checked either by default or by
 * a change object.
 * @param {*} node
 * @param {*} changes
 */
export function isNodeChecked(node, changes) {
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changes);
  return !changeObj
    ? node.properties.isChecked
    : changeObj.properties.isChecked;
}
