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
      messages = props.messages;
  return /*#__PURE__*/React.createElement(Dialog, {
    open: isConfirmDialogVisible,
    fullWidth: true,
    "aria-labelledby": "confirm-dialog",
    maxWidth: "sm"
  }, /*#__PURE__*/React.createElement(DialogTitle, {
    id: "confirm-dialog",
    onClose: onClose
  }, messages.title), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement("div", {
    className: "p-2"
  }, messages.content)), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement("div", {
    className: "flex pr-6 pb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: handleCancel,
    color: "primary",
    variant: "outlined"
  }, messages.cancel)), /*#__PURE__*/React.createElement(Button, {
    onClick: handleOk,
    color: "primary",
    variant: "contained"
  }, messages.ok))));
};

export default ConfirmDialog;