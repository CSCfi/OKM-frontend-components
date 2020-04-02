import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from "react";
import * as R from "ramda";
var defaultProps = {
  styleClasses: ["text-base"]
};
var StatusTextRow = React.memo(function (_ref) {
  var children = _ref.children,
      isHidden = _ref.isHidden,
      isRequired = _ref.isRequired,
      isValid = _ref.isValid,
      labelStyles = _ref.labelStyles,
      layout = _ref.layout,
      statusText = _ref.statusText,
      statusTextStyleClasses = _ref.statusTextStyleClasses,
      styleClasses = _ref.styleClasses,
      isReadOnly = _ref.isReadOnly;

  var _useState = useState(defaultProps.styleClasses),
      _useState2 = _slicedToArray(_useState, 2),
      classNames = _useState2[0],
      setClassNames = _useState2[1];

  useEffect(function () {
    if (styleClasses && styleClasses.length) {
      setClassNames(styleClasses);
    }
  }, [styleClasses]);
  useEffect(function () {
    var paddingClass = layout && layout.dense ? "pt-2" : "py-2";
    setClassNames(function (prevValue) {
      return R.append(paddingClass, prevValue);
    });
  }, [layout]);

  if (!isHidden) {
    return React.createElement("div", {
      className: R.join(" ", classNames),
      style: labelStyles
    }, React.createElement("div", {
      className: "flex"
    }, statusText && React.createElement("div", {
      className: R.join(" ", statusTextStyleClasses)
    }, statusText), children, !isReadOnly && isRequired && React.createElement("span", {
      className: "pr-4"
    }, "*"), " "));
  }
});
export default StatusTextRow;