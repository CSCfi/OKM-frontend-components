import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from "react";
import { heights, autocompleteShortStyles } from "../../../css/autocomplete";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import * as R from "ramda";
/**
 * Multiselect wraps a Autocomplete https://material-ui.com/components/autocomplete
 * Sends value to callback.
 * @param props
 * @returns {*}
 * @constructor
 */
// TODO:
// 1 If group is selected, show only group as selected
// 2 If option is selected when it's group was already selected, unselect option,
// deselect group but show all other options selected in that group
// (or is not going to work, select it and deselect group?)
// 3 Required styles

var Multiselect = React.memo(function (props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      setOptions = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedGroups = _useState6[0],
      setSelectedGroups = _useState6[1];

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

  var optionStyles = _objectSpread({}, props.height === heights.SHORT ? autocompleteShortStyles : null);

  var handleSelectChange = function handleSelectChange(event, value, selected, groupItem) {
    // Removed by X in a chip, go through selected group if one needed to be removed
    if (!groupItem) {
      var newSelectedGroups = R.filter(function (groupval) {
        return R.includes({
          label: groupval,
          value: groupval,
          group: groupval
        }, value);
      }, selectedGroups);
      setSelectedGroups(newSelectedGroups); // Then set value and call call back

      setValue(value);
      props.callback(props.payload, {
        value: Array.isArray(value) ? orderOptions(value) : value
      });
    } else if (!selected) {
      // group clicked, adds group into selected groups
      setSelectedGroups([].concat(_toConsumableArray(selectedGroups), [groupItem]));
      setValue(value);
      props.callback(props.payload, {
        value: Array.isArray(value) ? orderOptions(value) : value
      });
    } else {
      // group was already selected, removes group from selected groups
      var newArray = selectedGroups;
      newArray.splice(newArray.indexOf(groupItem), 1);
      setSelectedGroups(newArray); // ..., removes group from values groups

      var newValue = R.filter(function (val) {
        return val.value !== groupItem;
      }, value);
      setValue(newValue);
      props.callback(props.payload, {
        value: Array.isArray(newValue) ? orderOptions(newValue) : newValue
      });
    }
  }; // shown options with grouping


  useEffect(function () {
    setOptions(props.options && props.options[0].group ? props.options : props.options && props.options.map(function (option) {
      // if first option does not have a group, use first letters as groups
      var firstLetter = option.label && option.label[0].toUpperCase();
      return _objectSpread({}, option, {
        group: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter
      });
    }));
  }, [props.options]); // add selected groups from values

  useEffect(function () {
    if (props.options && props.options[0].group) {
      var groups = props.value && R.filter(function (option) {
        return option.label === option.group;
      }, props.value);
      if (groups) setSelectedGroups(R.map(function (prop) {
        return prop.label;
      }, groups));
    }
  }, [props.value, props.options]); // custom group headers with selecting and unselecting

  var renderGroup = function renderGroup(params) {
    var selected = selectedGroups ? selectedGroups.includes(params.key) : false;
    return [/*#__PURE__*/React.createElement("div", {
      key: params.key,
      className: "pl-3 pr-4 py-2 w-full flex flex-row justify-between cursor-pointer hover:bg-gray-100 ".concat(selected && "bg-gray-200"),
      onClick: function onClick() {
        handleSelectChange(null, [].concat(_toConsumableArray(value), [{
          label: params.key,
          value: params.key,
          group: params.key
        }]), selected, params.key);
      }
    }, /*#__PURE__*/React.createElement("span", null, params.key), selected && /*#__PURE__*/React.createElement(CheckIcon, null)), params.children];
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Autocomplete, {
    id: props.id,
    "aria-label": props.ariaLabel,
    autoComplete: true,
    autosize: props.autosize,
    multiple: props.isMulti,
    renderInput: function renderInput(params) {
      return /*#__PURE__*/React.createElement(TextField, Object.assign({}, params, {
        variant: "outlined",
        label: props.title,
        placeholder: props.placeholder,
        required: props.isRequired
      }));
    },
    groupBy: function groupBy(option) {
      return option.group;
    },
    renderGroup: renderGroup,
    renderOption: function renderOption(option, _ref) {
      var selected = _ref.selected;
      return /*#__PURE__*/React.createElement("div", {
        className: "w-full flex flex-row justify-between"
      }, /*#__PURE__*/React.createElement("span", null, option.label), /*#__PURE__*/React.createElement(CheckIcon, {
        style: {
          visibility: selected ? "visible" : "hidden"
        }
      }));
    },
    getOptionSelected: function getOptionSelected(option, value) {
      return option.label === value.label;
    },
    value: value,
    onChange: handleSelectChange,
    options: options,
    getOptionLabel: function getOptionLabel(option) {
      return option && option.label;
    },
    styles: optionStyles,
    width: props.width,
    required: props.isRequired,
    disableCloseOnSelect: true,
    disableClearable: true,
    disabled: props.isDisabled
  }));
});
Multiselect.defaultProps = {
  isMulti: true,
  isRequired: false,
  isValid: true,
  value: [],
  isSearch: false,
  minChars: 3,
  width: "100%",
  autoSize: false
};
export default Multiselect;