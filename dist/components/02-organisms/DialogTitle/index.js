import { withStyles } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
var DialogTitle = withStyles(function (theme) {
  return {
    root: {
      borderBottom: "1px solid ".concat(theme.palette.divider),
      margin: 0,
      padding: theme.spacing(2),
      background: "#c7dcc3"
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
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