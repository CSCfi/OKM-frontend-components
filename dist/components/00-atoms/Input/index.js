import React from "react";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import { withStyles } from "@material-ui/core";
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

  return React.createElement(CssTextField, {
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
    className: "\n        ".concat(props.isHidden ? "hidden" : "", "\n        ").concat(props.isReadOnly ? "color: text-black border-collapse" : "", " p-2"),
    onChange: function onChange(e) {
      return changesOutDelayed(props.payload, {
        value: e.target.value
      });
    },
    error: props.error,
    InputLabelProps: props.isReadOnly ? {
      shrink: true,
      color: "text-black"
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
  });
};

Input.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  id: "input-".concat(Math.random()),
  isDisabled: false,
  isHidden: false,
  isReadOnly: false,
  payload: {},
  placeholder: "",
  rows: 1,
  rowsMax: 1,
  error: false,
  width: "20em",
  fullWidth: false,
  type: "text"
};
export default Input;