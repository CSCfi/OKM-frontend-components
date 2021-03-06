import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from "react";
import * as R from "ramda";
var defaultProps = {
  styleClasses: ["text-base"]
};
var StatusTextRow = React.memo(function (_ref) {
  var code = _ref.code,
      isHidden = _ref.isHidden,
      isRequired = _ref.isRequired,
      labelStyles = _ref.labelStyles,
      layout = _ref.layout,
      statusText = _ref.statusText,
      statusTextStyleClasses = _ref.statusTextStyleClasses,
      styleClasses = _ref.styleClasses,
      isReadOnly = _ref.isReadOnly,
      title = _ref.title;

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
    return /*#__PURE__*/React.createElement("div", {
      className: R.join(" ", classNames),
      style: labelStyles
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex"
    }, statusText && /*#__PURE__*/React.createElement("div", {
      className: R.join(" ", statusTextStyleClasses)
    }, statusText), /*#__PURE__*/React.createElement("div", {
      className: "flex"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, code ? /*#__PURE__*/React.createElement("span", {
      className: "pr-4"
    }, code) : null, /*#__PURE__*/React.createElement("span", null, title), !isReadOnly && isRequired && /*#__PURE__*/React.createElement("span", {
      className: "pr-4"
    }, "*")))));
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null);
  }
}, function (cp, np) {
  return cp.isHidden === np.isHidden && cp.isReadOnly === np.isReadOnly && cp.isRequired === np.isRequired && cp.statusText === np.statusText && cp.code === np.code && cp.title === np.title;
});
export default StatusTextRow;