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
    title,
    content,
    yesMessage,
    noMessage
  } = props;

  return (
    <Dialog
      open={isConfirmDialogVisible}
      fullWidth={true}
      aria-labelledby="confirm-dialog"
      maxWidth="sm">
      <DialogTitle id="confirm-dialog" onClose={onClose}>
        {title}
      </DialogTitle>
      <DialogContent>
        <div className="p-2">{content}</div>
      </DialogContent>
      <DialogActions>
        <div className="flex pr-6 pb-4">
          <div className="mr-4">
            <Button onClick={handleCancel} color="primary" variant="outlined">
              {noMessage}
            </Button>
          </div>
          <Button onClick={handleOk} color="primary" variant="contained">
            {yesMessage}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  // Title.
  title: PropTypes.string,
  // Main content of the dialog. Usually a sentence or a paragraph.
  content: PropTypes.string,
  // Is the dialog visible? Default value is false.
  isConfirmDialogVisible: PropTypes.bool,
  // Callback function for handling the click of OK button.
  handleOk: PropTypes.func,
  // Callback function for handling the click of Cancel button.
  handleCancel: PropTypes.func,
  // Text content of the OK button.
  yesMessage: PropTypes.string,
  // Text content of the Cancel button.
  noMessage: PropTypes.string
};

export default ConfirmDialog;
