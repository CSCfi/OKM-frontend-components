import { getChangeObjByAnchor } from "../utils";

/**
 * Finds out if the given node is checked either by default or by
 * a change object.
 * @param {object} node - Includes an anchor and a properties object.
 * @param {*} changeObjects
 */
export function isNodeChecked(node, changeObjects) {
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changeObjects);
  return !changeObj
    ? node.properties.isChecked
    : changeObj.properties.isChecked;
}
