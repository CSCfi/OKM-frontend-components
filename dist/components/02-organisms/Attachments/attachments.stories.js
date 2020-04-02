import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Attachments from "./index";
storiesOf("Attachments", module).addDecorator(withInfo).add("Example 1", function () {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Attachments, {
    name: "example",
    messages: {
      addAttachment: "Lisää liite",
      attachmentDownload: "Lataa koneelle"
    }
  }), /*#__PURE__*/React.createElement(Attachments, {
    name: "example3",
    isRequired: true,
    requiredMessage: "Liite vaaditaan",
    showValidationErrors: true,
    payload: null,
    messages: {
      addAttachment: "Lisää liite",
      attachmentDownload: "Lataa koneelle"
    }
  }));
});