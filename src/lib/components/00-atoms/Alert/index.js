import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
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
 *    linkText: link text as string
 *    isVisible: sets if component is visible
 *    handleVisibility: closing call back function
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
    },
    "& .MuiAlert-root": {
      display: "flex"
    },
    "& .MuiAlert-action": {
      marginLeft: 0,
      paddingLeft: "0.5em",
      flexGrow: "1"
    },
    "& .MuiButtonBase-root": {
      marginLeft: "auto !important"
    },
    "& .MuiLink-root": {
      color: "green",
      padding: "2px 0.5em 0 0"
    }
  }
}));

const AlertMessage = props => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={classes.root} isvisible={!props.isVisible && "collapse"}>
      <Collapse in={isOpen}>
        <Alert
          id={props.id}
          aria-label={props.ariaLabel}
          severity={props.type}
          variant="outlined"
          action={
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}>
              {props.handleClick && props.linkText && (
                <Link onClick={props.handleClick} style={{ cursor: "pointer" }}>
                  {props.linkText}
                </Link>
              )}
              <IconButton
                style={{ marginLeft: "1em" }}
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setIsOpen(false);
                }}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            </div>
          }>
          {props.title && <AlertTitle>{props.title}</AlertTitle>}
          <p>{props.message && props.message}</p>
        </Alert>
      </Collapse>
    </div>
  );
};

AlertMessage.defaultProps = {
  id: "Alert",
  type: "info",
  ariaLabel: "alert",
  linkText: "<missing linkText prop>"
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
  /** link text as string */
  linkText: PropTypes.string,
  /** click call back function (if a link) */
  handleClick: PropTypes.func,
  /** sets if component is visible */
  isVisible: PropTypes.bool,
  /** closing call back function */
  handleVisibility: PropTypes.func
};

export default AlertMessage;
