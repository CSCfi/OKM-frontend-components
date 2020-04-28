import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import multidimensionalTable from "./storydata/multidimensionalTable";
import simpleTable from "./storydata/simpleTable";
import Table from "./index";
import SearchFilter from "../SearchFilter/index";
import Dropdown from "../../00-atoms/Dropdown/index";
import Pill from "../../00-atoms/Chip/index";
import conditionalMenuInTableCell from "./storydata/conditionalMenuInTableCell";
/**
 * Tables are created using descriptive structures. One per table.
 * Example structures are defined under storydata folder. A table
 * can contain 0 - n sub tables, sub tables can contain sub tables
 * and so on. The most common use case is propably a one dimension
 * table.
 */

storiesOf("Table", module).addDecorator(withInfo).add("Multidimensional table", function () {
  return /*#__PURE__*/React.createElement(Table, {
    structure: multidimensionalTable
  });
}).add("Simple table", function () {
  return /*#__PURE__*/React.createElement(Table, {
    structure: simpleTable
  });
}).add("Conditional menu in table cell", function () {
  return /*#__PURE__*/React.createElement(Table, {
    structure: conditionalMenuInTableCell
  });
}).add("Table with filters", function () {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col lg:flex-row mb-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:mr-4 h-13 w-full lg:w-1/4"
  }, /*#__PURE__*/React.createElement(SearchFilter, {
    callback: function callback() {}
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 lg:mt-0 lg:mr-4 h-13"
  }, /*#__PURE__*/React.createElement(Dropdown, {
    isTall: true,
    className: "w-20",
    options: [{
      label: "Aaaaaaaa",
      value: "Aaaaaaaa"
    }, {
      label: "Bbbbbb",
      value: "Bbbbbb"
    }, {
      label: "Ccccccccccc",
      value: "Ccccccccccc"
    }]
  })), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 lg:ml-4 lg:mx-auto"
  }, /*#__PURE__*/React.createElement(Pill, {
    label: "Something",
    onDelete: function onDelete() {}
  }))), /*#__PURE__*/React.createElement(Table, {
    structure: conditionalMenuInTableCell
  }));
});