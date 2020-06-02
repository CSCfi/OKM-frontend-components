import { filter } from "ramda";
import { isNodeChecked } from "./isNodeChecked";
import { getChildNodes } from "./getChildNodes";
/**
 * Returns true if every child node is unchecked.
 * @param {object} node - Target node.
 * @param {array} reducedStructure - One dimensional presentation of the fields of the current form.
 * @param {array} changeObjects - Array of change objects.
 */

export function isEveryChildNodeUnchecked(node, reducedStructure) {
  var changeObjects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var childNodes = getChildNodes(node, reducedStructure);
  var checkedChildNodes = filter(function (childNode) {
    return isNodeChecked(childNode, changeObjects);
  }, childNodes);
  return checkedChildNodes.length === 0;
}