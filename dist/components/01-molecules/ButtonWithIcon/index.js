import React from "react";
import Icon from "../../00-atoms/Icon";
import Slot from "../../00-atoms/Slot/Slot";

var ButtonWithIcon = function ButtonWithIcon(props) {
  return React.createElement("button", {
    type: "button"
  }, props.icon && React.createElement("div", {
    className: "mr-4"
  }, React.createElement(Slot, {
    slot: "icon"
  }, React.createElement(Icon, null))), props.title && React.createElement(Slot, {
    slot: "title"
  }));
};

export default ButtonWithIcon;