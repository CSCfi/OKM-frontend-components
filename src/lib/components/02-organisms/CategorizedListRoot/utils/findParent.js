import { dropLast, equals, find, includes } from "ramda";

export function findParent(node, reducedStructure, nodeNames = []) {
  console.info("Finding the parent of ", node);
  const parentNode = find(_node => {
    return (
      _node.level === node.level - 1 &&
      _node.columnIndex === 0 &&
      (nodeNames.length > 0 ? includes(_node.name, nodeNames) : true) &&
      equals(dropLast(1, _node.anchorParts), dropLast(2, node.anchorParts))
    );
  }, reducedStructure);
  console.info("Found: ", parentNode);
  return parentNode;
}
