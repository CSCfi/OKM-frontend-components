import { filter, and, propEq } from "ramda";
import { findSiblings } from "./findSiblings";
import { disableNodes } from "./disableNodes";

/**
 * Disables the node's siblings.
 * @param {object} node - Target item.
 * @param {array} reducedStructure - Flatten array of all items on the form.
 * @param {array} changes - Array of change objects.
 */
export function disableSiblings(node, reducedStructure, changes) {
  const radioSiblings = filter(
    and(
      propEq("columnIndex", node.columnIndex),
      propEq("name", "RadioButtonWithLabel")
    )
  )(findSiblings(node, reducedStructure));
  if (radioSiblings.length) {
    return disableNodes(radioSiblings, reducedStructure, changes);
  }
  return changes;
}
