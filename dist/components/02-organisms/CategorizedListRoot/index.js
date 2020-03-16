import React, { useCallback, useMemo, useRef } from "react";
import CategorizedList from "./CategorizedList";
import { handleNodeMain, getReducedStructure, getTargetNode } from "./utils";
import * as R from "ramda";
var defaultProps = {
  anchor: "anchornamemissing",
  categories: [],
  changes: [null],
  debug: false,
  sectionId: "sectionidmissing",
  showCategoryTitles: false
};
var CategorizedListRoot = React.memo(function (_ref) {
  var _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? defaultProps.anchor : _ref$anchor,
      _ref$categories = _ref.categories,
      categories = _ref$categories === void 0 ? defaultProps.categories : _ref$categories,
      _ref$changes = _ref.changes,
      changes = _ref$changes === void 0 ? defaultProps.changes : _ref$changes,
      _ref$debug = _ref.debug,
      debug = _ref$debug === void 0 ? defaultProps.debug : _ref$debug,
      onUpdate = _ref.onUpdate,
      _ref$showCategoryTitl = _ref.showCategoryTitles,
      showCategoryTitles = _ref$showCategoryTitl === void 0 ? defaultProps.showCategoryTitles : _ref$showCategoryTitl,
      isReadOnly = _ref.isReadOnly,
      showValidationErrors = _ref.showValidationErrors;
  var changesRef = useRef(null);
  changesRef.current = useMemo(function () {
    return changes;
  }, [changes]);
  var reducedStructure = useMemo(function () {
    return getReducedStructure(categories);
  }, [categories]);
  var onChangesUpdate = useCallback(function (changeObj) {
    var targetNode = getTargetNode(changeObj, reducedStructure);
    var nextChanges = handleNodeMain(targetNode, anchor, reducedStructure, changesRef.current);
    onUpdate({
      anchor: anchor,
      changes: nextChanges
    });
  }, [anchor, onUpdate, reducedStructure]);
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
  return React.createElement(React.Fragment, null, !R.equals(R.head(changes), null) ? function () {
    return React.createElement(CategorizedList, {
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
  return R.equals(prevState, nextState);
});
export default CategorizedListRoot;