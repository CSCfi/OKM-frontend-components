import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import chroma from "chroma-js";
import { heights, autocompleteShortStyles } from "../../../css/autocomplete";
import SearchIcon from "@material-ui/icons/Search";
import InputLabel from "@material-ui/core/InputLabel";
import { equals } from "ramda";
/**
 * Autocomplete wraps a Select
 * Sends value to callback.
 * Two versions:
 *  [isSearch = false] autocomplete with arrow (list can be opened anytime)
 *  [isSearch = true] autocomplete with search icon (list opens when typed character >= minChars)
 * @param props
 * @returns {*}
 * @constructor
 */

var Autocomplete = React.memo(function (props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState(3),
      _useState6 = _slicedToArray(_useState5, 2),
      setMinCharacters = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isOptionsShown = _useState8[0],
      setIsOptionsShown = _useState8[1];

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
    indicatorSeparator: function indicatorSeparator(styles) {
      return {
        display: "none"
      };
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
        if (removedValue && removedValue.isFixed) {
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
  useEffect(function () {
    setMinCharacters(3);
    props.minChars <= 0 ? setMinCharacters(props.minChars) : props.isSearch && setMinCharacters(3);
  }, [props.isSearch, props.minChars]);

  var searchFilter = function searchFilter(option, searchText) {
    return option.data.label.toLowerCase().includes(searchText.toLowerCase());
  };

  var DropdownIndicator = function DropdownIndicator(props) {
    return /*#__PURE__*/React.createElement(components.DropdownIndicator, props, /*#__PURE__*/React.createElement(SearchIcon, null));
  };

  var onInputChange = function onInputChange(value) {
    value.length >= props.minChars ? setIsOptionsShown(true) : setIsOptionsShown(false);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, props.title && /*#__PURE__*/React.createElement(InputLabel, {
    required: props.isRequired,
    style: {
      marginBottom: "0.2em"
    }
  }, props.title), props.isSearch ? /*#__PURE__*/React.createElement(Select, {
    autosize: props.autosize,
    name: props.name,
    isMulti: props.isMulti,
    value: value,
    onChange: handleSelectChange,
    placeholder: props.placeholder,
    inputProps: {
      id: "select-multiple"
    },
    options: isOptionsShown ? options : [],
    getOptionLabel: function getOptionLabel(option) {
      return "".concat(option.label);
    },
    getOptionValue: function getOptionValue(option) {
      return "".concat(option.value);
    },
    isSearchable: true,
    searchFilter: searchFilter,
    styles: optionStyles,
    components: props.isSearch && {
      DropdownIndicator: DropdownIndicator
    },
    hideSelectedOptions: props.isSearch,
    onInputChange: onInputChange,
    menuIsOpen: isOptionsShown,
    width: props.width,
    required: props.isRequired
  }) : /*#__PURE__*/React.createElement(Select, {
    autosize: props.autosize,
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
    styles: optionStyles,
    hideSelectedOptions: props.isSearch,
    width: props.width,
    required: props.isRequired
  }));
}, function (cp, np) {
  return equals(cp.isValid, np.isValid) && equals(cp.options, np.options) && equals(cp.payload, np.payload) && equals(cp.value, np.value) && equals(cp.height, np.height) && equals(cp.width, np.width);
});
Autocomplete.defaultProps = {
  isMulti: true,
  isRequired: false,
  isValid: true,
  placeholder: "Valitse...",
  value: [],
  isSearch: false,
  minChars: 3,
  width: "100%",
  autoSize: false
};
export default Autocomplete;