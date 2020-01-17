import React from "react";
import "./template-a.css";

var HorizontalLayout = function HorizontalLayout(_ref) {
  var children = _ref.children,
      items = _ref.items;
  return React.createElement("div", {
    className: "template-a-container py-4"
  }, React.createElement("div", {
    className: "align-self-end pr-4"
  }, items[0]), React.createElement("div", {
    className: "item-2 pl-4"
  }, React.createElement("div", {
    className: "flex"
  }, React.createElement("div", {
    className: "flex flex-col pr-4 border-r align-self-center"
  }, React.createElement("div", null, items[2]), React.createElement("div", null, items[3])), React.createElement("div", {
    className: "align-self-center pl-4"
  }, children))), React.createElement("div", {
    className: "pr-4"
  }, React.createElement("p", null, items[1])));
};

export default HorizontalLayout;