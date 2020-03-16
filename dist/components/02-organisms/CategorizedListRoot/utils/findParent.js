import { dropLast, equals, find, includes } from "ramda";
export function findParent(node, reducedStructure) {
  var nodeNames = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  console.info("Finding the parent of ", node);
  var parentNode = find(function (_node) {
    return _node.level === node.level - 1 && _node.columnIndex === 0 && (nodeNames.length > 0 ? includes(_node.name, nodeNames) : true) && equals(dropLast(1, _node.anchorParts), dropLast(2, node.anchorParts));
  }, reducedStructure);
  console.info("Found: ", parentNode);
  return parentNode;
}