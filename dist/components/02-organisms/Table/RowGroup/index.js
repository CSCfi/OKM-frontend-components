import React from "react";
import * as R from "ramda";
/**
 * RowGroup component. Used by the Table component.
 * @param {object} props - Properties object.
 * @param {object} props.children - RowGroup content.
 * @param {array} props.styleClasses - List of css class names.
 */

var RowGroup = function RowGroup(_ref) {
  var children = _ref.children,
      _ref$styleClasses = _ref.styleClasses,
      styleClasses = _ref$styleClasses === void 0 ? [] : _ref$styleClasses,
      _ref$tableLevel = _ref.tableLevel,
      tableLevel = _ref$tableLevel === void 0 ? 0 : _ref$tableLevel;
  var allStyleClasses = R.concat(styleClasses, ["pl-".concat(4 * tableLevel)]);
  var classNames = R.join(" ", allStyleClasses);
  return /*#__PURE__*/React.createElement("div", {
    className: classNames,
    key: "key-".concat(Math.random()),
    role: "rowgroup"
  }, children);
};

export default RowGroup;