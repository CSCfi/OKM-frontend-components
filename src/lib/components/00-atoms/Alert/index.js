import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Link from "@material-ui/core/Link";

// https://material-ui.com/components/alert/
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

const AlertMessage = React.memo(props => {
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
});

AlertMessage.defaultProps = {
  name: "Alert",
  type: "info",
  ariaLabel: "alert"
};

AlertMessage.propTypes = {
  ariaLabel: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.string,
  handleClick: PropTypes.func
};

export default AlertMessage;
