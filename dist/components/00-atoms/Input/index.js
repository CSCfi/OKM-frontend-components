import React from "react";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import { withStyles } from "@material-ui/core";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty } from "ramda";
import HelpIcon from "@material-ui/icons/Help";
import styles from "./input.module.css";
var CssTextField = withStyles({
  root: {
    "& MuiInputBase-input": {
      "& .Mui-disabled": {
        color: "pink"
      }
    },
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiInputBase-root": {
      "&.Mui-disabled": {
        color: "rgba(0, 0, 0, 0.87)"
      }
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-disabled fieldset": {
        border: "none"
      }
    }
  }
})(TextField);

var Input = function Input(props) {
  var changesOutDelayed = _.debounce(props.onChanges, props.delay);

  return React.createElement("div", {
    className: "flex items-center"
  }, props.isRequired && React.createElement("span", {
    className: "text-".concat(props.isValid ? "green" : "red", "-500 text-2xl pr-4")
  }, "*"), React.createElement(CssTextField, {
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
    margin: "dense",
    rowsMax: props.rowsMax,
    className: "\n        ".concat(props.isHidden ? "hidden" : "", "\n        ").concat(props.isReadOnly ? "text-black border-collapse" : "", " p-2"),
    onChange: function onChange(e) {
      return changesOutDelayed(props.payload, {
        value: e.target.value
      });
    },
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
    type: props.type
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
  type: "text"
};
export default Input;