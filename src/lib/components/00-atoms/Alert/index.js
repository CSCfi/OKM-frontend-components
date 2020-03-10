import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Link from "@material-ui/core/Link";

/**
 * AlertMessage wraps a Alert
 * https://material-ui.com/components/alert/
 * Uses handleClick to call callback.
 * @param props
 *    ariaLabel: aria-label as string,
 *    title: title as string,
 *    message: message as string,
 *    type: type of alert info (default), warning, error, success
 *    handleClick: click call back function (if a link)
 * @returns {*}
 * @constructor
 */

const useStyles = makeStyles(theme => ({
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
}));

const AlertMessage = props => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {props.handleClick ? (
        // alert is a link
        <Link onClick={props.handleClick} style={{ cursor: "pointer" }}>
          <Alert
            id={props.id}
            aria-label={props.ariaLabel}
            severity={props.type}>
            {props.title && <AlertTitle>{props.title}</AlertTitle>}
            {props.message && props.message}
          </Alert>
        </Link>
      ) : (
        // if not a link
        <Alert id={props.id} aria-label={props.ariaLabel} severity={props.type}>
          {props.title && <AlertTitle>{props.title}</AlertTitle>}
          {props.message && props.message}
        </Alert>
      )}
    </div>
  );
};

AlertMessage.defaultProps = {
  id: "Alert",
  type: "info",
  ariaLabel: "alert"
};

AlertMessage.propTypes = {
  id: PropTypes.string,
  /** aria-label as string */
  ariaLabel: PropTypes.string,
  /** title as string */
  title: PropTypes.string,
  /** message as string */
  message: PropTypes.string,
  /** type of alert info (default), warning, error, success */
  type: PropTypes.string,
  /** click call back function (if a link) */
  handleClick: PropTypes.func
};

export default AlertMessage;
