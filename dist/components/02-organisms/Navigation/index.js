import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, makeStyles } from "@material-ui/core";
import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout";
import { NavLink } from "react-router-dom";
import * as R from "ramda";
var useStyles = makeStyles(function () {
  return {
    root: {
      boxShadow: "none"
    }
  };
});

var Navigation = function Navigation(_ref) {
  var _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? "horizontal" : _ref$direction,
      links = _ref.links,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? {
    backgroundColor: "green-500",
    color: "white",
    hoverColor: "green-400"
  } : _ref$theme;
  var classes = useStyles(theme);
  var items = R.addIndex(R.map)(function (link, index) {
    return React.createElement(NavLink, {
      key: "link-".concat(index),
      exact: link.isExact,
      activeClassName: "font-bold md:bg-green-800 md:font-normal",
      to: link.path,
      className: "px-8 ".concat(direction !== "vertical" ? "border-r border-green-600" : "", " py-4 flex-1 tracking-wider min-w-200 lg:max-w-xxs sm:min-w-initial\n         hover:bg-").concat(theme.hoverColor, " text-").concat(theme.color, " text-center flex-wrap whitespace-no-wrap")
    }, link.text);
  }, links);
  return React.createElement(React.Fragment, null, (!direction || direction === "horizontal") && React.createElement(AppBar, {
    position: "static",
    classes: classes
  }, React.createElement(Toolbar, {
    variant: "dense",
    className: "flex flex-wrap text-black border \n        border-gray-300 text-sm overflow-auto hide-scrollbar bg-".concat(theme.backgroundColor),
    disableGutters: true
  }, React.createElement(HorizontalLayout, {
    items: items
  }))), direction === "vertical" && React.createElement(VerticalLayout, {
    items: items
  }));
};

export default Navigation;