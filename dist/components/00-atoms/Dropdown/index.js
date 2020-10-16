import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import { COLORS } from "../../../modules/styles";
import { FormHelperText, InputLabel } from "@material-ui/core";
import "./dropdown.css";
import { withStyles } from "@material-ui/core";
import { addIndex, map } from "ramda";
var selectCustomStyles = {
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
    border: "2px solid green",
    paddingLeft: "0.95em",
    paddingRight: "0.95em",
    paddingTop: "0.45em"
  },
  requiredVisited: {
    boxShadow: "none",
    border: "2px solid",
    borderColor: COLORS.OIVA_ORANGE
  },
  readOnly: {
    boxShadow: "none",
    border: 0,
    marginTop: "-1em"
  },
  requiredVisitedFocus: {
    outline: "none !important",
    border: "2px solid green",
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
    "& .Mui-error": {
      color: "red"
    }
  },
  cssLabelFocused: {
    color: "green"
  },
  cssLabelRequired: {
    color: COLORS.OIVA_ORANGE_TEXT + " !important"
  },
  inputLabelShrink: {
    left: "0"
  },
  inputLabelReadonly: {
    top: "-1em",
    marginLeft: "-0.7em",
    color: COLORS.OIVA_TEXT + " !important"
  },
  inputLabelReadonlyShrink: {
    top: "0",
    marginLeft: "-1.1em"
  }
};

var Dropdown = function Dropdown(props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisited = _useState2[0],
      setIsVisited = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      setIsFocused = _useState4[1];

  var handleChanges = function handleChanges(e) {
    props.onChanges(props.payload, {
      selectedOption: e.target.value
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormControl, {
    variant: "outlined",
    disabled: props.isDisabled,
    required: props.isRequired,
    error: props.error,
    fullWidth: props.fullWidth,
    margin: "dense"
  }, props.label && /*#__PURE__*/React.createElement(InputLabel, {
    id: "select-label"
  }, props.label), /*#__PURE__*/React.createElement(Select, {
    labelId: "select-label",
    "aria-label": props.label,
    value: props.value,
    onChange: handleChanges,
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
    placeholder: props.placeholder
  }, addIndex(map)(function (item, i) {
    return item ? /*#__PURE__*/React.createElement(MenuItem, {
      key: i,
      value: item.value
    }, item.label) : null;
  }, props.options).filter(Boolean))), props.showValidationErrors && props.requiredMessage && /*#__PURE__*/React.createElement(FormHelperText, {
    id: "component-message-text",
    style: {
      marginTop: "0.1em",
      paddingLeft: "1.2em",
      marginBottom: "0.5em",
      color: COLORS.OIVA_ORANGE_TEXT
    }
  }, isVisited && !props.value && props.requiredMessage));
};

Dropdown.defaultProps = {
  value: ""
};
export default withStyles(selectCustomStyles)(Dropdown);