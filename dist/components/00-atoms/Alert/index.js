import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Link from "@material-ui/core/Link"; // https://material-ui.com/components/alert/

/**
 * AlertMessage wraps a Alert
 * Uses handleClick to call callback.
 * @param props
 *    id: element id as string,
 *    ariaLabel: aria-label as striing,
 *    title: title as string,
 *    message: message as string,
 *    type: type of alert info (default), warning, error, success
 *    handleClick: click call back function (if a link)
 * @returns {*}
 * @constructor
 */

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2)
      },
      "& .MuiTypography-gutterBottom": {
        margin: 0 // removes extra margin especially if no message but only title

      },
      "& .MuiAlert-icon": {
        paddingTop: "8px" // overrides default 7px to center icon better with margin 0 of text

      }
    }
  };
});
var AlertMessage = React.memo(function (props) {
  var classes = useStyles();
  return React.createElement("div", {
    className: classes.root
  }, props.handleClick ? // alert is a link
  React.createElement(Link, {
    onClick: props.handleClick,
    style: {
      cursor: "pointer"
    }
  }, React.createElement(Alert, {
    id: props.id,
    "aria-label": props.ariaLabel,
    severity: props.type
  }, props.title && React.createElement(AlertTitle, null, props.title), props.message && props.message)) : // if not a link
  React.createElement(Alert, {
    id: props.id,
    "aria-label": props.ariaLabel,
    severity: props.type
  }, props.title && React.createElement(AlertTitle, null, props.title), props.message && props.message));
});
AlertMessage.defaultProps = {
  name: "Alert",
  type: "info",
  ariaLabel: "alert"
};
export default AlertMessage;