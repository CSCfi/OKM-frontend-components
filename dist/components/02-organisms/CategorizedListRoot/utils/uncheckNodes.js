import { append, compose, dropLast, equals, filter, lensIndex, not, propEq, view } from "ramda";
import { getChangeObjByAnchor } from "../utils";
/**
 * Sets isChecked: false for the given nodes.
 * @param {array} nodes - Array of radio or checkbox nodes.
 * @param {array} reducedStructure - Flatten form structure.
 * @param {array} changeObjects - Array of change objects.
 * @param {number} index - Current index. Used for iterating the nodes.
 * @returns {array} - Updated array of change objects.
 */

export function uncheckNodes(nodes, reducedStructure, changeObjects) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var node = view(lensIndex(index))(nodes);
  var categoryAnchor = dropLast(1, node.anchorParts);
  var childNodes = filter(function (_node) {
    return equals(dropLast(2, _node.anchorParts), categoryAnchor);
  }, reducedStructure);
  var changeObj = getChangeObjByAnchor(node.fullAnchor, changeObjects);

  if (changeObj) {
    /**
     * If change object exists and it has a truthy isChecked value the change
     * object must be removed from the array of change objects.
     **/
    if (changeObj.properties.isChecked) {
      changeObjects = filter(compose(not, propEq("anchor")(node.fullAnchor)))(changeObjects);
    }
  } else if (node.properties.isChecked) {
    /**
     * If change object doesn't exist and the node (checkbox or radio button)
     * is checked a new change object must be created with isChecked: false.
     */
    changeObjects = append({
      anchor: node.fullAnchor,
      properties: {
        metadata: node.properties.forChangeObject,
        isChecked: false
      }
    }, changeObjects);
  } // uncheckNodes must be run for all the child nodes.


  if (childNodes.length) {
    changeObjects = uncheckNodes(childNodes, reducedStructure, changeObjects);
  } // Iteration continues...


  if (index < nodes.length - 1) {
    return uncheckNodes(nodes, reducedStructure, changeObjects, index + 1);
  }

  return changeObjects;
}