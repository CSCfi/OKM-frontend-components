import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { append, lensIndex, over, values, mapObjIndexed, equals, includes, remove } from "ramda";
import { getChangeObjIndexByAnchor } from "../utils";
/**
 * Function updated the array of change objects by updating one of the
 * existing objects with new properties object.
 * @param {object} node - Object with an anchor and properties.
 * @param {object} properties - Properties to update the node's props with.
 * @param {array} changeObjects - Array of change objects.
 * @returns {array} - Updated array of changed objects.
 */

export function updateChangeObjectsArray(node, properties, changeObjects) {
  // Finding the location of existing change object...
  var changeObjIndex = getChangeObjIndexByAnchor(node.fullAnchor, changeObjects);
  var isChangeObjectNeeded = includes(false, values(mapObjIndexed(function (value, key) {
    return equals(node.properties[key], value);
  }, properties)));

  if (isChangeObjectNeeded) {
    if (changeObjIndex > -1) {
      /**
       * If the change object was found it will be updated. We also update the
       * array of change objects.
       **/
      changeObjects = over(lensIndex(changeObjIndex), function (changeObject) {
        return _objectSpread({}, changeObject, {
          properties: Object.assign({}, changeObject.properties, properties)
        });
      }, changeObjects);
    } else {
      /**
       * Going here means that the change object wasn't found. We need to create
       * a new change object and add it to the array of change objects.
       **/
      changeObjects = append({
        anchor: node.fullAnchor,
        properties: Object.assign({}, _objectSpread({}, properties, {
          metadata: node.properties.forChangeObject
        }))
      }, changeObjects);
    }
  } else if (changeObjIndex > -1) {
    changeObjects = remove(changeObjIndex, 1, changeObjects);
  }

  return changeObjects;
}