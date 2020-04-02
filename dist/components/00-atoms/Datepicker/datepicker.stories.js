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
  var messages = {
    ok: "ok",
    cancel: "cancel",
    clear: "clear",
    today: "today",
    datemax: "datemax",
    datemin: "datemin",
    dateinvalid: "dateinvalid"
  };
  return React.createElement("div", null, React.createElement("p", null, "Normal"), React.createElement(Datepicker, {
    value: today,
    payload: {
      value: today
    },
    onChanges: onChanges,
    messages: messages,
    locale: "fi"
  }), React.createElement("p", null, "Error + clearable"), React.createElement(Datepicker, {
    label: "Datepicker",
    value: yesterday,
    payload: {
      value: yesterday
    },
    onChanges: onChanges,
    error: true,
    clearable: true,
    showTodayButton: false,
    messages: messages,
    locale: "fi"
  }), React.createElement("p", null, "Read only"), React.createElement(Datepicker, {
    label: "Datepicker",
    value: yesterday,
    payload: {
      value: yesterday
    },
    showTodayButton: false,
    messages: messages,
    locale: "fi",
    isReadonly: true
  }), React.createElement("p", null, "Required"), React.createElement(Datepicker, {
    label: "Datepicker",
    showTodayButton: false,
    messages: messages,
    onChanges: onChanges,
    locale: "fi",
    isRequired: true
  }), React.createElement(Datepicker, {
    label: "requiredMessage",
    showTodayButton: false,
    messages: messages,
    onChanges: onChanges,
    locale: "fi",
    isRequired: true,
    requiredMessage: "Pakollinen"
  }), React.createElement("p", null, "Wide"), React.createElement(Datepicker, {
    label: "Datepicker",
    value: today,
    onChanges: onChanges,
    messages: messages,
    locale: "fi",
    fullWidth: true
  }));
});