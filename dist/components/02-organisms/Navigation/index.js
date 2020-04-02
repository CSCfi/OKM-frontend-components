import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, makeStyles } from "@material-ui/core";
import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout";
import { NavLink } from "react-router-dom";
import * as R from "ramda";
import "../../../css/tailwind.css";
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
    backgroundColor: "vihrea",
    color: "white",
    hoverColor: "green-600"
  } : _ref$theme;
  var classes = useStyles(theme);
  var items = R.addIndex(R.map)(function (link, index) {
    var className = "px-4 font-medium uppercase\n      py-4 flex-1 tracking-wider min-w-200 lg:max-w-xxs sm:min-w-initial\n      hover:bg-".concat(theme.hoverColor, " hover:text-").concat(theme.color, " visited:text-").concat(theme.color, " text-").concat(theme.color, " text-center flex-wrap whitespace-no-wrap");
    return link.url ? React.createElement("a", {
      href: link.url,
      key: "link-".concat(index),
      className: className
    }, link.text) : React.createElement(NavLink, {
      key: "link-".concat(index),
      exact: link.isExact,
      activeClassName: "font-bold md:bg-".concat(theme.hoverColor, " md:font-normal"),
      to: link.path,
      className: className
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