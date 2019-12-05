import React from "react";
import Datepicker from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
storiesOf("Datepicker", module).addDecorator(withInfo).add("Simple example", function () {
  var onChanges = function onChanges(payload, _ref) {
    var value = _ref.value;
    console.info(payload, value);
  };

  var today = new Date(Date.now());
  var yesterday = new Date(Date.now() - 86400000);
  return React.createElement("div", null, React.createElement("p", null, "Normal"), React.createElement(Datepicker, {
    value: today,
    payload: {
      value: today
    },
    onChanges: onChanges
  }), React.createElement("p", null, "Error + clearable"), React.createElement(Datepicker, {
    value: yesterday,
    payload: {
      value: yesterday
    },
    onChanges: onChanges,
    error: true,
    clearable: true,
    showTodayButton: false
  }), React.createElement("p", null, "Wide"), React.createElement(Datepicker, {
    value: today,
    onChanges: onChanges,
    fullWidth: true
  }));
});