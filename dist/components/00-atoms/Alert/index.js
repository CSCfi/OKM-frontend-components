import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
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
 *    ariaLabel: aria-label as string
 *    title: title as string
 *    message: message as string
 *    type: type of alert info (default), warning, error, success
 *    handleLinkClick: click call back function (if a link)
 *    linkText: link text as string
 *    payload: Custom object defined by user
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
  };
});
var AlertMessage = React.memo(function (props) {
  var classes = useStyles();

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setVisible = _useState2[1];

  var clickCallback = function clickCallback(e) {
    e.preventDefault();
    return props.handleLinkClick();
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(classes.root, " ").concat(isVisible ? "" : "hidden")
  }, /*#__PURE__*/React.createElement(Collapse, {
    in: props.isVisible
  }, /*#__PURE__*/React.createElement(Alert, {
    id: props.id,
    "aria-label": props.ariaLabel,
    severity: props.type,
    variant: "outlined",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        width: "100%"
      }
    }, props.linkUrl && props.linkText && /*#__PURE__*/React.createElement(Link, {
      href: props.linkUrl,
      style: {
        cursor: "pointer",
        textDecoration: "underline"
      }
    }, props.linkText), !props.linkUrl && props.handleLinkClick && props.linkText && /*#__PURE__*/React.createElement(Link, {
      onClick: clickCallback,
      style: {
        cursor: "pointer",
        textDecoration: "underline"
      }
    }, props.linkText), /*#__PURE__*/React.createElement(IconButton, {
      style: {
        marginLeft: "1em"
      },
      "aria-label": "close",
      color: "inherit",
      size: "small",
      onClick: function onClick() {
        return setVisible(false);
      }
    }, /*#__PURE__*/React.createElement(CloseIcon, {
      fontSize: "inherit"
    })))
  }, props.title && /*#__PURE__*/React.createElement(AlertTitle, null, props.title), /*#__PURE__*/React.createElement("p", null, props.message && props.message))));
}, function (pp, cp) {
  return pp.payload === cp.payload;
});
AlertMessage.defaultProps = {
  id: "Alert",
  type: "info",
  ariaLabel: "alert",
  linkText: "<missing linkText prop>",
  isVisible: true
};
export default AlertMessage;