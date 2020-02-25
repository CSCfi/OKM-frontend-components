import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty } from "ramda";
import HelpIcon from "@material-ui/icons/Help";
import { withStyles } from "@material-ui/core";
import styles from "./textbox.module.css";
var textboxStyles = {
  root: {
    boxShadow: "none",
    border: "1px solid #C4C4C4",
    "&:disabled": {
      borderColor: "transparent !important",
      paddingLeft: 0,
      paddingRight: 0
    }
  },
  requiredVisited: {
    boxShadow: "none",
    border: "1px solid #E5C317"
  }
};

var TextBox = function TextBox(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisited = _useState2[0],
      setIsVisited = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      handle = _useState6[0],
      setHandle = _useState6[1];

  var classes = props.classes;

  var updateValue = function updateValue(e) {
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
  }, [props.value]); // If value is added the component won't work.

  return React.createElement(React.Fragment, null, value !== null ? React.createElement(React.Fragment, null, props.title && React.createElement("label", {
    className: "text-bold text-base block my-2"
  }, props.isRequired && React.createElement("span", {
    className: "text-".concat(props.isValid ? "green" : "red", "-500 text-2xl pr-4")
  }, "*"), props.title), React.createElement("div", {
    className: "flex"
  }, React.createElement(TextareaAutosize, {
    "aria-label": props.ariaLabel,
    disabled: props.isDisabled || props.isReadOnly,
    id: props.id,
    placeholder: props.isDisabled || props.isReadOnly ? "" : props.placeholder,
    rows: props.isReadOnly ? 1 : props.rows,
    rowsMax: props.isReadOnly ? Infinity : props.rowsMax,
    className: "".concat(props.isHidden ? "hidden" : "", " ").concat(props.isReadOnly ? "text-black" : "border border-solid border-gray-500 rounded", " ").concat(isVisited && props.isRequired && !value ? classes.requiredVisited : classes.root, " w-full p-2 resize-none"),
    onChange: updateValue,
    value: value,
    inputprops: {
      readOnly: props.isReadOnly
    },
    onFocus: function onFocus() {
      return setIsVisited(true);
    }
  }), !isEmpty(props.tooltip) && React.createElement("div", {
    className: "ml-8"
  }, React.createElement(Tooltip, {
    tooltip: props.tooltip.text,
    trigger: "click"
  }, React.createElement(HelpIcon, {
    classes: {
      colorPrimary: styles.tooltipBg
    },
    color: "primary"
  }))))) : null);
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