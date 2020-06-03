import React from "react";
import Datepicker from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";
var initialState = {
  value: new Date(Date.now()),
  payload: {}
};
storiesOf("Datepicker", module).addDecorator(withInfo).add("Simple example", withState(initialState)(function (_ref) {
  var store = _ref.store;

  var onChanges = function onChanges(payload, _ref2) {
    var value = _ref2.value;
    store.set({
      value: value,
      payload: payload
    });
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Normal"), /*#__PURE__*/React.createElement(Datepicker, {
    value: store.state.value,
    payload: store.state.payload,
    onChanges: onChanges,
    messages: messages,
    locale: "fi"
  }), /*#__PURE__*/React.createElement("p", null, "Error + clearable"), /*#__PURE__*/React.createElement(Datepicker, {
    label: "Datepicker",
    value: store.state.value,
    payload: store.state.payload,
    onChanges: onChanges,
    error: true,
    clearable: true,
    showTodayButton: false,
    messages: messages,
    locale: "fi"
  }), /*#__PURE__*/React.createElement("p", null, "Read only"), /*#__PURE__*/React.createElement(Datepicker, {
    label: "Datepicker",
    value: store.state.value,
    payload: store.state.payload,
    showTodayButton: false,
    messages: messages,
    locale: "fi",
    isReadonly: true
  }), /*#__PURE__*/React.createElement("p", null, "Required"), /*#__PURE__*/React.createElement(Datepicker, {
    label: "Datepicker",
    showTodayButton: false,
    messages: messages,
    onChanges: onChanges,
    locale: "fi",
    isRequired: true
  }), /*#__PURE__*/React.createElement(Datepicker, {
    label: "requiredMessage",
    showTodayButton: false,
    messages: messages,
    onChanges: onChanges,
    locale: "fi",
    isRequired: true,
    requiredMessage: "Pakollinen"
  }), /*#__PURE__*/React.createElement("p", null, "Wide given"), /*#__PURE__*/React.createElement(Datepicker, {
    label: "Datepicker",
    value: store.state.value,
    onChanges: onChanges,
    messages: messages,
    locale: "fi",
    width: "30rem"
  }));
}));