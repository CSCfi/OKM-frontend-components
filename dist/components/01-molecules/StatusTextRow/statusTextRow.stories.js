import React from "react";
import { storiesOf } from "@storybook/react";
import StatusTextRow from "./index";
import { withInfo } from "@storybook/addon-info";
import { isInLupa, isAdded } from "../../../css/label";
storiesOf("StatusTextRow", module).addDecorator(withInfo).add("is added and is in lupa", function () {
  return React.createElement(StatusTextRow, {
    labelStyles: Object.assign({}, isInLupa, isAdded)
  }, React.createElement("div", null, "Example text 1"));
});