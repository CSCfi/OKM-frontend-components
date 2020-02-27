import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty } from "ramda";
import HelpIcon from "@material-ui/icons/Help";
import { FormHelperText } from "@material-ui/core";
import { COLORS } from "../../../modules/styles";
import styles from "./input.module.css";
var inputStyles = {
  root: {
    height: "100%",
    "& .Mui-disabled": {
      color: COLORS.OIVA_TEXT,
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
    "& input + fieldset ": {
      borderColor: COLORS.OIVA_ORANGE,
      borderWidth: 2
    },
    "& label": {
      color: COLORS.OIVA_ORANGE_TEXT + " !important"
    }
  },
  readonlyNoValue: {
    "& label.Mui-disabled": {
      transform: "translate(0, -6px) scale(1)"
    }
  }
};

var Input = function Input(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisited = _useState2[0],
      setIsVisited = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var classes = props.classes;

  var _useState5 = useState(null),
      _useState6 = _slicedToArray(_useState5, 2),
      value = _useState6[0],
      setValue = _useState6[1];

  var _useState7 = useState(null),
      _useState8 = _slicedToArray(_useState7, 2),
      handle = _useState8[0],
      setHandle = _useState8[1];

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
  return React.createElement(React.Fragment, null, React.createElement("div", {
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
    required: props.isRequired && !props.isReadOnly,
    error: props.error ? props.error : props.isRequired && value && !props.isValid || !props.isRequired && !props.isValid,
    InputLabelProps: !value ? {
      shrink: false
    } : {
      shrink: true
    },
    variant: "outlined",
    style: props.fullWidth ? {
      border: "none"
    } : {
      width: props.width,
      border: "none"
    },
    fullWidth: props.fullWidth,
    type: props.type,
    onBlurCapture: !props.value ? function () {
      return setIsVisited(true);
    } : function () {
      return setIsVisited(false);
    },
    onFocus: function onFocus() {
      return setIsFocused(true);
    },
    onBlur: function onBlur() {
      return setIsFocused(false);
    },
    className: "".concat(props.isHidden ? "hidden" : "", " \n          ").concat(isVisited && props.isRequired && !value && !isFocused ? classes.requiredVisited : classes.root, " \n          ").concat(props.isReadOnly && !value && classes.readonlyNoValue, "\n        ")
  }), !props.isReadOnly && !props.disabled && !isEmpty(props.tooltip) && React.createElement("div", {
    className: "ml-8"
  }, React.createElement(Tooltip, {
    tooltip: props.tooltip.text,
    trigger: "click"
  }, React.createElement(HelpIcon, {
    classes: {
      colorPrimary: styles.tooltipBg
    },
    color: "primary"
  })))), props.showValidationErrors && props.requiredMessage && React.createElement(FormHelperText, {
    id: "component-message-text",
    style: {
      marginTop: "0.1em",
      paddingLeft: "1.2em",
      marginBottom: "0.5em",
      color: COLORS.OIVA_ORANGE_TEXT
    }
  }, isVisited && !value && props.requiredMessage));
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