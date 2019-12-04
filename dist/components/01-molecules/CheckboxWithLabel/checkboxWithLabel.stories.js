import React from "react";
import { storiesOf } from "@storybook/react";
import CheckboxWithLabel from "./index";
import { withInfo } from "@storybook/addon-info";
import { isInLupa, isAdded, isRemoved } from "../../../css/label";
storiesOf("CheckboxWithLabel", module).addDecorator(withInfo).add("is unchecked", function () {
  return React.createElement(CheckboxWithLabel, {
    name: "example",
    isChecked: false,
    onChanges: function onChanges() {
      console.info("Clicked!");
    }
  }, "Is unchecked");
}).add("is checked", function () {
  return React.createElement(CheckboxWithLabel, {
    name: "example",
    isChecked: true,
    onChanges: function onChanges() {
      console.info("Clicked!");
    }
  }, "Is checked");
}).add("unchecked, in lupa", function () {
  return React.createElement(CheckboxWithLabel, {
    name: "example",
    onChanges: function onChanges() {
      console.info("Clicked!");
    },
    labelStyles: Object.assign({}, isInLupa)
  }, "Is unchecked and in LUPA");
}).add("Is checked and in LUPA", function () {
  return React.createElement(CheckboxWithLabel, {
    name: "example",
    isChecked: true,
    onChanges: function onChanges() {
      console.info("Clicked!");
    },
    labelStyles: Object.assign({}, isInLupa)
  }, "Is checked and in LUPA");
}).add("is unchecked and removed", function () {
  return React.createElement(CheckboxWithLabel, {
    name: "example",
    onChanges: function onChanges() {
      console.info("Clicked!");
    },
    labelStyles: Object.assign({}, isRemoved)
  }, "Is unchecked and removed");
}).add("is checked and added", function () {
  return React.createElement(CheckboxWithLabel, {
    name: "example",
    isChecked: true,
    onChanges: function onChanges() {
      console.info("Clicked!");
    },
    labelStyles: Object.assign({}, isAdded)
  }, "Is checked and added");
}).add("is unchecked, removed and in LUPA", function () {
  return React.createElement(CheckboxWithLabel, {
    name: "example",
    onChanges: function onChanges() {
      console.info("Clicked!");
    },
    labelStyles: Object.assign({}, isRemoved, isInLupa)
  }, "Is unchecked, removed and in LUPA");
}).add("is checked, added and in LUPA", function () {
  return React.createElement(CheckboxWithLabel, {
    name: "example",
    isChecked: true,
    onChanges: function onChanges() {
      console.info("Clicked!");
    },
    labelStyles: Object.assign({}, isAdded, isInLupa)
  }, "Is checked, added and in LUPA");
});