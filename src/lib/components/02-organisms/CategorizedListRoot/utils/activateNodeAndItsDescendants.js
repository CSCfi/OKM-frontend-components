import { addIndex, append, flatten, map, uniq } from "ramda";
import { getChildNodes } from "./getChildNodes";
import { getChangeObjByAnchor } from "../utils";
import { disableSiblings } from "./disableSiblings";
import { updateChanges } from "./updateChanges";

/**
 * Function activates the target node and updates the situation of
 * related nodes too.
 * @param {object} node - Target node a.k.a clicked checbox / radio button.
 * @param {array} reducedStructure - Flatten array of all items on the form.
 * @param {array} changesWithoutRootAnchor - Array of change objects.
 */
export function activateNodeAndItsDescendants(
  node,
  reducedStructure,
  changesWithoutRootAnchor
) {
  console.group();
  console.info("Target node:", node);

  const childNodes = getChildNodes(node, reducedStructure, [
    "CheckboxWithLabel"
  ]);

  // We are not ready yet. Every checkbox child node must be checked.
  if (childNodes.length) {
    const grantChildren = [];
    console.info("Käydään lapsinodet läpi.", childNodes);
    changesWithoutRootAnchor = uniq(
      flatten(
        addIndex(map)((childNode, index) => {
          grantChildren.push(
            getChildNodes(childNode, reducedStructure, ["CheckboxWithLabel"])
          );
          console.groupEnd();
          return activateNodeAndItsDescendants(
            childNode,
            reducedStructure,
            changesWithoutRootAnchor
          );
        }, childNodes)
      )
    );
  }

  console.info("Activating... ", node);

  // The first thing is to find out the change object of the target node.
  const changeObj = getChangeObjByAnchor(
    node.fullAnchor,
    changesWithoutRootAnchor
  );

  if (changeObj) {
    if (
      node.properties.isChecked === true &&
      !node.properties.isIndeterminate
    ) {
      /**
       * If original isChecked value of the node is true we just have to
       * remove the change object.
       **/
      changesWithoutRootAnchor = updateChanges(
        node,
        { isDeprecated: true },
        changesWithoutRootAnchor
      );
      console.warn(changesWithoutRootAnchor);
    } else {
      /**
       * If the original value if not true and change object's isChecked
       * value is not true then the isChecked's value on change object must
       * be updated to be true.
       */
      changesWithoutRootAnchor = updateChanges(
        node,
        { isChecked: true, isIndeterminate: false },
        changesWithoutRootAnchor
      );
    }
  } else if (!changeObj && !node.properties.isChecked) {
    /**
     * If there's no change object and node's own isChecked property is false
     * we need to create a new change object with isChecked equals true.
     * The metadata given on the form will also be included to the change
     * object.
     */
    changesWithoutRootAnchor = append(
      {
        anchor: node.fullAnchor,
        properties: {
          metadata: node.properties.forChangeObject,
          isChecked: true
        }
      },
      changesWithoutRootAnchor
    );
  }

  if (node.name === "RadioButtonWithLabel") {
    changesWithoutRootAnchor = disableSiblings(
      node,
      reducedStructure,
      changesWithoutRootAnchor
    );
  }

  // console.info("Grant children: ", grantChildren);
  // if (node.name === "CheckboxWithLabel") {
  //   changesWithoutRootAnchor = checkChildNodes(
  //     node,
  //     reducedStructure,
  //     changesWithoutRootAnchor
  //   );
  // }

  // if (
  //   parentNode &&
  //   (parentNode.name === "CheckboxWithLabel" ||
  //     parentNode.name === "RadioButtonWithLabel")
  // ) {
  //   changesWithoutRootAnchor = checkNode(
  //     parentNode,
  //     reducedStructure,
  //     changesWithoutRootAnchor
  //   );
  // }

  console.groupEnd();

  return changesWithoutRootAnchor;
}
