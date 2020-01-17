import React from "react";
import * as R from "ramda";
/**
 * Grid component. Used by the Table component.
 * @param {object} props - Properties object.
 * @param {object} props.children - Content of the Grid.
 * @param {array} props.styleClasses - List of css class names.
 */

var Grid = function Grid(_ref) {
  var children = _ref.children,
      _ref$styleClasses = _ref.styleClasses,
      styleClasses = _ref$styleClasses === void 0 ? [] : _ref$styleClasses;
  var classNames = R.join(" ", styleClasses);
  return React.createElement("div", {
    className: classNames,
    key: "key-".concat(Math.random()),
    role: "grid"
  }, children);
};

export default Grid;