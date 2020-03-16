import { append } from "ramda";
import { findParent } from "./findParent";
import { updateChangeObjectsArray } from "./updateChangeObjectsArray";
import { getChangeObjByAnchor } from "../utils";
import { uncheckSiblings } from "./uncheckSiblings";
/**
 * Sets the isIndeterminate property of node's descendants as true.
 * @param {*} node
 * @param {*} reducedStructure
 * @param {*} changeObjects
 */

export function deactivatePredecessors(node, reducedStructure, changeObjects) {
  console.group();
  console.info("Deactivating the parent of...", node);
  /**
   * Let's find out if the node has a parent.
   */

  var parentNode = findParent(node, reducedStructure, ["CheckboxWithLabel", "RadioButtonWithLabel"]); // If parentNode exists and its type is either checkbox or radio button...

  if (parentNode) {
    var parentChangeObj = getChangeObjByAnchor(parentNode.fullAnchor, changeObjects);

    if (!parentChangeObj && !node.properties.isIndeterminate) {
      changeObjects = append({
        anchor: parentNode.fullAnchor,
        properties: {
          metadata: parentNode.properties.forChangeObject,
          isChecked: true,
          isIndeterminate: true
        }
      }, changeObjects);
    } else if (parentChangeObj && !parentChangeObj.properties.isIndeterminate) {
      changeObjects = updateChangeObjectsArray(parentNode, {
        isChecked: true,
        isIndeterminate: true
      }, changeObjects);
    }

    if (parentNode.name === "RadioButtonWithLabel") {
      changeObjects = uncheckSiblings(parentNode, reducedStructure, changeObjects);
    } // The parent node might have a parent. Let's handle it parent node next.


    console.groupEnd();
    return deactivatePredecessors(parentNode, reducedStructure, changeObjects);
  }

  console.groupEnd();
  return changeObjects;
}