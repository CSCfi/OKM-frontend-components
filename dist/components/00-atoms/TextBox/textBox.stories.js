import React from "react";
import TextBox from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
storiesOf("TextBox", module).addDecorator(withInfo).add("Simple example", function () {
  var onChanges = function onChanges(payload, _ref) {
    var value = _ref.value;
    console.info(payload, value);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Open developer tool console to see callback values."), /*#__PURE__*/React.createElement(TextBox, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(TextBox, {
    title: "Required",
    isRequired: true,
    payload: {
      testProp: 1
    },
    onChanges: onChanges
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(TextBox, {
    title: "read only",
    isReadOnly: true,
    value: "Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text Read only longer text ",
    isRequired: true,
    tooltip: {
      text: "This is info text"
    }
  }), /*#__PURE__*/React.createElement(TextBox, {
    title: "invalid",
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isValid: false,
    tooltip: {
      text: "This is info text"
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(TextBox, {
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