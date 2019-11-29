import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React from "react";
import PropTypes from "prop-types";
import DialogTitle from "../DialogTitle";
import '../../../css/tailwind.css';

const ConfirmDialog = (props) => {

  const { isConfirmDialogVisible, handleOk, handleCancel, title, content, yesMessage, noMessage} = props;

  return (
    <Dialog
      open={isConfirmDialogVisible}
      fullWidth={true}
      aria-labelledby="confirm-dialog"
      maxWidth="sm"
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color="primary" variant="contained">
          {yesMessage}
        </Button>
        <Button
          onClick={handleCancel}
          color="secondary"
          variant="outlined"
        >
          {noMessage}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

ConfirmDialog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isConfirmDialogVisible: PropTypes.bool,
  handleOk: PropTypes.func,
  handleCancel: PropTypes.func,
  yesMessage: PropTypes.string,
  noMessage: PropTypes.string
};

export default ConfirmDialog;
