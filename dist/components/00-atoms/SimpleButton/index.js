import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
var defaultProps = {
  isReadOnly: false,
  payload: {},
  text: "[text is missing]",
  variant: "contained",
  color: "primary",
  size: "large",
  disabled: false
};
var styles = createStyles(function (theme) {
  return {
    root: {
      height: "3rem",
      fontWeight: "600",
      fontSize: "0.9375rem",
      borderRadius: 0,
      borderColor: "#d1d1d1",
      "&:focus": {
        outline: "0.2rem solid #d1d1d1"
      }
    }
  };
});

var SimpleButton = function SimpleButton(_ref) {
  var _ref$isReadOnly = _ref.isReadOnly,
      isReadOnly = _ref$isReadOnly === void 0 ? defaultProps.isReadOnly : _ref$isReadOnly,
      onClick = _ref.onClick,
      _ref$payload = _ref.payload,
      payload = _ref$payload === void 0 ? defaultProps.payload : _ref$payload,
      _ref$text = _ref.text,
      text = _ref$text === void 0 ? defaultProps.text : _ref$text,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? defaultProps.variant : _ref$variant,
      _ref$color = _ref.color,
      color = _ref$color === void 0 ? defaultProps.color : _ref$color,
      ariaLabel = _ref.ariaLabel,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? defaultProps.size : _ref$size,
      classes = _ref.classes,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? defaultProps.disabled : _ref$disabled;

  var handleClick = function handleClick(event) {
    onClick(payload, {}, event);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, !isReadOnly && /*#__PURE__*/React.createElement(Button, {
    size: size,
    onClick: handleClick,
    variant: variant,
    color: color,
    disableElevation: true,
    disableRipple: true,
    disabled: disabled,
    "aria-label": ariaLabel,
    className: classes.root
  }, text));
};

export default withStyles(styles)(SimpleButton);