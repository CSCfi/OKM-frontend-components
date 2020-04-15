import React from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "./index";
storiesOf("Dropdown", module).add("default, contained", function () {
  return React.createElement("div", null, React.createElement(Dropdown, {
    text: "Text is here"
  }), React.createElement("br", null), React.createElement(Dropdown, {
    text: "Text is here",
    isTall: true
  }), React.createElement("br", null), React.createElement(Dropdown, {
    text: "Text is here",
    label: "With label"
  }));
});