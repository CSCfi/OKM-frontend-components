import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

var TextBox = function TextBox(props) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useState3 = useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      handle = _useState4[0],
      setHandle = _useState4[1];

  var updateValue = function updateValue(e) {
    setValue(e.target.value);

    if (handle) {
      clearTimeout(handle);
    }

    setHandle(function (v) {
      return setTimeout(function () {
        props.onChanges(props.payload, {
          value: v
        });
      }, props.delay);
    }(e.target.value));
  };

  useEffect(function () {
    if (props.value !== value || !value) {
      setValue(props.value);
    }
  }, [props.value, value]);
  return React.createElement(React.Fragment, null, value !== null ? React.createElement(React.Fragment, null, props.title && React.createElement("label", {
    className: "text-bold text-base block my-2"
  }, props.title), React.createElement(TextareaAutosize, {
    "aria-label": props.ariaLabel,
    disabled: props.isDisabled || props.isReadOnly,
    id: props.id,
    placeholder: props.isDisabled || props.isReadOnly ? "" : props.placeholder,
    rows: props.isReadOnly ? 1 : props.rows,
    rowsMax: props.isReadOnly ? Infinity : props.rowsMax,
    className: "".concat(props.isHidden ? "hidden" : "", "\n             ").concat(props.isReadOnly ? "color: text-black" : "border border-solid border-gray-500 rounded", " w-full p-2 resize-none"),
    onChange: updateValue,
    value: value,
    inputprops: {
      readOnly: props.isReadOnly
    }
  })) : null);
};

TextBox.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  isDisabled: false,
  isHidden: false,
  payload: {},
  placeholder: "",
  isReadOnly: false,
  rows: 2,
  rowsMax: 100,
  title: ""
};
export default TextBox;