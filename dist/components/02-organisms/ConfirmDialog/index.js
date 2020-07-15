import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "../DialogTitle";
import "../../../css/tailwind.css";
import CircularProgress from "@material-ui/core/CircularProgress";

var ConfirmDialog = function ConfirmDialog(props) {
  var _props$isConfirmDialo = props.isConfirmDialogVisible,
      isConfirmDialogVisible = _props$isConfirmDialo === void 0 ? false : _props$isConfirmDialo,
      handleOk = props.handleOk,
      handleCancel = props.handleCancel,
      handleExitAndAbandonChanges = props.handleExitAndAbandonChanges,
      onClose = props.onClose,
      messages = props.messages,
      _props$loadingSpinner = props.loadingSpinner,
      loadingSpinner = _props$loadingSpinner === void 0 ? false : _props$loadingSpinner;
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
  }, messages.cancel)), !!handleExitAndAbandonChanges && /*#__PURE__*/React.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: handleExitAndAbandonChanges,
    color: "primary",
    variant: "outlined"
  }, messages.noSave)), /*#__PURE__*/React.createElement(Button, {
    onClick: handleOk,
    color: "primary",
    variant: "contained",
    disabled: loadingSpinner
  }, loadingSpinner ? /*#__PURE__*/React.createElement(CircularProgress, {
    size: 20
  }) : messages.ok))));
};

export default ConfirmDialog;