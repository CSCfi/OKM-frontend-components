import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import ConfirmDialog from "./index";
import { withState } from "@dump247/storybook-state";
var messages = {
  ok: "Merkitse päätetyksi",
  cancel: "Peruuta",
  content: "Tähän kuvaava ohjeteksti varmistamaan, että muutokset on allekirjoitutettu ministerillä. Muutosta ei voi esittelijä kumota.",
  title: "Merkitäänkö asia päätetyksi?",
  noSave: "Älä tallenna"
};
storiesOf("Confirm Dialog", module).addDecorator(withInfo).add("Example 1", withState({
  clicked: false
})(function (_ref) {
  var store = _ref.store;
  return /*#__PURE__*/React.createElement(ConfirmDialog, {
    isConfirmDialogVisible: true,
    handleCancel: function handleCancel() {
      return console.log("cancel");
    },
    handleOk: function handleOk() {
      return store.set({
        clicked: true
      });
    },
    onClose: function onClose() {
      return console.log("onClose clicked!");
    },
    messages: messages,
    loadingSpinner: store.state.clicked
  });
})).add("With abandon changes", withState({
  clicked: false
})(function (_ref2) {
  var store = _ref2.store;
  return /*#__PURE__*/React.createElement(ConfirmDialog, {
    isConfirmDialogVisible: true,
    handleCancel: function handleCancel() {
      return console.log("cancel");
    },
    handleOk: function handleOk() {
      return store.set({
        clicked: true
      });
    },
    handleExitAndAbandonChanges: function handleExitAndAbandonChanges() {
      return console.log("exit not saving");
    },
    onClose: function onClose() {
      return console.log("onClose clicked!");
    },
    messages: messages,
    loadingSpinner: store.state.clicked
  });
}));