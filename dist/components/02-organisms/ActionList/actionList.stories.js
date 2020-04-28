import React from "react";
import { storiesOf } from "@storybook/react";
import ActionList from "./index";
import { withInfo } from "@storybook/addon-info";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
var theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});
storiesOf("Action list", module).addDecorator(withInfo).add("with removal action", function () {
  var items = [{
    title: "Item 1"
  }, {
    title: "Item 2"
  }, {
    title: "Item 3"
  }];

  var removeItem = function removeItem(item) {
    console.info("Going to remove item: ", item);
  };

  return /*#__PURE__*/React.createElement(MuiThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement(ActionList, {
    items: items,
    removalCallback: removeItem
  }));
});