import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import ExpandableRow from "./ExpandableRow";
import CategorizedListRoot from "../CategorizedListRoot";
import NumberOfChanges from "../../00-atoms/NumberOfChanges";
import { makeStyles } from "@material-ui/core/styles";
import UndoIcon from "@material-ui/icons/Undo";
import Button from "@material-ui/core/Button"; // import Icon from "@material-ui/core/Icon";

import Tooltip from "@material-ui/core/Tooltip";
var useStyles = makeStyles(function () {
  return {
    button: {
      padding: 0
    }
  };
});
var defaultProps = {
  categories: [],
  changes: [],
  disableReverting: false,
  hideAmountOfChanges: false,
  isExpanded: false,
  messages: {
    undo: "Undo"
  },
  showCategoryTitles: false
};

var ExpandableRowRoot = function ExpandableRowRoot(_ref) {
  var anchor = _ref.anchor,
      _ref$categories = _ref.categories,
      categories = _ref$categories === void 0 ? defaultProps.categories : _ref$categories,
      _ref$changes = _ref.changes,
      changes = _ref$changes === void 0 ? defaultProps.changes : _ref$changes,
      children = _ref.children,
      code = _ref.code,
      _ref$disableReverting = _ref.disableReverting,
      disableReverting = _ref$disableReverting === void 0 ? defaultProps.disableReverting : _ref$disableReverting,
      _ref$hideAmountOfChan = _ref.hideAmountOfChanges,
      hideAmountOfChanges = _ref$hideAmountOfChan === void 0 ? defaultProps.hideAmountOfChanges : _ref$hideAmountOfChan,
      index = _ref.index,
      _ref$isExpanded = _ref.isExpanded,
      isExpanded = _ref$isExpanded === void 0 ? defaultProps.isExpanded : _ref$isExpanded,
      _ref$messages = _ref.messages,
      messages = _ref$messages === void 0 ? defaultProps.messages : _ref$messages,
      onChangesRemove = _ref.onChangesRemove,
      onUpdate = _ref.onUpdate,
      sectionId = _ref.sectionId,
      _ref$showCategoryTitl = _ref.showCategoryTitles,
      showCategoryTitles = _ref$showCategoryTitl === void 0 ? defaultProps.showCategoryTitles : _ref$showCategoryTitl,
      title = _ref.title,
      isReadOnly = _ref.isReadOnly,
      showValidationErrors = _ref.showValidationErrors;
  var classes = useStyles();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isToggledOpen = _useState2[0],
      setIsToggleOpen = _useState2[1];

  var onToggle = function onToggle() {
    setIsToggleOpen(arguments.length <= 1 ? undefined : arguments[1]);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, categories && /*#__PURE__*/React.createElement(ExpandableRow, {
    shouldBeExpanded: isExpanded,
    onToggle: onToggle,
    id: anchor
  }, /*#__PURE__*/React.createElement("h4", {
    "data-slot": "title",
    className: "opacity-75"
  }, code && /*#__PURE__*/React.createElement("span", {
    className: "pr-6"
  }, code), /*#__PURE__*/React.createElement("span", null, title)), /*#__PURE__*/React.createElement("div", {
    "data-slot": "info"
  }, changes.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, !hideAmountOfChanges && /*#__PURE__*/React.createElement(NumberOfChanges, {
    changes: changes,
    id: anchor
  }), !disableReverting && /*#__PURE__*/React.createElement("span", {
    className: "mx-6"
  }, /*#__PURE__*/React.createElement(Tooltip, {
    title: messages.undo
  }, /*#__PURE__*/React.createElement(Button, {
    component: "span",
    color: "primary",
    className: classes.button,
    endIcon: /*#__PURE__*/React.createElement(UndoIcon, null),
    onClick: function onClick(e) {
      e.stopPropagation();
      return onChangesRemove(sectionId, anchor, index);
    },
    size: "small"
  }, messages.undo))))), /*#__PURE__*/React.createElement("div", {
    "data-slot": "content",
    className: "w-full ".concat(!children ? "p-8" : "")
  }, !children && (isExpanded || isToggledOpen) ? /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: anchor,
    categories: categories,
    changes: changes,
    index: index,
    onUpdate: onUpdate,
    sectionId: sectionId,
    showCategoryTitles: showCategoryTitles,
    isReadOnly: isReadOnly,
    showValidationErrors: showValidationErrors
  }) : children)));
};

export default ExpandableRowRoot;