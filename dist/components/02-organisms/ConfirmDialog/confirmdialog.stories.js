import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import ConfirmDialog from "./index";
var messages = {
  ok: "Merkitse päätetyksi",
  cancel: "Peruuta",
  content: "Tähän kuvaava ohjeteksti varmistamaan, että muutokset on allekirjoitutettu ministerillä. Muutosta ei voi esittelijä kumota.",
  title: "Merkitäänkö asia päätetyksi?",
  noSave: "Älä tallenna"
};
storiesOf("Confirm Dialog", module).addDecorator(withInfo).add("Example 1", function () {
  return /*#__PURE__*/React.createElement(ConfirmDialog, {
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
    messages: messages
  });
}).add("With abandon changes", function () {
  return /*#__PURE__*/React.createElement(ConfirmDialog, {
    isConfirmDialogVisible: true,
    handleCancel: function handleCancel() {
      return console.log("cancel");
    },
    handleOk: function handleOk() {
      return console.log("ok");
    },
    handleExitAndAbandonChanges: function handleExitAndAbandonChanges() {
      return console.log("exit not saving");
    },
    onClose: function onClose() {
      return console.log("onClose clicked!");
    },
    messages: messages
  });
});