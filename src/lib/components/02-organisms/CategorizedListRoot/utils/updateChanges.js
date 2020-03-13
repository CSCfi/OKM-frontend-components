import { append, lensIndex, over } from "ramda";
import { getChangeObjIndexByAnchor } from "../utils";

/**
 *
 * @param {*} node
 * @param {*} properties
 * @param {*} changes
 */
export function updateChanges(node, properties, changes) {
  // Parent node found. Let's find the change object of it.
  const changeObjIndex = getChangeObjIndexByAnchor(node.fullAnchor, changes);
  // If the parent has a change object we modify it.
  if (changeObjIndex > -1) {
    /**
     * So... the parent's change object exists. Let's modify it and
     * update the array of change objects.
     **/
    changes = over(
      lensIndex(changeObjIndex),
      changeObject => {
        return {
          ...changeObject,
          properties: Object.assign({}, changeObject.properties, properties)
        };
      },
      changes
    );
  } else {
    /**
     * Going here means that the change object of the target node's parent
     * node wasn't found. We need to create a new change object and add it
     * to the array of change objects.
     **/
    changes = append(
      {
        anchor: node.fullAnchor,
        properties: Object.assign(
          {},
          {
            ...properties,
            metadata: node.properties.forChangeObject
          }
        )
      },
      changes
    );
  }
  return changes;
}
