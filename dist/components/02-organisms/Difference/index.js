import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useCallback, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as R from "ramda";
var defaultValues = {
  applyForValue: 0,
  delay: 300,
  initialValue: 100,
  titles: ["[Title 1]", "[Title 2]", "[Title 3]"],
  isReadOnly: false,
  isRequired: false
};
var emptySelectionPlaceholderValue = "";

function isValueValid(isRequired, value) {
  var isValid = true;

  if (isRequired === true) {
    isValid = !(value === emptySelectionPlaceholderValue) && value >= 0;
  }

  if (value < 0) {
    isValid = false;
  }

  return isValid;
}

var Difference = function Difference(_ref) {
  var _ref$applyForValue = _ref.applyForValue,
      applyForValue = _ref$applyForValue === void 0 ? defaultValues.applyForValue : _ref$applyForValue,
      _ref$delay = _ref.delay,
      delay = _ref$delay === void 0 ? defaultValues.delay : _ref$delay,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? defaultValues.initialValue : _ref$initialValue,
      onChanges = _ref.onChanges,
      _ref$payload = _ref.payload,
      payload = _ref$payload === void 0 ? {} : _ref$payload,
      _ref$titles = _ref.titles,
      titles = _ref$titles === void 0 ? defaultValues.titles : _ref$titles,
      _ref$isReadOnly = _ref.isReadOnly,
      isReadOnly = _ref$isReadOnly === void 0 ? defaultValues.isReadOnly : _ref$isReadOnly,
      _ref$isRequired = _ref.isRequired,
      isRequired = _ref$isRequired === void 0 ? defaultValues.isRequired : _ref$isRequired;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      timeoutHandle = _useState2[0],
      setTimeoutHandle = _useState2[1];

  var _useState3 = useState(initialValue),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      setValue = _useState4[1];

  var required = R.path(["component", "properties", "isRequired"], payload) || isRequired;
  var readonly = R.path(["component", "properties", "isReadOnly"], payload) || isReadOnly;
  var isValid = isValueValid(required, value);
  var handleChange = useCallback(function (actionResults, payload) {
    var resultIsNaN = isNaN(actionResults.value);
    var result = resultIsNaN ? emptySelectionPlaceholderValue : actionResults.value;
    var resultIsValid = isValueValid(required, result);
    setValue(result);

    if (timeoutHandle) {
      clearTimeout(timeoutHandle);
    }

    setTimeoutHandle(setTimeout(function () {
      onChanges(payload, {
        applyForValue: resultIsNaN ? initialValue : actionResults.value,
        isValid: resultIsValid
      });
    }, delay));
  }, [delay, initialValue, onChanges, timeoutHandle, required]);
  useEffect(function () {
    setValue(applyForValue === initialValue ? emptySelectionPlaceholderValue : applyForValue);
  }, [applyForValue, initialValue]);
  var containerClass = isValid ? "flex" : "flex bg-yellow-300";
  var initialAreaTitle = titles[0];
  var inputAreaTitle = required ? titles[1] + '*' : titles[1];
  var changeAreaTitle = titles[2];
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: containerClass
  }, React.createElement("div", {
    className: "flex-1 flex-col"
  }, React.createElement(Typography, null, initialAreaTitle), initialValue), React.createElement("div", {
    className: "flex-1 flex-col"
  }, React.createElement(Typography, null, inputAreaTitle), !readonly && React.createElement(TextField, {
    type: "number",
    inputProps: {
      min: "0"
    },
    onChange: function onChange(e) {
      return handleChange({
        value: parseInt(e.target.value, 10)
      }, payload);
    },
    value: value
  }), readonly && applyForValue), React.createElement("div", {
    className: "flex-1 flex-col"
  }, React.createElement(Typography, null, changeAreaTitle), (value ? value : applyForValue) - initialValue)));
};

export default Difference;