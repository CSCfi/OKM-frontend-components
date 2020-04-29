import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import React, { useState } from "react";
import Select from "react-select";
import { COLORS } from "../../../modules/styles";
import { FormHelperText, InputLabel } from "@material-ui/core";
import { equals } from "ramda";
import "./dropdown.css";
var selectCustomStyles = {
  control: function control(provided) {
    return _objectSpread({}, provided, {
      height: "100%",
      minHeight: "34px",
      "* span": {
        backgroundColor: "transparent"
      },
      "div:first-of-type": {
        ":nth-of-type(2)": {
          padding: "6px"
        }
      },
      minWidth: "24em"
    });
  },
  indicatorsContainer: function indicatorsContainer(provided) {
    return _objectSpread({}, provided, {
      height: "100%",
      minHeight: "100%"
    });
  }
};
var Dropdown = React.memo(function (props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isVisited = _useState2[0],
      setIsVisited = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      setIsFocused = _useState4[1];

  var handleChanges = function handleChanges(selectedOption) {
    props.onChanges(props.payload, {
      selectedOption: selectedOption
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, props.label && /*#__PURE__*/React.createElement(InputLabel, {
    id: "select-label"
  }, props.label), /*#__PURE__*/React.createElement(Select, {
    "aria-label": props.name,
    autosize: false,
    name: props.name,
    value: props.value,
    onChange: handleChanges,
    options: props.options,
    isDisabled: props.isDisabled,
    isClearable: props.isClearable,
    placeholder: props.placeholder,
    className: "".concat(props.isTall ? "h-full" : "", " \n        "),
    styles: selectCustomStyles,
    variant: "contained",
    height: props.height,
    width: props.width,
    autoWidth: !props.width,
    required: props.isRequired,
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
  }), props.showValidationErrors && props.requiredMessage && /*#__PURE__*/React.createElement(FormHelperText, {
    id: "component-message-text",
    style: {
      marginTop: "0.1em",
      paddingLeft: "1.2em",
      marginBottom: "0.5em",
      color: COLORS.OIVA_ORANGE_TEXT
    }
  }, isVisited && !props.value && props.requiredMessage));
}, function (prevProps, nextProps) {
  var isSameFunction = "" + prevProps.onChanges === "" + nextProps.onChanges;
  return isSameFunction && equals(prevProps.isDisabled, nextProps.isDisabled) && equals(prevProps.value, nextProps.value) && equals(prevProps.isRequired, nextProps.isRequired);
});
export default Dropdown;