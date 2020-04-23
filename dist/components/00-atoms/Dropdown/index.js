import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { COLORS } from "../../../modules/styles";
import { FormHelperText, InputLabel } from "@material-ui/core";
import "./dropdown.css";
import { withStyles } from "@material-ui/core";
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
var Dropdown = React.memo(function (props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisited = _useState2[0],
      setIsVisited = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var handleChanges = function handleChanges(selectedOption) {
    props.onChanges(props.payload, {
      selectedOption: selectedOption.target
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormControl, {
    variant: "outlined",
    disabled: props.isDisabled,
    fullWidth: props.fullWidth,
    required: props.isRequired,
    error: props.error,
    margin: "dense"
  }, props.label && /*#__PURE__*/React.createElement(InputLabel, {
    id: "select-label"
  }, props.label), /*#__PURE__*/React.createElement(Select, {
    labelId: "select-label",
    "aria-label": props.label,
    autosize: "true",
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
    }
  }, /*#__PURE__*/React.createElement(MenuItem, {
    value: ""
  }, props.emptyMessage || ''), props.options.map(function (item, i) {
    return /*#__PURE__*/React.createElement(MenuItem, {
      key: i,
      value: item.value
    }, item.label);
  }))), props.showValidationErrors && props.requiredMessage && /*#__PURE__*/React.createElement(FormHelperText, {
    id: "component-message-text",
    style: {
      marginTop: "0.1em",
      paddingLeft: "1.2em",
      marginBottom: "0.5em",
      color: COLORS.OIVA_ORANGE_TEXT
    }
  }, isVisited && !props.value && props.requiredMessage));
});
export default withStyles(selectCustomStyles)(Dropdown);