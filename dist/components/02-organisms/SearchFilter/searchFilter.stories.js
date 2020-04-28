import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import SearchFilter from "./index";
storiesOf("SearchFilter", module).addDecorator(withInfo).add("Filter example", function () {
  var onValueChanged = function onValueChanged(value) {
    console.info(value);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Open developer tool console to see callback values."), /*#__PURE__*/React.createElement(SearchFilter, {
    onValueChanged: onValueChanged
  }));
});