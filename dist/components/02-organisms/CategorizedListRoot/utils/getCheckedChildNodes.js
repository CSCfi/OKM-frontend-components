import { filter } from "ramda";
import { isNodeChecked } from "./isNodeChecked";
import { getChildNodes } from "./getChildNodes";
export function getCheckedChildNodes(node, reducedStructure) {
  var changeObjects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var childNodes = getChildNodes(node, reducedStructure);
  return filter(function (childNode) {
    return isNodeChecked(childNode, changeObjects);
  }, childNodes);
}