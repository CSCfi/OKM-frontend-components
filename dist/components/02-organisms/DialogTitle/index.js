import { withStyles } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
var DialogTitle = withStyles(function (theme) {
  return {
    root: {
      margin: 0,
      paddingLeft: theme.spacing(4),
      paddingTop: theme.spacing(3),
      paddingBottom: 0,
      background: "#ffffff"
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(2),
      top: theme.spacing(2),
      color: theme.palette.grey[500]
    }
  };
})(function (props) {
  var children = props.children,
      classes = props.classes,
      onClose = props.onClose;
  return React.createElement(MuiDialogTitle, {
    disableTypography: true,
    className: classes.root
  }, React.createElement(Typography, {
    variant: "h6"
  }, children), onClose ? React.createElement(IconButton, {
    "aria-label": "Close",
    className: classes.closeButton,
    onClick: onClose
  }, React.createElement(CloseIcon, null)) : null);
});
export default DialogTitle;