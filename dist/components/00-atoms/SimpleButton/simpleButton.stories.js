import React from "react";
import { storiesOf } from "@storybook/react";
import SimpleButton from "./index";
storiesOf("SimpleButton", module).add("Normal", function () {
  return React.createElement("div", {
    className: "flex flex-col w-56 p-4"
  }, React.createElement(SimpleButton, {
    text: "Text is here"
  }));
});
storiesOf("SimpleButton", module).add("Outlined, large", function () {
  return React.createElement("div", {
    className: "flex flex-col w-56 p-4"
  }, React.createElement(SimpleButton, {
    text: "Text is here",
    variant: "outlined",
    size: "large"
  }));
});
storiesOf("SimpleButton", module).add("Text button", function () {
  return React.createElement("div", {
    className: "flex flex-col w-56 p-4"
  }, React.createElement(SimpleButton, {
    text: "Text is here",
    color: "default",
    variant: "default"
  }));
});