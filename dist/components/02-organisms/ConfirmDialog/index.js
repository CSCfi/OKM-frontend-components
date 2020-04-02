import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "../DialogTitle";
import "../../../css/tailwind.css";

var ConfirmDialog = function ConfirmDialog(props) {
  var _props$isConfirmDialo = props.isConfirmDialogVisible,
      isConfirmDialogVisible = _props$isConfirmDialo === void 0 ? false : _props$isConfirmDialo,
      handleOk = props.handleOk,
      handleCancel = props.handleCancel,
      onClose = props.onClose,
      title = props.title,
      content = props.content,
      yesMessage = props.yesMessage,
      noMessage = props.noMessage;
  return React.createElement(Dialog, {
    open: isConfirmDialogVisible,
    fullWidth: true,
    "aria-labelledby": "confirm-dialog",
    maxWidth: "sm"
  }, React.createElement(DialogTitle, {
    id: "confirm-dialog",
    onClose: onClose
  }, title), React.createElement(DialogContent, null, React.createElement("div", {
    className: "p-2"
  }, content)), React.createElement(DialogActions, null, React.createElement("div", {
    className: "flex pr-6 pb-4"
  }, React.createElement("div", {
    className: "mr-4"
  }, React.createElement(Button, {
    onClick: handleCancel,
    color: "primary",
    variant: "outlined"
  }, noMessage)), React.createElement(Button, {
    onClick: handleOk,
    color: "primary",
    variant: "contained"
  }, yesMessage))));
};

export default ConfirmDialog;