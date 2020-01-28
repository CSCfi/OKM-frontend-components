import React from "react";
import Drawer from "@material-ui/core/Drawer";

var SideNavigation = function SideNavigation(_ref) {
  var children = _ref.children,
      handleDrawerToggle = _ref.handleDrawerToggle,
      isVisible = _ref.isVisible;

  var toggleDrawer = function toggleDrawer(isOpen) {
    return function (event) {
      if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
        return;
      }

      handleDrawerToggle(isOpen);
    };
  };

  return React.createElement("div", {
    "data-testid": "side-navigation"
  }, React.createElement(Drawer, {
    open: isVisible,
    onClose: toggleDrawer(false)
  }, React.createElement("div", {
    tabIndex: 0,
    role: "presentation",
    onClick: toggleDrawer(false),
    onKeyDown: toggleDrawer(false)
  }, children)));
};

export default SideNavigation;