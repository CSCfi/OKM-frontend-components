import { findParent } from "./findParent";
import { updateChangeObjectsArray } from "./updateChangeObjectsArray";
import { uncheckSiblings } from "./uncheckSiblings";
import { isEveryChildNodeUnchecked } from "./isEveryChildNodeUnchecked";
import { findSiblings } from "./findSiblings";
import { isEveryNodeUnchecked } from "./isEveryNodeUnchecked";
import { modifyNode } from "./modifyNode";
/**
 * Sets the isIndeterminate property of node's descendants as true.
 * @param {*} node - Includes an anchor and a properties object.
 * @param {*} reducedStructure - Flatten form structure.
 * @param {*} changeObjects - Array of change Objects.
 * @returns {array} - Updated array of change objects.
 */

export function deactivateNodesPredecessors(node, reducedStructure, changeObjects) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  /**
   * Let's find out if the node has a parent.
   */
  var parentNode = findParent(node, reducedStructure, ["CheckboxWithLabel", "RadioButtonWithLabel"]); // If parentNode exists and its type is either checkbox or radio button...

  if (parentNode && parentNode.formId === node.formId) {
    /**
     * If node doesn't have siblings or all the siblings are unchecked the
     * parent node must be unchecked.
     **/
    var siblings = findSiblings(node, reducedStructure);
    var siblingsUnchecked = isEveryNodeUnchecked(siblings, changeObjects);

    if (!siblings || siblingsUnchecked) {
      changeObjects = updateChangeObjectsArray(parentNode, {
        isChecked: false,
        isIndeterminate: false
      }, changeObjects);
    } else {
      changeObjects = modifyNode(parentNode, reducedStructure, changeObjects);
    } // If the parent node is a radio button its siblings must be unchecked.


    if (parentNode.name === "RadioButtonWithLabel") {
      changeObjects = uncheckSiblings(parentNode, reducedStructure, changeObjects);
    } // The parent node might have a parent. Let's handle it parent node next.


    return deactivateNodesPredecessors(parentNode, reducedStructure, changeObjects, index + 1);
  } else if (index > 0) {
    var isEveryChildUnchecked = isEveryChildNodeUnchecked(node, reducedStructure, changeObjects);

    if (isEveryChildUnchecked) {
      changeObjects = updateChangeObjectsArray(node, {
        isChecked: false,
        isIndeterminate: false
      }, changeObjects);
    } else {
      changeObjects = modifyNode(node, reducedStructure, changeObjects);
    }
  }

  return changeObjects;
}