import React from "react";

/**
 * TableRow component. Used by the Table component.
 * @param {object} props - Properties object.
 * @param {object} props.children - TableRow content.
 * @param {function} props.onClick - Callback function on row click.
 * @param {object} props.row - Object that contains row related data.
 * @param {number} props.tableLevel - Indicates the deepness of nesting.
 */
var TableRow = function TableRow(_ref) {
  var children = _ref.children,
      onClick = _ref.onClick,
      row = _ref.row,
      _ref$tableLevel = _ref.tableLevel,
      tableLevel = _ref$tableLevel === void 0 ? 0 : _ref$tableLevel;

  function onRowClick() {
    var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "click";

    if (onClick) {
      onClick(action, row, tableLevel);
    }
  }

  return /*#__PURE__*/React.createElement("div", {
    key: "key-".concat(Math.random()),
    role: "row",
    className: "hover:bg-gray-".concat(tableLevel + 1, "00 cursor-pointer flex"),
    onClick: function onClick() {
      onRowClick();
    }
  }, children);
};

export default TableRow;