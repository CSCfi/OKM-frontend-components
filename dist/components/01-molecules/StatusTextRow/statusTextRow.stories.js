import React from "react";
import { storiesOf } from "@storybook/react";
import StatusTextRow from "./index";
import { withInfo } from "@storybook/addon-info";
import { isInLupa, isAdded } from "../../../css/label";
storiesOf("StatusTextRow", module).addDecorator(withInfo).add("is added and is in lupa", function () {
  return /*#__PURE__*/React.createElement(StatusTextRow, {
    labelStyles: Object.assign({}, isInLupa, isAdded)
  }, /*#__PURE__*/React.createElement("div", null, "Example text 1"));
});