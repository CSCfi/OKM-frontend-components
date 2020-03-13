import { append, flatten, map, uniq } from "ramda";
import { getChildNodes } from "./getChildNodes";
import { getChangeObjByAnchor } from "../utils";
import { disableSiblings } from "./disableSiblings";
import { updateChanges } from "./updateChanges";
import { isNodeChecked } from "./isNodeChecked";

/**
 * Function deactivates the target node and its descendants.
 * @param {object} node - Target node a.k.a clicked checbox / radio button.
 * @param {array} reducedStructure - Flatten array of all items on the form.
 * @param {array} changeObjects - Array of change objects.
 */
export function deactivateNodeAndItsDescendants(
  node,
  reducedStructure,
  changeObjects
) {
  console.group();
  console.info("Target node: ", node);
  console.info("Is node checked: ", isNodeChecked(node, changeObjects));
  console.groupEnd();

  if (!isNodeChecked(node, changeObjects)) {
    return changeObjects;
  }

  const childNodes = getChildNodes(node, reducedStructure, [
    "CheckboxWithLabel"
  ]);

  // We are not ready yet. Every checkbox child node must be checked.
  if (childNodes.length) {
    console.info("Käydään lapsinodet läpi.", childNodes);
    changeObjects = uniq(
      flatten(
        map(childNode => {
          console.groupEnd();
          return deactivateNodeAndItsDescendants(
            childNode,
            reducedStructure,
            changeObjects
          );
        }, childNodes)
      )
    );
  }

  console.info("Deactivating... ", node);

  // The first thing is to find out the change object of the target node.
  const changeObj = getChangeObjByAnchor(node.fullAnchor, changeObjects);

  if (changeObj) {
    if (!node.properties.isChecked) {
      /**
       * If the node's original isChecked value is falsy we just need
       * to get rid of the change object.
       **/
      changeObjects = updateChanges(
        node,
        { isDeprecated: true },
        changeObjects
      );
    } else {
      // Otherwise the change object have to be re-configured.
      changeObjects = updateChanges(
        node,
        { isChecked: false, isIndeterminate: false },
        changeObjects
      );
    }
  } else if (!changeObj && node.properties.isChecked) {
    /**
     * If change object doesn't exist we need to create one. The metadata given
     * on the form will also be included in the change object.
     */
    changeObjects = append(
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
          isChecked: false,
          isIndeterminate: false
        }
      },
      changeObjects
    );
  }

  if (node.name === "RadioButtonWithLabel") {
    changeObjects = disableSiblings(node, reducedStructure, changeObjects);
  }

  console.groupEnd();

  return changeObjects;
}
