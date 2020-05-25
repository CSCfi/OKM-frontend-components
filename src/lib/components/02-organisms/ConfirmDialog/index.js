import React from "react";
import PropTypes from "prop-types";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "../DialogTitle";
import "../../../css/tailwind.css";

const ConfirmDialog = props => {
  const {
    isConfirmDialogVisible = false,
    handleOk,
    handleCancel,
    onClose,
    messages
  } = props;

  return (
    <Dialog
      open={isConfirmDialogVisible}
      fullWidth={true}
      aria-labelledby="confirm-dialog"
      maxWidth="sm">
      <DialogTitle id="confirm-dialog" onClose={onClose}>
        {messages.title}
      </DialogTitle>
      <DialogContent>
        <div className="p-2">{messages.content}</div>
      </DialogContent>
      <DialogActions>
        <div className="flex pr-6 pb-4">
          <div className="mr-4">
            <Button onClick={handleCancel} color="primary" variant="outlined">
              {messages.cancel}
            </Button>
          </div>
          <Button onClick={handleOk} color="primary" variant="contained">
            {messages.ok}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  // Is the dialog visible? Default value is false.
  isConfirmDialogVisible: PropTypes.bool,
  // Callback function for handling the click of OK button.
  handleOk: PropTypes.func,
  // Callback function for handling the click of Cancel button.
  handleCancel: PropTypes.func,
  messages: PropTypes.object
};

export default ConfirmDialog;
