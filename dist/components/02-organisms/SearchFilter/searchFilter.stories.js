import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import SearchFilter from "./index";
storiesOf("SearchFilter", module).addDecorator(withInfo).add("Filter example", function () {
  var onValueChanged = function onValueChanged(value) {
    console.info(value);
  };

  return React.createElement("div", null, React.createElement("p", null, "Open developer tool console to see callback values."), React.createElement(SearchFilter, {
    onValueChanged: onValueChanged
  }));
});