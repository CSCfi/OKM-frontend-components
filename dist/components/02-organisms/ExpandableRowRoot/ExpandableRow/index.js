import React from "react";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { withStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Slot from "../../../00-atoms/Slot/Slot";
/**
 * @module Components/01-molecules
 */

var ExpansionPanel = withStyles({
  root: {
    border: "1px solid rgba(0,0,0,.125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    }
  },
  expanded: {
    margin: "auto"
  }
})(MuiExpansionPanel);
var ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: "rgba(0,0,0,.03)",
    borderBottom: "1px solid rgba(0,0,0,.125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    },
    alignItems: "center"
  },
  expanded: {}
})(function (props) {
  return /*#__PURE__*/React.createElement(MuiExpansionPanelSummary, props);
});
ExpansionPanelSummary.muiName = "ExpansionPanelSummary";
var ExpansionPanelDetails = withStyles(function (theme) {
  return {
    root: {
      padding: theme.spacing(0)
    }
  };
})(MuiExpansionPanelDetails); // className="flex items-center cursor-pointer bg-grey-light hover:bg-grey p-2"

/**
 * The row can be expanded and shrinked. The div marked with data-slot="content" attribute is visible when the row is expanded.
 */

var ExpandableRow = function ExpandableRow(props) {
  return /*#__PURE__*/React.createElement(ExpansionPanel, {
    defaultExpanded: props.shouldBeExpanded,
    onChange: props.onToggle
  }, /*#__PURE__*/React.createElement(ExpansionPanelSummary, {
    expandIcon: /*#__PURE__*/React.createElement(ExpandMoreIcon, null),
    id: "".concat(props.id, "-summary")
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement(Slot, {
    slot: "title"
  }, props.children)), /*#__PURE__*/React.createElement(Slot, {
    slot: "info"
  }, props.children)), /*#__PURE__*/React.createElement(ExpansionPanelDetails, null, /*#__PURE__*/React.createElement(Slot, {
    slot: "content"
  }, props.children)));
};

ExpandableRow.defaultProps = {
  shouldBeExpanded: false
};
export default ExpandableRow;