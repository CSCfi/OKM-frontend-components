import React from "react";
import Input from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";
var initialState = {
  value: "Example text"
};
storiesOf("Input", module).addDecorator(withInfo).add("Unrequired", withState(initialState)(function (_ref) {
  var store = _ref.store;

  var onChanges = function onChanges(payload, _ref2) {
    var value = _ref2.value;
    store.set({
      value: value
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    label: "Perustele muutos",
    onChanges: onChanges,
    value: store.state.value
  }));
})).add("Required and invalid", withState(initialState)(function (_ref3) {
  var store = _ref3.store;

  var onChanges = function onChanges(payload, _ref4) {
    var value = _ref4.value;
    store.set({
      value: value
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    isRequired: true,
    isValid: false,
    label: "Perustele muutos",
    onChanges: onChanges,
    value: store.state.value
  }));
})).add("Required and valid with a tooltip", withState(initialState)(function (_ref5) {
  var store = _ref5.store;

  var onChanges = function onChanges(payload, _ref6) {
    var value = _ref6.value;
    store.set({
      value: value
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    isRequired: true,
    isValid: true,
    label: "Perustele muutos",
    onChanges: onChanges,
    tooltip: {
      text: "This is info text"
    },
    value: store.state.value
  }));
})).add("Read only, required and invalid", withState(initialState)(function (_ref7) {
  var store = _ref7.store;

  var onChanges = function onChanges(payload, _ref8) {
    var value = _ref8.value;
    store.set({
      value: value
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    isRequired: true,
    isReadOnly: true,
    isValid: false,
    label: "Perustele muutos",
    onChanges: onChanges,
    value: store.state.value
  }));
})).add("Erroneous", withState(initialState)(function (_ref9) {
  var store = _ref9.store;

  var onChanges = function onChanges(payload, _ref10) {
    var value = _ref10.value;
    store.set({
      value: value
    });
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Input, {
    error: true,
    isRequired: true,
    isValid: false,
    label: "Perustele muutos",
    onChanges: onChanges,
    value: store.state.value
  }));
}));