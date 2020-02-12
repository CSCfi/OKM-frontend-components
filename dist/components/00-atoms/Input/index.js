import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty } from "ramda";
import HelpIcon from "@material-ui/icons/Help";
import styles from "./input.module.css";
var inputStyles = {
  root: {
    height: "100%",
    "& .Mui-disabled": {
      color: "#333",
      paddingLeft: 0,
      paddingRight: 0
    },
    "& label.Mui-disabled": {
      transform: "translate(0, -6px) scale(0.75)"
    },
    "& input:disabled + fieldset": {
      borderColor: "transparent !important"
    }
  },
  requiredVisited: {
    "& input:invalid + fieldset ": {
      borderColor: "#E5C317"
    }
  }
};

var Input = function Input(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisited = _useState2[0],
      setIsVisited = _useState2[1];

  var classes = props.classes;

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      handle = _useState6[0],
      setHandle = _useState6[1];

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
      setValue(props.value);
    }
  }, [props.value]);
  return React.createElement("div", {
    className: "flex items-center"
  }, React.createElement(TextField, {
    id: props.id,
    "aria-label": props.ariaLabel,
    defaultValue: props.value,
    label: props.label,
    disabled: props.isDisabled || props.isReadOnly,
    inputprops: {
      readOnly: props.isReadOnly
    },
    placeholder: props.isDisabled || props.isReadOnly ? "" : props.placeholder,
    rows: props.rows,
    margin: props.isDense ? "dense" : "",
    rowsMax: props.rowsMax,
    onChange: updateValue,
    required: props.isRequired,
    error: props.error,
    InputLabelProps: props.isReadOnly ? {
      shrink: true
    } : {},
    variant: "outlined",
    style: props.fullWidth ? {
      border: "none"
    } : {
      width: props.width,
      border: "none"
    },
    fullWidth: props.fullWidth,
    type: props.type,
    onFocus: function onFocus() {
      return setIsVisited(true);
    },
    className: "".concat(props.isHidden ? "hidden" : "", " \n          ").concat(isVisited && props.isRequired ? classes.requiredVisited : classes.root, " \n        ")
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
  }))));
};

Input.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  isDisabled: false,
  isHidden: false,
  isReadOnly: false,
  isRequired: false,
  isValid: true,
  payload: {},
  placeholder: "",
  rows: 1,
  rowsMax: 1,
  error: false,
  width: "20em",
  fullWidth: false,
  tooltip: {},
  type: "text",
  isVisited: false,
  isDense: true
};
export default withStyles(inputStyles)(Input);