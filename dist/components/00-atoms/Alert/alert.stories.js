import React from "react";
import { storiesOf } from "@storybook/react";
import AlertMessage from "./index";
storiesOf("AlertMessage", module).add("default, contained", function () {
  return React.createElement("div", null, React.createElement(AlertMessage, {
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
    title: "Title is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "error",
    title: "Title is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "success",
    title: "Title is here"
  }));
});