import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import AlertMessage from "./index";
storiesOf("AlertMessage", module).addDecorator(withInfo).add("info (default)", function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement(AlertMessage, {
    title: "Title is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    message: "Message is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    title: "Title is here",
    message: "Message is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    message: "The long message is here.",
    linkText: "This is the link",
    handleLinkClick: function handleLinkClick() {
      return console.log("Link pressed");
    }
  }));
}).add("warning", function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement(AlertMessage, {
    type: "warning",
    title: "Title is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "warning",
    message: "Message is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "warning",
    message: "Message is here.",
    linkText: "This is the link",
    handleLinkClick: function handleLinkClick() {
      return console.log("Link pressed");
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "warning",
    title: "Title",
    message: "Message is here"
  }));
}).add("error", function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement(AlertMessage, {
    type: "error",
    title: "Title is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "error",
    message: "Message is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "error",
    message: "Message is here.",
    linkText: "This is the link",
    handleLinkClick: function handleLinkClick() {
      return console.log("Link pressed");
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "error",
    title: "Title is here",
    message: "Message is here"
  }));
}).add("success", function () {
  return /*#__PURE__*/React.createElement("div", {
    className: "mt-8"
  }, /*#__PURE__*/React.createElement(AlertMessage, {
    type: "success",
    title: "Title is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "success",
    message: "Message is here"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "success",
    message: "Message is here.",
    linkText: "This is the link",
    handleLinkClick: function handleLinkClick() {
      return console.log("Link pressed");
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(AlertMessage, {
    type: "success",
    title: "Title is here",
    message: "Message is here"
  }));
});