import { and, compose, filter, includes, init, join, prop, startsWith } from "ramda";
/**
 * Finds the child nodes of the given node filtered by names array.
 * @param {object} node - Includes an anchor and a properties object.
 * @param {array} reducedStructure - Flatten structure of a form.
 * @param {array} names - Array of node / component names.
 * @returns {array} - Array of child nodes.
 */

export function getChildNodes(node, reducedStructure) {
  var names = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ["CheckboxWithLabel", "RadioButtonWithLabel"];
  // The beginning of descendants' full anchors equals with the fullAnchorInit.
  var fullAnchorInit = compose(join("."), init, prop("anchorParts"))(node); // Finding the relevant child nodes...

  var childNodes = filter(function (item) {
    // All of the following conditions must be fulfilled:
    return (// Only direct child nodes will be returned.
      item.anchorParts.length - 1 === node.anchorParts.length && and( // Item must be a descendant of the checked node.
      compose(startsWith(fullAnchorInit), prop("fullAnchor"))(item), // Item's name must be one of the given name options.
      includes(item.name, names))
    );
  }, reducedStructure);
  return childNodes;
}