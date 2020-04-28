import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import DialogTitle from "./index";
storiesOf("Dialog Title", module).addDecorator(withInfo).add("Example 1", function () {
  return /*#__PURE__*/React.createElement(DialogTitle, {
    onClose: function onClose() {
      return console.log("close");
    }
  }, "Hello World!");
});