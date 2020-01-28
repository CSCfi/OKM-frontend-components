import React from "react";
import { addIndex, map } from "ramda";

var VerticalLayout = function VerticalLayout(_ref) {
  var items = _ref.items;
  return React.createElement("div", {
    className: "flex flex-col"
  }, addIndex(map)(function (item, index) {
    return item;
  }, items));
};

export default VerticalLayout;