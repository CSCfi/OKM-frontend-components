import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import ConfirmDialog from "./index";
storiesOf("Confirm Dialog", module).addDecorator(withInfo).add("Example 1", function () {
  return /*#__PURE__*/React.createElement(ConfirmDialog, {
    content: "Tähän kuvaava ohjeteksti varmistamaan, että muutokset on allekirjoitutettu ministerillä. Muutosta ei voi esittelijä kumota.",
    title: "Merkitäänkö asia päätetyksi?",
    isConfirmDialogVisible: true,
    handleCancel: function handleCancel() {
      return console.log("cancel");
    },
    handleOk: function handleOk() {
      return console.log("ok");
    },
    onClose: function onClose() {
      return console.log("onClose clicked!");
    },
    yesMessage: "Merkitse päätetyksi",
    noMessage: "Peruuta"
  });
});