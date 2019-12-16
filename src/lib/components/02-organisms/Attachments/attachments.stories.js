import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import Attachments from "./index";

storiesOf("Attachments", module)
  .addDecorator(withInfo)
  .add("Example 1", () => (
    <Attachments
      name="example"
      attachmentDownload="Download"
      attachmentSecretUnselect="Unselect"
      attachmentSecretSelect="Select"
      attachmentRemove="Remove"
      attachmentSecret="Secret"
      attachmentNone="None"
      attachmentError="Error"
      attachmentName="Name"
      attachmentErrorName="Error name"
      ok="Ok"
      cancel="Cancel"
    />
  ));
