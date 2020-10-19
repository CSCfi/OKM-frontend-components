import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FaPlus } from "react-icons/fa";
import ClearIcon from "@material-ui/icons/Clear";
var defaultProps = {
  isReadOnly: false,
  payload: {},
  text: "[text is missing]",
  variant: "contained",
  color: "primary",
  size: "large",
  disabled: false,
  icon: null,
  iconStyles: {},
  iconContainerStyles: {}
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
      disabled = _ref$disabled === void 0 ? defaultProps.disabled : _ref$disabled,
      _ref$icon = _ref.icon,
      icon = _ref$icon === void 0 ? defaultProps.icon : _ref$icon,
      _ref$iconContainerSty = _ref.iconContainerStyles,
      iconContainerStyles = _ref$iconContainerSty === void 0 ? defaultProps.iconContainerStyles : _ref$iconContainerSty,
      _ref$iconStyles = _ref.iconStyles,
      iconStyles = _ref$iconStyles === void 0 ? defaultProps.iconStyles : _ref$iconStyles;

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
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: iconContainerStyles
  }, icon === "FaPlus" && /*#__PURE__*/React.createElement(FaPlus, {
    style: iconStyles
  }), icon === "ClearIcon" && /*#__PURE__*/React.createElement(ClearIcon, {
    style: iconStyles
  })), text));
};

export default withStyles(styles)(SimpleButton);