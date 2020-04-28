import React from "react";
import "./template-a.css";

var HorizontalLayout = function HorizontalLayout(_ref) {
  var children = _ref.children,
      items = _ref.items;
  return /*#__PURE__*/React.createElement("div", {
    className: "template-a-container py-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-self-end pr-4"
  }, items[0]), /*#__PURE__*/React.createElement("div", {
    className: "item-2 pl-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col pr-4 border-r align-self-center"
  }, /*#__PURE__*/React.createElement("div", null, items[2]), /*#__PURE__*/React.createElement("div", null, items[3])), /*#__PURE__*/React.createElement("div", {
    className: "align-self-center pl-4"
  }, children))), /*#__PURE__*/React.createElement("div", {
    className: "pr-4"
  }, /*#__PURE__*/React.createElement("p", null, items[1])));
};

export default HorizontalLayout;