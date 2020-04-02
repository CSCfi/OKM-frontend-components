import React from "react";
import { storiesOf } from "@storybook/react";
import ExpandableRow from "./index";
import { withInfo } from "@storybook/addon-info";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
var theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});
storiesOf("ExpandableRow", module).addDecorator(withInfo).add("is shrinked", function () {
  return /*#__PURE__*/React.createElement(MuiThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(ExpandableRow, null, /*#__PURE__*/React.createElement("div", {
    "data-slot": "title"
  }, "Title of an expandable row"), /*#__PURE__*/React.createElement("div", {
    "data-slot": "info"
  }, "Info section"), /*#__PURE__*/React.createElement("div", {
    "data-slot": "content"
  }, "There is some content here...")));
}).add("is expanded", function () {
  return /*#__PURE__*/React.createElement(MuiThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(ExpandableRow, {
    shouldBeExpanded: true
  }, /*#__PURE__*/React.createElement("div", {
    "data-slot": "title"
  }, "Title"), /*#__PURE__*/React.createElement("div", {
    "data-slot": "info"
  }, "Info section"), /*#__PURE__*/React.createElement("div", {
    "data-slot": "content"
  }, "There is some content here...")));
});