import { dropLast, equals, filter } from "ramda";
export function findSiblings(node, reducedStructure) {
  var parentAnchorPartsInit = dropLast(2, node.anchorParts);
  var siblings = filter(function (siblingCandidate) {
    return equals(parentAnchorPartsInit, dropLast(2, siblingCandidate.anchorParts)) && equals(node.anchorParts.length, siblingCandidate.anchorParts.length) && node.fullAnchor !== siblingCandidate.fullAnchor;
  }, reducedStructure);
  console.info("Siblings", siblings);
  return siblings;
}