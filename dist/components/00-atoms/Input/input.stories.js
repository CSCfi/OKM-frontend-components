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
  }), React.createElement("p", null, "Wide"), React.createElement(Input, {
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    width: "100%"
  }), React.createElement("p", null, "Number"), React.createElement(Input, {
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    type: "number"
  }));
});