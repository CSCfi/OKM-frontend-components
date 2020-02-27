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
  return React.createElement(MuiThemeProvider, {
    theme: theme
  }, React.createElement(ExpandableRow, null, React.createElement("div", {
    "data-slot": "title"
  }, "Title of an expandable row"), React.createElement("div", {
    "data-slot": "info"
  }, "Info section"), React.createElement("div", {
    "data-slot": "content"
  }, "There is some content here...")));
}).add("is expanded", function () {
  return React.createElement(MuiThemeProvider, {
    theme: theme
  }, React.createElement(ExpandableRow, {
    shouldBeExpanded: true
  }, React.createElement("div", {
    "data-slot": "title"
  }, "Title"), React.createElement("div", {
    "data-slot": "info"
  }, "Info section"), React.createElement("div", {
    "data-slot": "content"
  }, "There is some content here...")));
});