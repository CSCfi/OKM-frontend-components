import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import SideNavigation from ".";
import { Button } from "@material-ui/core";
storiesOf("SideNavigation", module).add("Basic layout", function () {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSideMenuVisible = _useState2[0],
      setSideMenuVisibility = _useState2[1];

  function toggleDrawer() {
    return setSideMenuVisibility(function (isVisible) {
      return !isVisible;
    });
  }

  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "flex justify-center pt-24"
  }, React.createElement(Button, {
    variant: "contained",
    color: "primary",
    className: "float-right",
    onClick: function onClick() {
      toggleDrawer();
    }
  }, "Toggle menu")), React.createElement(SideNavigation, {
    handleDrawerToggle: toggleDrawer,
    isVisible: isSideMenuVisible
  }, "Content of the menu."));
});