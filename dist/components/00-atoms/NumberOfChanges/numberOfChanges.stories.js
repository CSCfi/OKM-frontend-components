import React from "react";
import { storiesOf } from "@storybook/react";
import NumberOfChanges from "./index";
import { withInfo } from "@storybook/addon-info";
import centered from "@storybook/addon-centered/react";
storiesOf("NumberOfChanges", module).addDecorator(centered).addDecorator(withInfo).add("no changes", function () {
  return React.createElement(NumberOfChanges, {
    changes: []
  });
}).add("9 changes", function () {
  return React.createElement(NumberOfChanges, {
    changes: new Array(9)
  });
});