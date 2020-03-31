import React from "react";
import Button from "@material-ui/core/Button";
var defaultProps = {
  isReadOnly: false,
  payload: {},
  text: "[text is missing]",
  variant: "contained"
};

var SimpleButton = function SimpleButton(_ref) {
  var _ref$isReadOnly = _ref.isReadOnly,
      isReadOnly = _ref$isReadOnly === void 0 ? defaultProps.isReadOnly : _ref$isReadOnly,
      onClick = _ref.onClick,
      _ref$payload = _ref.payload,
      payload = _ref$payload === void 0 ? defaultProps.payload : _ref$payload,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? defaultProps.text : _ref$text,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? defaultProps.variant : _ref$variant;

  var handleClick = function handleClick() {
    onClick(payload);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, !isReadOnly ? /*#__PURE__*/React.createElement(Button, {
    onClick: handleClick,
    variant: variant
  }, text) : null);
};

export default SimpleButton;