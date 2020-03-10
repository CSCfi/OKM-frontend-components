import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import AlertMessage from "./index";
storiesOf("AlertMessage", module).addDecorator(withInfo).add("default", function () {
  return React.createElement("div", {
    className: "mt-8"
  }, React.createElement(AlertMessage, {
    title: "Title is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    message: "Message is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    message: "Link message is here",
    handleClick: function handleClick() {
      return console.log("Link pressed");
    }
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    title: "Title",
    message: "Message is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "warning",
    title: "Warning is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "error",
    title: "Error is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "success",
    title: "Success is here"
  }));
});