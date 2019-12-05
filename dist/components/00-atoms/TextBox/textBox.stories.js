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
  }));
});