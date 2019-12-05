import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from "react";
import * as R from "ramda";
var defaultProps = {
  styleClasses: ["text-base", "py-2"]
};
var StatusTextRow = React.memo(function (_ref) {
  var children = _ref.children,
      labelStyles = _ref.labelStyles,
      statusText = _ref.statusText,
      statusTextStyleClasses = _ref.statusTextStyleClasses,
      styleClasses = _ref.styleClasses,
      isHidden = _ref.isHidden;

  var _useState = useState(defaultProps.styleClasses),
      _useState2 = _slicedToArray(_useState, 2),
      classNames = _useState2[0],
      setClassNames = _useState2[1];

  useEffect(function () {
    if (styleClasses && styleClasses.length) {
      setClassNames(styleClasses);
    }
  }, [styleClasses]);

  if (!isHidden) {
    return React.createElement("div", {
      className: R.join(" ", classNames),
      style: labelStyles
    }, React.createElement("div", {
      className: "flex"
    }, statusText && React.createElement("div", {
      className: R.join(" ", statusTextStyleClasses)
    }, statusText), children));
  }
});
export default StatusTextRow;