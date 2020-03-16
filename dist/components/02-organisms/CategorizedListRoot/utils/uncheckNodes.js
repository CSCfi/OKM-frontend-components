import { append, compose, dropLast, equals, filter, lensIndex, not, propEq, view } from "ramda";
import { getChangeObjByAnchor } from "../utils";
export function uncheckNodes(nodes, reducedStructure, changes) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var node = view(lensIndex(index))(nodes);
  var categoryAnchor = dropLast(1, node.anchorParts);
  var childNodes = filter(function (_node) {
    return equals(dropLast(2, _node.anchorParts), categoryAnchor);
  }, reducedStructure);
  var changeObj = getChangeObjByAnchor(node.fullAnchor, changes);

  if (changeObj) {
    if (changeObj.properties.isChecked) {
      changes = filter(compose(not, propEq("anchor")(node.fullAnchor)))(changes);
    }
  } else if (node.properties.isChecked) {
    changes = append({
      anchor: node.fullAnchor,
      properties: {
        metadata: node.properties.forChangeObject,
        isChecked: false
      }
    }, changes);
  }

  if (childNodes.length) {
    changes = uncheckNodes(childNodes, reducedStructure, changes);
  }

  if (index < nodes.length - 1) {
    return uncheckNodes(nodes, reducedStructure, changes, index + 1);
  }

  return changes;
}