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
  return /*#__PURE__*/React.createElement(Dialog, {
    open: isConfirmDialogVisible,
    fullWidth: true,
    "aria-labelledby": "confirm-dialog",
    maxWidth: "sm"
  }, /*#__PURE__*/React.createElement(DialogTitle, {
    id: "confirm-dialog",
    onClose: onClose
  }, title), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement("div", {
    className: "p-2"
  }, content)), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement("div", {
    className: "flex pr-6 pb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: handleCancel,
    color: "primary",
    variant: "outlined"
  }, noMessage)), /*#__PURE__*/React.createElement(Button, {
    onClick: handleOk,
    color: "primary",
    variant: "contained"
  }, yesMessage))));
};

export default ConfirmDialog;