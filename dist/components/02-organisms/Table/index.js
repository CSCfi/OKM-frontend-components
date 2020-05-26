import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useMemo, useState } from "react";
import TableCell from "./TableCell";
import TableRow from "./TableRow";
import RowGroup from "./RowGroup";
import { sortObjectsByProperty } from "../../../utils/common";
import * as R from "ramda";
/**
 *
 * @param {object} props - Properties object.
 * @param {object} props.structure - Structure of the table.
 * @param {level} props.level - Level of unnested table is 0.
 * @param {object} props.sortedBy - Default sorting configuration.
 * @param {number} props.sortedBy.columnIndex - Column index.
 * @param {string} props.order - Valid values: ascending, descending.
 */

var Table = function Table(_ref) {
  var structure = _ref.structure,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? 0 : _ref$level,
      _ref$sortedBy = _ref.sortedBy,
      sortedBy = _ref$sortedBy === void 0 ? {} : _ref$sortedBy;

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      sortingHistory = _useState2[0],
      setSortingHistory = _useState2[1]; // This is for sorting the rows.


  var orderSwap = {
    ascending: "descending",
    descending: "ascending"
  };
  /**
   * The rows of the tbody section are sorted according to this.
   * Here you can see the default settings.
   **/

  var _useState3 = useState({
    columnIndex: R.is(Number, sortedBy.columnIndex) ? sortedBy.columnIndex : 0,
    order: sortedBy.order || "ascending"
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      orderOfBodyRows = _useState4[0],
      setOrderOfBodyRows = _useState4[1];
  /**
   * Sorting function.
   */


  var sortedStructure = useMemo(function () {
    setSortingHistory(function (prevValue) {
      return _objectSpread(_objectSpread({}, prevValue), {}, _defineProperty({}, orderOfBodyRows.columnIndex, orderOfBodyRows.order));
    });
    var indexOfTbody = R.findIndex(R.propEq("role", "tbody"), structure);

    if (indexOfTbody >= 0) {
      var rowsPath = [indexOfTbody, "rowGroups", 0, "rows"]; // ASC sorting is happening here.

      var sorted = R.sort(function (a, b) {
        return sortObjectsByProperty(a, b, ["cells", orderOfBodyRows.columnIndex, "text"]);
      }, R.path(rowsPath, structure) || []); // If user wants to sort by descending order the sorted array will be reversed.

      var updatedStructure = R.assocPath(rowsPath, orderOfBodyRows.order === "ascending" ? sorted : R.reverse(sorted), structure);
      return updatedStructure;
    }

    return structure;
  }, [orderOfBodyRows, structure]);
  /**
   * There are rows in the table's structure object. One of those rows are
   * passed to this function as a parameter and its callback function will
   * be called.
   * @param {string} action - Identifier for the executed action.
   * @param {object} row - Includes cells and other row related data.
   */

  function onRowClick(action, row) {
    if (row.onClick) {
      /**
       * User can define actions in table's structure object. Actions are
       * used later to run the correct operations for the action related row.
       * Handling actions happens outside of the Table component.
       **/
      row.onClick(row, action);
    }
  }
  /**
   *
   * @param {string} action - Custom text string.
   * @param {object} properties - Contains cell related properties.
   * @param {number} properties.columnIndex - Index of the clicked column.
   * @param {object} properties.row - Row that contains the clicked cell.
   */


  function onCellClick(action, _ref2) {
    var columnIndex = _ref2.columnIndex,
        row = _ref2.row;

    // Sort action is handled inside the Table component.
    if (action === "sort") {
      setOrderOfBodyRows(function (prevState) {
        var order = R.prop(prevState.order, orderSwap);

        if (prevState.columnIndex !== columnIndex) {
          order = sortingHistory[columnIndex] || "ascending";
        }

        return {
          columnIndex: columnIndex,
          order: order
        };
      });
    } else {
      /**
       * Cell related actions are expanded to row level. This can change
       * later if cell click related callbacks are needed.
       **/
      onRowClick(action, row);
    }
  }
  /**
   * Forms the table rows and nested Table components.
   * @param {object} part - Object of the structure array.
   * @param {string} part.role - E.g. thead, tbody...
   * @param {array} part.rowGroups - Array of rowgroup objects.
   * @param {array} rows - Array of row objects.
   */


  var getRowsToRender = function getRowsToRender(part) {
    var rows = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var jsx = R.addIndex(R.map)(function (row, iii) {
      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: iii
      }, /*#__PURE__*/React.createElement(TableRow, {
        key: "row-".concat(iii),
        row: row,
        onClick: onRowClick,
        tableLevel: level
      }, R.addIndex(R.map)(function (cell, iiii) {
        return /*#__PURE__*/React.createElement(TableCell, {
          columnIndex: iiii,
          isHeaderCell: part.role === "thead",
          isOnLastRow: iii === rows.length - 1,
          key: "cell-".concat(iiii),
          onClick: onCellClick,
          orderOfBodyRows: orderOfBodyRows,
          properties: cell,
          row: row,
          tableLevel: level
        }, cell.table &&
        /*#__PURE__*/
        // Nested table is created here.
        React.createElement(Table, {
          level: level + 1,
          structure: cell.table
        }));
      }, row.cells || [])), row.rows && getRowsToRender(part, row.rows));
    }, rows);
    return jsx;
  };
  /**
   * Starting point of table creation. Structure will be walked through and table's
   * different parts will be created.
   */


  var table = R.addIndex(R.map)(function (part, i) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, R.addIndex(R.map)(function (rowGroup, ii) {
      return /*#__PURE__*/React.createElement(RowGroup, {
        key: "rowGroup-".concat(ii),
        tableLevel: level
      }, getRowsToRender(part, rowGroup.rows));
    }, part.rowGroups || []));
  }, sortedStructure); // The table will is rendered.

  return /*#__PURE__*/React.createElement("div", {
    role: "grid"
  }, table);
};

export default Table;