import { filter } from "ramda";
import { isNodeChecked } from "./isNodeChecked";
/**
 * Returns true if every node is unchecked.
 * @param {object} node - Target node.
 * @param {array} changeObjects - Array of change objects.
 */

export function isEveryNodeUnchecked() {
  var nodes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var changeObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var checkedNodes = filter(function (childNode) {
    return isNodeChecked(childNode, changeObjects);
  }, nodes);
  return checkedNodes.length === 0;
}