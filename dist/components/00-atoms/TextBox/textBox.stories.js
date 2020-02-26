import React from "react";
import TextBox from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
storiesOf("TextBox", module).addDecorator(withInfo).add("Simple example", function () {
  var onChanges = function onChanges(payload, _ref) {
    var value = _ref.value;
    console.info(payload, value);
  };

  return React.createElement("div", null, React.createElement("p", null, "Open developer tool console to see callback values."), React.createElement(TextBox, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges
  }), React.createElement("br", null), React.createElement(TextBox, {
    title: "Required",
    isRequired: true,
    payload: {
      testProp: 1
    },
    onChanges: onChanges
  }), React.createElement("br", null), React.createElement(TextBox, {
    title: "read only",
    isReadOnly: true,
    value: "Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text ",
    isRequired: true,
    tooltip: {
      text: "This is info text"
    }
  }), React.createElement(TextBox, {
    title: "invalid",
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isValid: false,
    tooltip: {
      text: "This is info text"
    }
  }), React.createElement("br", null), React.createElement(TextBox, {
    title: "invalid and required",
    isRequired: true,
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isValid: false,
    requiredMessage: "Pakollinen tieto"
  }));
});