import React from "react";
import Input from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
storiesOf("Input", module).addDecorator(withInfo).add("Simple example", function () {
  var onChanges = function onChanges(payload, _ref) {
    var value = _ref.value;
    console.info(payload, value);
  };

  return React.createElement("div", null, React.createElement("p", null, "Normal"), React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges
  }), React.createElement("p", null, "Error"), React.createElement(Input, {
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    error: true
  }), React.createElement("p", null, "Required and valid or not yet visited/validated"), React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isRequired: true,
    isValid: true,
    label: "Required"
  }), React.createElement("p", null, "Required and invalid"), React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isRequired: true,
    isValid: false,
    label: "Required"
  }), React.createElement("p", null, "Wide"), React.createElement(Input, {
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    width: "100%"
  }), React.createElement(Input, {
    label: "Readonly",
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    isReadOnly: true,
    value: "readonly"
  }), React.createElement("p", null, "Number"), React.createElement(Input, {
    payload: {
      testProp: 123
    },
    onChanges: onChanges,
    type: "number"
  }), React.createElement(Input, {
    payload: {
      testProp: 123
    },
    onChanges: onChanges,
    type: "number",
    isRequired: true,
    label: "Required"
  }), React.createElement(Input, {
    label: "Readonly",
    payload: {
      testProp: 123
    },
    type: "number",
    onChanges: onChanges,
    isReadOnly: true,
    value: 123
  }));
});