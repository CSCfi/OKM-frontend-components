import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from "react";
import Select from "react-select";
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
  var handleChanges = function handleChanges(selectedOption) {
    props.onChanges(props.payload, {
      selectedOption: selectedOption
    });
  };

  return React.createElement(Select, {
    autosize: false,
    name: props.name,
    value: props.value,
    onChange: handleChanges,
    options: props.options,
    isDisabled: props.isDisabled,
    placeholder: props.placeholder,
    className: "".concat(props.isTall ? "h-full" : "", " \n        "),
    styles: selectCustomStyles,
    variant: "contained",
    height: props.height,
    width: props.width,
    autoWidth: !props.width
  });
});
export default Dropdown;