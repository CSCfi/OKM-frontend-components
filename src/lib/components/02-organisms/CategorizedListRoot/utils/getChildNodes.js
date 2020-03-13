import {
  and,
  compose,
  filter,
  includes,
  init,
  join,
  prop,
  startsWith
} from "ramda";

export function getChildNodes(
  node,
  reducedStructure,
  names = ["CheckboxWithLabel", "RadioButtonWithLabel"]
) {
  // The beginning of descendants' full acnhors equals with the fullAnchorInit.
  const fullAnchorInit = compose(join("."), init, prop("anchorParts"))(node);
  // Let's find all the checkbox descendants of the checked node.
  const childNodes = filter(item => {
    // Both of the following conditions must be fulfilled:
    return (
      item.anchorParts.length - 1 === node.anchorParts.length &&
      and(
        // Item must be a descendant of the checked node.
        compose(startsWith(fullAnchorInit), prop("fullAnchor"))(item),
        // Item must be a checkbox.
        includes(item.name, names)
      )
    );
  }, reducedStructure);
  return childNodes;
}
