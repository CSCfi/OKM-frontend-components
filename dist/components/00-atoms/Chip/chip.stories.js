import React from "react";
import Pill from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
storiesOf("Chip, Pill", module).addDecorator(withInfo).add("Simple example", function () {
  return React.createElement("div", null, React.createElement("p", null, "Normal"), React.createElement(Pill, {
    label: "Something",
    onDelete: function onDelete() {}
  }), React.createElement("p", null, "Filled"), React.createElement("div", {
    className: "flex flex-col items-start"
  }, React.createElement(Pill, {
    label: "Something",
    variant: "default",
    onDelete: function onDelete() {}
  }), React.createElement("br", null), React.createElement(Pill, {
    label: "Something",
    variant: "default",
    color: "primary",
    onDelete: function onDelete() {}
  }), React.createElement("br", null), React.createElement(Pill, {
    label: "Something",
    variant: "default",
    color: "secondary",
    onDelete: function onDelete() {}
  })));
});