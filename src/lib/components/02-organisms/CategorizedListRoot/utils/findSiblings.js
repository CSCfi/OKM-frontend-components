import { dropLast, equals, filter } from "ramda";

export function findSiblings(node, reducedStructure) {
  const parentAnchorPartsInit = dropLast(2, node.anchorParts);

  const siblings = filter(siblingCandidate => {
    return (
      equals(parentAnchorPartsInit, dropLast(2, siblingCandidate.anchorParts)) &&
      equals(node.anchorParts.length, siblingCandidate.anchorParts.length) &&
      node.fullAnchor !== siblingCandidate.fullAnchor
    );
  }, reducedStructure);
  console.info("Siblings", siblings);
  return siblings;
}
