import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import AlertMessage from "./index";
storiesOf("AlertMessage", module).addDecorator(withInfo).add("info (default)", function () {
  return React.createElement("div", {
    className: "mt-8"
  }, React.createElement(AlertMessage, {
    title: "Title is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    message: "Message is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    title: "Title is here",
    message: "Message is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    message: "The long message is here.",
    linkText: "This is the link",
    handleLinkClick: function handleLinkClick() {
      return console.log("Link pressed");
    }
  }));
}).add("warning", function () {
  return React.createElement("div", {
    className: "mt-8"
  }, React.createElement(AlertMessage, {
    type: "warning",
    title: "Title is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "warning",
    message: "Message is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "warning",
    message: "Message is here.",
    linkText: "This is the link",
    handleLinkClick: function handleLinkClick() {
      return console.log("Link pressed");
    }
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "warning",
    title: "Title",
    message: "Message is here"
  }));
}).add("error", function () {
  return React.createElement("div", {
    className: "mt-8"
  }, React.createElement(AlertMessage, {
    type: "error",
    title: "Title is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "error",
    message: "Message is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "error",
    message: "Message is here.",
    linkText: "This is the link",
    handleLinkClick: function handleLinkClick() {
      return console.log("Link pressed");
    }
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "error",
    title: "Title is here",
    message: "Message is here"
  }));
}).add("success", function () {
  return React.createElement("div", {
    className: "mt-8"
  }, React.createElement(AlertMessage, {
    type: "success",
    title: "Title is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "success",
    message: "Message is here"
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "success",
    message: "Message is here.",
    linkText: "This is the link",
    handleLinkClick: function handleLinkClick() {
      return console.log("Link pressed");
    }
  }), React.createElement("br", null), React.createElement(AlertMessage, {
    type: "success",
    title: "Title is here",
    message: "Message is here"
  }));
});