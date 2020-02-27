import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty } from "ramda";
import HelpIcon from "@material-ui/icons/Help";
import { withStyles } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";
import styles from "./textbox.module.css";
var textboxStyles = {
  root: {
    outline: "none !important",
    border: "1px solid #C4C4C4",
    paddingLeft: "1em",
    paddingRight: "1em",
    "&:disabled": {
      borderColor: "transparent !important",
      paddingLeft: 0,
      paddingRight: 0,
      "& label": {
        margin: "2em"
      }
    }
  },
  required: {
    marginBottom: "-2px"
  },
  focused: {
    outline: "none !important",
    border: "2px solid blue",
    paddingLeft: "0.95em",
    paddingRight: "0.95em",
    paddingTop: "0.45em"
  },
  requiredVisited: {
    boxShadow: "none",
    border: "2px solid #E5C317"
  },
  requiredVisitedFocus: {
    outline: "none !important",
    border: "2px solid blue",
    paddingLeft: "0.95em",
    paddingRight: "0.95em",
    paddingTop: "0.45em"
  },
  error: {
    outlineColor: "red",
    boxShadow: "none",
    border: "1px solid red"
  },
  errorFocused: {
    outlineColor: "red",
    boxShadow: "none",
    border: "2px solid red"
  },
  cssLabel: {
    top: "1em",
    left: "-0.5em",
    position: "relative",
    ".Mui-error": {
      color: "red"
    }
  },
  cssLabelFocused: {
    color: "blue"
  },
  cssLabelRequired: {
    color: "#757600 !important"
  },
  inputLabelShrink: {
    left: "0"
  },
  inputLabelReadonly: {
    marginLeft: "-1em"
  }
};

var TextBox = function TextBox(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisited = _useState2[0],
      setIsVisited = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      value = _useState6[0],
      setValue = _useState6[1];

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      handle = _useState8[0],
      setHandle = _useState8[1];

  var classes = props.classes;

  var updateValue = function updateValue(e) {
    !e.target.value && !isFocused ? setIsVisited(true) : setIsVisited(false);
    setValue(e.target.value);

    if (handle) {
      clearTimeout(handle);
    }

    setHandle(function (v) {
      return setTimeout(function () {
        props.onChanges(props.payload, {
          value: v
        });
      }, props.delay);
    }(e.target.value));
  };

  useEffect(function () {
    if (props.value !== value || !value) {
      setValue(props.value || ""); // props.value might be undefined
    }
  }, [props.value]);
  return React.createElement(React.Fragment, null, value !== null ? React.createElement(React.Fragment, null, React.createElement("div", null, props.title && React.createElement(InputLabel, {
    disabled: props.isDisabled || props.isReadOnly,
    htmlFor: "props.id",
    shrink: (isFocused || value) && true,
    variant: "outlined",
    error: props.isErroneous ? props.isErroneous : props.isRequired && value && !props.isValid || !props.isRequired && !props.isValid,
    classes: {
      root: classes.cssLabel,
      shrink: classes.inputLabelShrink,
      disabled: classes.inputLabelReadonly
    },
    className: "".concat(isFocused ? classes.cssLabelFocused : props.isRequired && isVisited ? classes.cssLabelRequired : classes.cssLabel)
  }, React.createElement("span", {
    style: {
      padding: "0 0.3em",
      background: "white"
    }
  }, props.title, props.isRequired && "*")), React.createElement(TextareaAutosize, {
    "aria-label": props.ariaLabel,
    disabled: props.isDisabled || props.isReadOnly,
    id: props.id,
    placeholder: props.isDisabled || props.isReadOnly ? "" : props.placeholder,
    rows: props.isReadOnly ? 1 : props.rows,
    rowsMax: props.isReadOnly ? Infinity : props.rowsMax,
    className: "".concat(props.isHidden ? "hidden" : "rounded", " \n              ").concat(props.required ? classes.required : "", "\n              ").concat(props.isReadOnly ? "text-black" : "border border-solid border-gray-500", " ").concat(isVisited && props.isRequired && !value && !isFocused ? classes.requiredVisited : classes.root, " ").concat(isFocused ? props.isRequired ? classes.requiredVisitedFocus : classes.focused : "", " ").concat(props.isErroneous || !props.isValid && !props.isRequired || !props.isValid && value && props.isRequired ? isFocused ? classes.errorFocused : classes.error : "", " \n              w-full p-2 resize-none"),
    onChange: updateValue,
    value: value,
    inputprops: {
      readOnly: props.isReadOnly
    },
    onBlurCapture: function onBlurCapture() {
      return !value ? setIsVisited(true) : setIsVisited(false);
    },
    onFocus: function onFocus() {
      return setIsFocused(true);
    },
    onBlur: function onBlur() {
      return setIsFocused(false);
    },
    label: props.label,
    error: props.isErroneous ? props.isErroneous : props.isRequired && value && !props.isValid || !props.isRequired && !props.isValid
  }), !props.isReadOnly && !isEmpty(props.tooltip) && React.createElement("div", {
    className: "ml-8"
  }, React.createElement(Tooltip, {
    tooltip: props.tooltip.text,
    trigger: "click"
  }, React.createElement(HelpIcon, {
    classes: {
      colorPrimary: styles.tooltipBg
    },
    color: "primary"
  }))), props.requiredMessage && React.createElement(FormHelperText, {
    id: "component-message-text",
    style: {
      paddingLeft: "0.5em",
      marginBottom: "0.5em",
      color: "#757600"
    }
  }, isVisited && !value && props.requiredMessage))) : null);
};

TextBox.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  isDisabled: false,
  isHidden: false,
  payload: {},
  placeholder: "",
  isReadOnly: false,
  isRequired: false,
  isValid: true,
  rows: 2,
  rowsMax: 100,
  title: "",
  tooltip: {},
  isVisited: false
};
export default withStyles(textboxStyles)(TextBox);