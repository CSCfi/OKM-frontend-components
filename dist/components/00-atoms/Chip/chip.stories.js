import React from "react";
import Pill from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
storiesOf("Chip, Pill", module).addDecorator(withInfo).add("Simple example", function () {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Normal"), /*#__PURE__*/React.createElement(Pill, {
    label: "Something",
    onDelete: function onDelete() {}
  }), /*#__PURE__*/React.createElement("p", null, "Filled"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-start"
  }, /*#__PURE__*/React.createElement(Pill, {
    label: "Something",
    variant: "default",
    onDelete: function onDelete() {}
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Pill, {
    label: "Something",
    variant: "default",
    color: "primary",
    onDelete: function onDelete() {}
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Pill, {
    label: "Something",
    variant: "default",
    color: "secondary",
    onDelete: function onDelete() {}
  })));
});