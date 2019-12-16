import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useEffect, useState } from "react";
import Select from "react-select";
import chroma from "chroma-js";
import { heights, autocompleteShortStyles } from "../../../css/autocomplete";
var Autocomplete = React.memo(function (props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  useEffect(function () {
    setValue(props.value);
  }, [props.value]);

  var orderOptions = function orderOptions(values) {
    return values.filter(function (v) {
      return v.isFixed;
    }).concat(values.filter(function (v) {
      return !v.isFixed;
    }));
  };

  var optionStyles = _objectSpread({}, props.height === heights.SHORT ? autocompleteShortStyles : null, {
    control: props.height === heights.SHORT ? autocompleteShortStyles.control : function (styles) {
      return _objectSpread({}, styles, {
        backgroundColor: "white"
      });
    },
    option: function option(styles, _ref) {
      var data = _ref.data,
          isDisabled = _ref.isDisabled,
          isFocused = _ref.isFocused,
          isSelected = _ref.isSelected;
      var color = chroma("#c3dafe");
      return _objectSpread({}, styles, {
        backgroundColor: isDisabled ? null : isSelected ? data.color : isFocused ? color.css() : null,
        color: isDisabled ? "#ccc" : isSelected ? chroma.contrast(color, "white") > 2 ? "white" : "black" : data.color,
        cursor: isDisabled ? "not-allowed" : "default",
        ":active": _objectSpread({}, styles[":active"], {
          backgroundColor: !isDisabled && (isSelected ? data.color : color.css())
        })
      });
    },
    menu: function menu(styles) {
      return _objectSpread({}, styles, {
        zIndex: 999
      });
    },
    multiValue: function multiValue(styles) {
      var color = chroma("#c3dafe");
      return _objectSpread({}, styles, {
        backgroundColor: color.css()
      });
    },
    multiValueLabel: function multiValueLabel(styles, _ref2) {
      var data = _ref2.data;
      return _objectSpread({}, styles, {
        color: data.color
      });
    },
    multiValueRemove: function multiValueRemove(styles, _ref3) {
      var data = _ref3.data;
      return _objectSpread({}, styles, {
        color: data.color,
        ":hover": {
          backgroundColor: data.color,
          color: "#666666"
        }
      });
    }
  });

  var handleSelectChange = function handleSelectChange(value, _ref4) {
    var action = _ref4.action,
        removedValue = _ref4.removedValue;

    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }

        break;

      case "clear":
        value = options.filter(function (v) {
          return v.isFixed;
        });
        break;

      default:
        break;
    }

    props.callback(props.payload, {
      value: Array.isArray(value) ? orderOptions(value) : value
    });
  };

  useEffect(function () {
    setOptions(props.options);
  }, [props.options]);

  var searchFilter = function searchFilter(option, searchText) {
    return option.data.label.toLowerCase().includes(searchText.toLowerCase());
  };

  return React.createElement(React.Fragment, null, props.title && React.createElement("label", {
    className: "block py-2"
  }, props.title), React.createElement(Select, {
    autosize: false,
    name: props.name,
    isMulti: props.isMulti,
    value: value,
    onChange: handleSelectChange,
    placeholder: props.placeholder,
    inputProps: {
      id: "select-multiple"
    },
    options: options,
    getOptionLabel: function getOptionLabel(option) {
      return "".concat(option.label);
    },
    getOptionValue: function getOptionValue(option) {
      return "".concat(option.value);
    },
    isSearchable: true,
    searchFilter: searchFilter,
    styles: optionStyles
  }));
});
Autocomplete.defaultProps = {
  isMulti: true,
  placeholder: "Valitse...",
  value: []
};
export default Autocomplete;