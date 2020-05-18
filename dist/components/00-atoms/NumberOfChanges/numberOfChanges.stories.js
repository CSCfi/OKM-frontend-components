import React from "react";
import { storiesOf } from "@storybook/react";
import NumberOfChanges from "./index";
import { withInfo } from "@storybook/addon-info";
import centered from "@storybook/addon-centered/react";
var messages = {
  titleText: 'Muutosten määrä:'
};
storiesOf("NumberOfChanges", module).addDecorator(centered).addDecorator(withInfo).add("no changes", function () {
  return /*#__PURE__*/React.createElement(NumberOfChanges, {
    changes: [],
    messages: messages
  });
}).add("9 changes", function () {
  return /*#__PURE__*/React.createElement(NumberOfChanges, {
    changes: new Array(9),
    messages: messages
  });
});