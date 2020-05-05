import { find } from "ramda";
import { findParent } from "./findParent";
import { findSiblings } from "./findSiblings";
import { isNodeChecked } from "./isNodeChecked";
import { updateChangeObjectsArray } from "./updateChangeObjectsArray";
import { uncheckSiblings } from "./uncheckSiblings";

/**
 * Activates the node's predecessors.
 * @param {object} node - Target node a.k.a clicked checbox / radio button.
 * @param {array} reducedStructure - Flatten array of all items on the form.
 * @param {array} changeObjects - Array of change objects.
 * @returns {array} - Updated array of change objects.
 */
export function activatePredecessors(node, reducedStructure, changeObjects) {
  /**
   * Let's find out if the node has a parent. The parent must be checked too
   * and if it exists its isIndeterminate property must be calculated. The
   * logic goes like this: If the parent has child nodes and NOT all of them
   * are checked then it's isIndeterminate property must be true. Let's find
   * the parent node first. Checking / activating is relevant only if the
   * parent is a checkbox or a radio button.
   */
  const parentNode = findParent(node, reducedStructure, [
    "CheckboxWithLabel",
    "RadioButtonWithLabel"
  ]);

  // If parentNode exists and its type is either checkbox or radio button...
  if (parentNode && parentNode.formId === node.formId) {
    /**
     * To be able to define the isIndeterminate property we have to find out
     * the node's siblings and count how many of them is checked.
     */
    const siblings = findSiblings(node, reducedStructure);

    /**
     * Let's try to find the first unchecked sibling. In both cases we are
     * gonna check the parent node.
     **/

    const firstUncheckedSibling = find(sibling => {
      return !isNodeChecked(sibling, changeObjects);
    }, siblings);

    if (firstUncheckedSibling) {
      // isIndeterminate = true
      changeObjects = updateChangeObjectsArray(
        parentNode,
        { isChecked: true, isIndeterminate: true },
        changeObjects
      );
    } else {
      /**
       * The target node and its every sibling are all checked. It's time to
       * set the parent's its isIndeterminate property as false.
       */
      changeObjects = updateChangeObjectsArray(
        parentNode,
        { isChecked: true, isIndeterminate: false },
        changeObjects
      );
    }

    // If the parent node is a radio button its siblings must be unchecked.
    if (parentNode.name === "RadioButtonWithLabel") {
      changeObjects = uncheckSiblings(
        parentNode,
        reducedStructure,
        changeObjects
      );
    }

    // The parent node might have a parent. Let's handle the parent node next.
    return activatePredecessors(parentNode, reducedStructure, changeObjects);
  }

  return changeObjects;
}
