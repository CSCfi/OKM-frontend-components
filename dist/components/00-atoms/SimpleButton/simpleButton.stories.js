import React from "react";
import { storiesOf } from "@storybook/react";
import SimpleButton from "./index";
storiesOf("SimpleButton", module).add("Normal", function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-56 p-4"
  }, /*#__PURE__*/React.createElement(SimpleButton, {
    text: "Text is here"
  }));
});
storiesOf("SimpleButton", module).add("Outlined, large", function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-56 p-4"
  }, /*#__PURE__*/React.createElement(SimpleButton, {
    text: "Text is here",
    variant: "outlined",
    size: "large"
  }));
});
storiesOf("SimpleButton", module).add("Text button", function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-56 p-4"
  }, /*#__PURE__*/React.createElement(SimpleButton, {
    text: "Text is here",
    color: "default",
    variant: "default"
  }));
});
storiesOf("SimpleButton", module).add("Disabled Normal button", function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col w-56 p-4"
  }, /*#__PURE__*/React.createElement(SimpleButton, {
    text: "Text is here",
    disabled: "true"
  }));
});