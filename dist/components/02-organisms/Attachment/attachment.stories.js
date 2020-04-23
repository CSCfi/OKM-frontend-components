import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Attachment from "./index";
storiesOf("Attachment", module).addDecorator(withInfo).add("Example 1", function () {
  return /*#__PURE__*/React.createElement(Attachment, {
    name: "example",
    messages: {
      addAttachment: "Lisää liite..."
    }
  });
});