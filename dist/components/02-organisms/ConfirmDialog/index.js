import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import DialogTitle from "../DialogTitle";
import '../../../css/tailwind.css';

var ConfirmDialog = function ConfirmDialog(props) {
  var isConfirmDialogVisible = props.isConfirmDialogVisible,
      handleOk = props.handleOk,
      handleCancel = props.handleCancel,
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
    id: "confirm-dialog"
  }, title), React.createElement(DialogContent, null, content), React.createElement(DialogActions, null, React.createElement(Button, {
    onClick: handleOk,
    color: "primary",
    variant: "contained"
  }, yesMessage), React.createElement(Button, {
    onClick: handleCancel,
    color: "secondary",
    variant: "outlined"
  }, noMessage)));
};

export default ConfirmDialog;