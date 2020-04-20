import React from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "./index";
storiesOf("Dropdown", module).add("default, contained", function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dropdown, {
    text: "Text is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Dropdown, {
    text: "Text is here",
    isTall: true
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Dropdown, {
    text: "Text is here",
    label: "With label"
  }));
});