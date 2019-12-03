import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import ConfirmDialog from "./index";
storiesOf("Confirm Dialog", module).addDecorator(withInfo).add("Example 1", function () {
  return React.createElement(ConfirmDialog, {
    content: "Haluatko poistua?",
    title: "Poistetaanko?",
    isConfirmDialogVisible: true,
    handleCancel: function handleCancel() {
      return console.log('cancel');
    },
    handleOk: function handleOk() {
      return console.log('ok');
    },
    yesMessage: "Kyllä",
    noMessage: "Ei"
  });
});