import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import * as R from "ramda";
/**
 * Simple menus open over the anchor element by default (this option can be
 * changed via props). When close to a screen edge, simple menus vertically
 * realign to make sure that all menu items are completely visible. For more
 * information see Material-UI's SimpleMenu component.
 * @param {object} props - properties object.
 */

function SimpleMenu(_ref) {
  var _ref$actions = _ref.actions,
      actions = _ref$actions === void 0 ? [] : _ref$actions,
      id = _ref.id;

  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];
  /**
   * This is called to get the menu open. When it's open the list of actions
   * are visible.
   * @param {object} event - Native browser event.
   */


  var handleClick = function handleClick(event) {
    /**
     * Stopping is written for using the SimpleMenu in a cell of the Table
     * component. If propagation is allowed clicking the menu icon
     * also triggers click events of SimpleMenu's parent elements.
     */
    event.stopPropagation(); // This opens the menu and shows its actions.

    setAnchorEl(event.currentTarget);
  };
  /**
   * Calls the callback function of the selected action (if available) and
   * closes the menu.
   * @param {object} event - Native browser event.
   * @param {object} action - Action that user has selected (clicked).
   * @param {string} action.id  - Identifies the action.
   * @param {string} action.text - Text that is shown on UI to make selecting easier.
   * @param {function} action.onClick - Callback function. Is called when user selects the action.
   */


  var handleClose = function handleClose(event, action) {
    /**
     * Stopping is written for using the SimpleMenu in a cell of the Table
     * component. If propagation is allowed clicking the menu icon
     * also triggers click events of SimpleMenu's parent elements.
     */
    event.stopPropagation();

    if (action && action.onClick) {
      // Action's callback function is called here.
      action.onClick(action);
    } // Closes the menu.


    setAnchorEl(null);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(IconButton, {
    "aria-controls": "simple-menu",
    "aria-haspopup": "true",
    onClick: handleClick
  }, /*#__PURE__*/React.createElement(MoreVertIcon, null)), /*#__PURE__*/React.createElement(Menu, {
    id: id,
    anchorEl: anchorEl,
    keepMounted: true,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, R.addIndex(R.map)(function (action, i) {
    return /*#__PURE__*/React.createElement(MenuItem, {
      key: "action-".concat(i),
      onClick: function onClick(e) {
        handleClose(e, action);
        return false;
      }
    }, action.text);
  }, actions)));
}

export default SimpleMenu;