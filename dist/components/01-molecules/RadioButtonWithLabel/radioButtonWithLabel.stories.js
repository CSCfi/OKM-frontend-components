import React from "react";
import { storiesOf } from "@storybook/react";
import RadioButtonWithLabel from "./index";
import { isInLupa, isAdded, isRemoved } from "../../../css/label";
storiesOf("RadioButtonWithLabel", module).add("is checked", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "checked-with-label",
    isChecked: true
  }, "Label text");
}).add("is unchecked", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "example",
    isChecked: false
  }, "Label text");
}).add("is checked and in LUPA", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "example",
    labelStyles: Object.assign({}, isInLupa),
    isChecked: true
  }, "Label text");
}).add("is unchecked and in LUPA", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "example",
    labelStyles: Object.assign({}, isInLupa),
    isChecked: false
  }, "Label text");
}).add("is unchecked and removed", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "example",
    labelStyles: Object.assign({}, isRemoved),
    isChecked: false
  }, "Label text");
}).add("is checked and added", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "example",
    labelStyles: Object.assign({}, isAdded),
    isChecked: true
  }, "Label text");
}).add("is unchecked, removed and in LUPA", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "example",
    labelStyles: Object.assign({}, isRemoved, isInLupa),
    isChecked: false
  }, "Label text");
}).add("is checked, added and in LUPA", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "example",
    labelStyles: Object.assign({}, isAdded, isInLupa),
    isChecked: true
  }, "Label text");
}).add("is checked, added and in LUPA and read-only", function () {
  return React.createElement(RadioButtonWithLabel, {
    name: "example",
    labelStyles: Object.assign({}, isAdded, isInLupa),
    isChecked: true,
    isReadOnly: true
  }, "Label text");
});