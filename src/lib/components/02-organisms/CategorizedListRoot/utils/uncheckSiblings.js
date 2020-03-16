import { filter, and, propEq } from "ramda";
import { findSiblings } from "./findSiblings";
import { uncheckNodes } from "./uncheckNodes";

/**
 * Unchecks the node's siblings.
 * @param {object} node - Target item.
 * @param {array} reducedStructure - Flatten array of all items on the form.
 * @param {array} changes - Array of change objects.
 */
export function uncheckSiblings(node, reducedStructure, changes) {
  const radioSiblings = filter(
    and(
      propEq("columnIndex", node.columnIndex),
      propEq("name", "RadioButtonWithLabel")
    )
  )(findSiblings(node, reducedStructure));
  if (radioSiblings.length) {
    return uncheckNodes(radioSiblings, reducedStructure, changes);
  }
  return changes;
}
