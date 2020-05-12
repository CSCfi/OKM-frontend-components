import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as R from "ramda";
/**
 * Basic table components.
 */

export var components = [// Grid is around the whole table data.
{
  id: "grid",
  name: "Grid"
}, // It's a row of a table.
{
  id: "table-row",
  name: "TableRow"
}, // Cell definition of a header row.
{
  id: "header-cell",
  name: "TableCell",
  properties: {
    isHeader: true
  }
}, // Cell of a body section.
{
  id: "cell",
  name: "TableCell"
}, // A row group can contain one or multiple rows.
{
  id: "row-group",
  name: "RowGroup"
}];

function getCell(properties) {
  return {
    ref: "cell",
    properties: properties
  };
}

function getHeaderCell(properties) {
  return {
    ref: "header-cell",
    properties: properties
  };
}

export function getMain(properties) {
  return {
    main: {
      components: [{
        ref: "grid",
        includes: properties.includes
      }]
    }
  };
}
export function getRowGroup(id, properties) {
  return _defineProperty({}, id, {
    components: [{
      ref: "row-group",
      includes: properties.includes,
      properties: {
        styleClasses: ["flex flex-col"]
      }
    }]
  });
}
export function getTableRow(id, properties, _onClick) {
  return _defineProperty({}, id, {
    components: [Object.assign({}, {
      ref: "table-row",
      includes: properties.includes
    }, _onClick ? {
      properties: {
        onClick: function onClick(action, properties) {
          return _onClick(action, properties);
        }
      }
    } : {})]
  });
}
export function dataCellsOnHeaderRow(id, cellsOfARow, properties, _onClick2) {
  return _defineProperty({}, id, {
    components: R.addIndex(R.map)(function (cellData, i) {
      return getHeaderCell({
        isHeader: true,
        isSortable: cellData.isSortable,
        columnIndex: i,
        orderOfBodyRows: properties.orderOfBodyRows,
        onClick: function onClick(action, properties) {
          return _onClick2(action, properties);
        },
        sortingToolTip: cellData.sortingTooltip,
        styleClasses: cellData.styleClasses || ["w-1/".concat(cellsOfARow.length)],
        title: cellData.text
      });
    }, cellsOfARow)
  });
}
export function dataCellsOnRow(id, cellsOfARow) {
  var obj = _defineProperty({}, id, {
    components: R.map(function (cellData) {
      var cell = getCell({
        styleClasses: cellData.styleClasses || ["w-1/".concat(cellsOfARow.length)],
        title: cellData.text
      }, cellData);
      return _objectSpread(_objectSpread({}, cell), {}, {
        includes: cellData.includes || []
      });
    }, cellsOfARow)
  });

  return obj;
} // export function addRowGroupsToObject(prefix, ) {
//   const objectToAdd = getTableRow(
//     `${prefix}-rowGroup-${index}`,
//     {
//       includes: [`cells-of-${prefix}row-${index}`]
//     },
//     onClick
//   );
//   const updatedResult = Object.assign({}, result, objectToAdd);
//   if (rows[index + 1]) {
//     return addRowsToObject(prefix, onClick, index + 1, updatedResult);
//   }
//   return updatedResult;
// }

export function addCellsToObject(cells) {
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onClick = arguments.length > 2 ? arguments[2] : undefined;
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var prefix = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
  var result = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  var objectToAdd = properties.isHeader ? dataCellsOnHeaderRow("cells-of-".concat(prefix), cells, properties, onClick) : dataCellsOnRow("cells-of-".concat(prefix), cells, properties, onClick);
  var updatedResult = Object.assign({}, result, objectToAdd);

  if (cells[index + 1]) {
    return addCellsToObject(cells, properties, onClick, index + 1, level, prefix, updatedResult);
  }

  return updatedResult;
}
export function addRowsToObject() {
  var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var onClick = arguments.length > 2 ? arguments[2] : undefined;
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
  var level = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var prevLevelPrefix = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
  var result = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};
  var updatedResult = result;
  var nextLevelKeys = [];
  var rowGroupKey = "";
  var prefixPart = "".concat(prevLevelPrefix ? prevLevelPrefix + "-" : "").concat(level, "-").concat(index);
  var prefix = properties.isHeader ? "".concat(prefixPart, "-header") : prefixPart;

  if (rows[index] && rows[index].rows) {
    var subRows = addRowsToObject(rows[index].rows, {}, onClick, 0, level + 1, prefix);
    updatedResult = Object.assign({}, result, subRows);
    nextLevelKeys = R.filter(R.and(R.startsWith(prefix), R.compose(R.equals(R.length(prefix) + 4), R.length)), R.keys(subRows));
    rowGroupKey = "".concat(prefix, "-rowGroup");
    var rowGroup = getRowGroup("".concat(prefix, "-rowGroup"), {
      includes: nextLevelKeys
    });
    updatedResult = Object.assign({}, updatedResult, rowGroup);
  }

  var objectToAdd = getTableRow(prefix, {
    includes: [["cells-of-".concat(prefix)], rowGroupKey ? [rowGroupKey] : null].filter(Boolean)
  }, onClick);
  updatedResult = Object.assign({}, updatedResult, objectToAdd);

  if (rows[index] && rows[index].cells) {
    var cellsOfTheCurrentRow = addCellsToObject(rows[index].cells, properties, onClick, 0, 0, prefix);
    updatedResult = Object.assign({}, updatedResult, cellsOfTheCurrentRow);
  }

  if (rows[index + 1]) {
    return addRowsToObject(rows, properties, onClick, index + 1, level, prevLevelPrefix, updatedResult);
  }

  return updatedResult;
}