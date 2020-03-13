import {
  compose,
  equals,
  filter,
  find,
  head,
  prop,
  propEq,
  split
} from "ramda";

export function findSiblings(node, reducedStructure) {
  const component = find(
    propEq("fullAnchor", node.fullAnchor),
    reducedStructure
  );
  let siblings = filter(_component => {
    const isSibling = !equals(node.fullAnchor, _component.fullAnchor);
    return isSibling && equals(component.level, _component.level);
  }, reducedStructure);
  if (component.level > 0) {
    siblings = filter(component => {
      const isAnchorLengthEqual = equals(
        prop("anchorParts", component).length,
        node.anchorParts.length
      );
      const isFirstPartOfAnchorEqual = compose(
        equals(head(node.anchorParts)),
        head,
        split("."),
        prop("fullAnchor")
      )(component);
      const isSibling = !equals(node.fullAnchor, component.fullAnchor);

      return isAnchorLengthEqual && isFirstPartOfAnchorEqual && isSibling;
    }, reducedStructure);
  }
  return siblings;
}
