import { append, compose, filter, lensIndex, not, over, propEq } from "ramda";
import { getChangeObjByAnchor, getChangeObjIndexByAnchor } from "../utils";
import { findParent } from "./findParent";
import { getChildNodes } from "./getChildNodes";
import { disableNodes } from "./disableNodes";
import { updateChanges } from "./updateChanges";

/**
 * Function handles the unchecking / deactivation of a radio button or checkbox.
 * @param {object} node - Target node a.k.a clicked checbox / radio button.
 * @param {array} reducedStructure - Flatten array of all items on the form.
 * @param {array} changeObjects - Array of change objects.
 */
export function runDeactivationProcedure(
  node,
  reducedStructure,
  changeObjects
) {
  // Let's find the change object of the node under activation.
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changeObjects);
  if (changeObj && changeObj.properties.isChecked === true) {
    console.info(changeObj);
    /**
     * If change object was found and the node is already checked
     * the change object must be removed.
     **/
    changeObjects = updateChanges(node, { isDeprecated: true }, changeObjects);
  } else if (!changeObj && node.properties.isChecked === true) {
    /**
     * If there are no changes and node was already checked a new change
     * object must be created and added to the array of change objects.
     * The change object overrides the isChecked property of the node and it
     * will include the metadata of the node too.
     */
    changeObjects = append(
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
          isChecked: false
        }
      },
      changeObjects
    );
  }

  /**
   * Okay... the clicked node has been handled now. Next we have to handle it's
   * parent node and child nodes. If the node has a parent and the name of the
   * parent is CheckboxWithLabel the parent must be put to indeterminate state
   * (-).
   */
  const parentNode = findParent(node, reducedStructure);

  if (parentNode) {
    if (parentNode.name === "CheckboxWithLabel") {
      // Let's find out the index of the parent's change object.
      const parentChangeObjIndex = getChangeObjIndexByAnchor(
        parentNode.fullAnchor,
        changeObjects
      );
      // Index's value greater than -1 means that change object was found.
      if (parentChangeObjIndex > -1) {
        /**
         * This "complex" code sets the value of isIndeterminate property as
         * true. The array of change objects will be updated.
         **/
        changeObjects = over(
          lensIndex(parentChangeObjIndex),
          changeObject => {
            return {
              ...changeObject,
              properties: { ...changeObject.properties, isIndeterminate: true }
            };
          },
          changeObjects
        );
      }
    }
  }

  /**
   * So what next... the child nodes. They must be walked through and
   * deactivated. Let's find them first.
   */
  const childNodes = getChildNodes(node, reducedStructure);
  console.info(changeObjects);
  // Let's activate all child nodes.
  if (childNodes.length) {
    return disableNodes(childNodes, reducedStructure, changeObjects);
  }

  return changeObjects;
}
