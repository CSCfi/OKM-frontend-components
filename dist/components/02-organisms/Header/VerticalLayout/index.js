import React from "react";
import "./template-c.css";

var VerticalLayout = function VerticalLayout(_ref) {
  var children = _ref.children,
      items = _ref.items;
  return /*#__PURE__*/React.createElement("div", {
    className: "template-c-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-self-end p-4"
  }, items[0]), /*#__PURE__*/React.createElement("div", {
    className: "justify-self-end align-self-center p-4"
  }, items[1]), /*#__PURE__*/React.createElement("div", {
    className: "p-4"
  }, children));
};

export default VerticalLayout;