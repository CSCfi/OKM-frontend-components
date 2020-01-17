import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useMemo } from "react";
import Button from "@material-ui/core/Button";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import * as R from "ramda";
import { withStyles } from "@material-ui/core";
import SimpleMenu from "../../SimpleMenu";
/**
 * StyledButton is used for creating buttons for sort actions.
 */

var StyledButton = withStyles({
  root: {
    border: 0,
    color: "white",
    width: "100%",
    justifyContent: "left",
    outline: "none",
    margin: "0.5rem"
  },
  label: {
    textTransform: "none"
  }
})(Button);
/**
 * TableCell component. Used  by the Table component.
 * @param {object} props - Properties object.
 * @param {object} props.children - Dynamic content of the TableCell.
 * @param {number} props.columnIndex - Index of the cell on the current row.
 * @param {boolean} props.isHeaderCell - True if the cell is in thead section.
 * @param {boolean} props.isOnLastRow - True if the cell is on the last row of table.
 * @param {function} props.onClick - Will be called when the cell is clicked.
 * @param {array} props.orderOfBodyRows - Config object. Is used for showing sorting related info.
 * @param {object} props.properties - Config object. Defines cell related variables (see table structure).
 * @param {object} props.row - Row related data. The row contains the cell.
 * @param {number} props.tableLevel - Indicates the nesting level. For a flat table the value is 0.
 */

var TableCell = function TableCell(_ref) {
  var children = _ref.children,
      columnIndex = _ref.columnIndex,
      _ref$isHeaderCell = _ref.isHeaderCell,
      isHeaderCell = _ref$isHeaderCell === void 0 ? false : _ref$isHeaderCell,
      _ref$isOnLastRow = _ref.isOnLastRow,
      isOnLastRow = _ref$isOnLastRow === void 0 ? false : _ref$isOnLastRow,
      _onClick = _ref.onClick,
      orderOfBodyRows = _ref.orderOfBodyRows,
      _ref$properties = _ref.properties,
      properties = _ref$properties === void 0 ? {} : _ref$properties,
      row = _ref.row,
      _ref$tableLevel = _ref.tableLevel,
      tableLevel = _ref$tableLevel === void 0 ? 0 : _ref$tableLevel;
  var classNames = R.join(" ", R.without(["truncate"], properties.styleClasses || []));

  function sort() {
    _onClick("sort", {
      columnIndex: columnIndex,
      properties: properties
    });
  } // Callback functions of menu actions are called with additional data.


  var menuActions = useMemo(function () {
    return properties.menu ? R.map(function (action) {
      return _objectSpread({}, action, {
        onClick: function onClick() {
          return _onClick(action.id, {
            cell: properties,
            row: row
          });
        }
      });
    }, properties.menu.actions) : [];
  }, [_onClick, properties, row]);
  return React.createElement("div", {
    key: "key-".concat(Math.random()),
    role: isHeaderCell ? "columnheader" : "gridcell",
    className: "".concat(classNames, " ").concat(properties.table ? "w-full" : "flex", " ").concat(isHeaderCell ? "bg-green-".concat(tableLevel + 5, "00 text-white") : "p-2", " relative items-center ").concat(!isOnLastRow ? "border-b" : "")
  }, properties.isSortable ? React.createElement(StyledButton, {
    "aria-label": "Sort",
    onClick: function onClick() {
      sort();
    },
    title: properties.sortingTooltip
  }, properties.text && React.createElement("span", {
    className: properties.truncate ? "truncate" : ""
  }, properties.text), orderOfBodyRows && columnIndex === orderOfBodyRows.columnIndex && React.createElement(React.Fragment, null, orderOfBodyRows.order === "ascending" ? React.createElement(ArrowUpwardIcon, {
    fontSize: "small"
  }) : React.createElement(ArrowDownwardIcon, {
    fontSize: "small"
  }))) : React.createElement(React.Fragment, null, (properties.text || properties.menu) && React.createElement("span", {
    className: "".concat(properties.truncate ? "truncate" : "", " py-4 px-2 ").concat(isHeaderCell ? "cursor-default" : "")
  }, properties.text, properties.menu && React.createElement(SimpleMenu, {
    actions: menuActions,
    id: properties.menu.id
  }))), children);
};

export default TableCell;