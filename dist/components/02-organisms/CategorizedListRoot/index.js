import React, { useCallback, useMemo, useRef } from "react";
import CategorizedList from "./CategorizedList";
import { handleNodeMain, getReducedStructure, getTargetNode } from "./utils";
import * as R from "ramda"; // Default values for some properties of the component.

var defaultProps = {
  anchor: "anchornamemissing",
  categories: [],
  changes: [null],
  showCategoryTitles: false,
  uncheckParentWithoutActiveChildNodes: false
};
/**
 * CategorizedListRoot is the entry point of form handling.
 */

var CategorizedListRoot = React.memo(function (_ref) {
  var _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? defaultProps.anchor : _ref$anchor,
      _ref$categories = _ref.categories,
      categories = _ref$categories === void 0 ? defaultProps.categories : _ref$categories,
      _ref$changes = _ref.changes,
      changes = _ref$changes === void 0 ? defaultProps.changes : _ref$changes,
      onUpdate = _ref.onUpdate,
      _ref$showCategoryTitl = _ref.showCategoryTitles,
      showCategoryTitles = _ref$showCategoryTitl === void 0 ? defaultProps.showCategoryTitles : _ref$showCategoryTitl,
      isReadOnly = _ref.isReadOnly,
      showValidationErrors = _ref.showValidationErrors,
      _ref$uncheckParentWit = _ref.uncheckParentWithoutActiveChildNodes,
      uncheckParentWithoutActiveChildNodes = _ref$uncheckParentWit === void 0 ? defaultProps.uncheckParentWithoutActiveChildNodes : _ref$uncheckParentWit;
  var changesRef = useRef(null);
  changesRef.current = useMemo(function () {
    return changes;
  }, [changes]);
  /**
   * Categories (lomake) can be a multidimensional array. It's practical to
   * reduce the structure into a one dimensional array for use. The reduced
   * structure is used on defining the updated array of change objects.
   */

  var reducedStructure = useMemo(function () {
    var result = getReducedStructure(categories);
    return result;
  }, [categories]);
  /**
   * Function will be called when something changes on the form. The only
   * parameter is changeObj that contains the changed properties and maybe
   * some metadata too.
   */

  var onChangesUpdate = useCallback(function (changeObj) {
    // Target node is the component affected by the change.
    var targetNode = getTargetNode(changeObj, reducedStructure); // The array of change objects will be updated.

    var nextChanges = handleNodeMain(uncheckParentWithoutActiveChildNodes, targetNode, anchor, reducedStructure, changesRef.current);
    /**
     * The updated array will be sent using the onUpdate callback function.
     * The anchor parameter is the root anchor of the current form. It can
     * be used to bind and store the array of changes correctly.
     **/

    onUpdate({
      anchor: anchor,
      changes: nextChanges
    });
  }, [anchor, onUpdate, reducedStructure, uncheckParentWithoutActiveChildNodes]);
  /**
   * Function skips the tree checking (onChangesUpdate func, handleNodeMain).
   * Tree checking might be needed on future use cases.
   */

  var removeChangeObject = useCallback(function (_anchor) {
    return onUpdate({
      anchor: anchor,
      changes: R.filter(R.compose(R.not, R.propEq("anchor", _anchor)), changes)
    });
  }, [anchor, changes, onUpdate]);
  return /*#__PURE__*/React.createElement(React.Fragment, null,
  /**
  * If the first change object is not null (default) the CategorizedList
  * will be created.
  **/
  !R.equals(R.head(changes), null) ? function () {
    /**
     * This is the first instance of CategorizedList. The component
     * will create more instances on it's own.
     **/
    return /*#__PURE__*/React.createElement(CategorizedList, {
      anchor: anchor,
      categories: categories,
      changes: changes,
      rootPath: [],
      showCategoryTitles: showCategoryTitles,
      onChangesUpdate: onChangesUpdate,
      removeChangeObject: removeChangeObject,
      isReadOnly: isReadOnly,
      showValidationErrors: showValidationErrors
    });
  }() : null);
}, function (prevState, nextState) {
  var areCategoriesSame = JSON.stringify(prevState.categories) === JSON.stringify(nextState.categories);
  var areChangesSame = R.equals(prevState.changes, nextState.changes);
  return areCategoriesSame && areChangesSame;
});
export default CategorizedListRoot;