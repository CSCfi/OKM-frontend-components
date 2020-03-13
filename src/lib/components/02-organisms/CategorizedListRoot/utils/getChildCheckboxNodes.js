import { getChildNodes } from "./getChildNodes";

/**
 * Returns all checkbox child nodes of the node.
 * @param {*} node
 * @param {*} reducedStructure
 */
export function getChildCheckboxNodes(node, reducedStructure) {
  return getChildNodes(node, reducedStructure, ["CheckboxWithLabel"]);
}
