import { append, find } from "ramda";
import { findParent } from "./findParent";
import { isNodeChecked } from "./isNodeChecked";
import { updateChanges } from "./updateChanges";
import { getChangeObjByAnchor } from "../utils";
import { disableSiblings } from "./disableSiblings";

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
  const parentNode = findParent(node, reducedStructure, [
    "CheckboxWithLabel",
    "RadioButtonWithLabel"
  ]);

  // If parentNode exists and its type is either checkbox or radio button...
  if (parentNode) {
    const parentChangeObj = getChangeObjByAnchor(
      parentNode.fullAnchor,
      changeObjects
    );

    if (!parentChangeObj && !node.properties.isIndeterminate) {
      changeObjects = append(
        {
          anchor: parentNode.fullAnchor,
          properties: {
            metadata: parentNode.properties.forChangeObject,
            isChecked: true,
            isIndeterminate: true
          }
        },
        changeObjects
      );
    } else if (parentChangeObj && !parentChangeObj.properties.isIndeterminate) {
      changeObjects = updateChanges(
        parentNode,
        { isChecked: true, isIndeterminate: true },
        changeObjects
      );
    }

    if (parentNode.name === "RadioButtonWithLabel") {
      changeObjects = disableSiblings(
        parentNode,
        reducedStructure,
        changeObjects
      );
    }

    // The parent node might have a parent. Let's handle it parent node next.
    console.groupEnd();
    return deactivatePredecessors(parentNode, reducedStructure, changeObjects);
  }

  console.groupEnd();
  return changeObjects;
}
