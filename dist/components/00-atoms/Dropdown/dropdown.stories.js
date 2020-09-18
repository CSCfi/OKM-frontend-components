import React from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "./index";
import { withState } from "@dump247/storybook-state";
var options = [{
  value: "1",
  label: "Yksi"
}, {
  value: "2",
  label: "Kaksi"
}, {
  value: "3",
  label: "Kolme"
}];
var initialState = {
  value: "2",
  requiredValue: ""
};
storiesOf("Dropdown", module).add("default, contained", withState(initialState)(function (_ref) {
  var store = _ref.store;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Base case, has callback and initial value"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    value: store.state.value,
    onChanges: function onChanges(payload, _ref2) {
      var selectedOption = _ref2.selectedOption;
      return store.set({
        value: selectedOption.value
      });
    },
    emptyMessage: "Clear"
  }), /*#__PURE__*/React.createElement("p", null, "Value from callback is: ", store.state.value), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Fills container"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    value: store.state.value,
    fullWidth: true,
    emptyMessage: "Clear",
    onChanges: function onChanges(payload, _ref3) {
      var selectedOption = _ref3.selectedOption;
      return store.set({
        value: selectedOption.value
      });
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Doesn't fill container"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    value: store.state.value,
    emptyMessage: "Clear",
    onChanges: function onChanges(payload, _ref4) {
      var selectedOption = _ref4.selectedOption;
      return store.set({
        value: selectedOption.value
      });
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "With label"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    value: store.state.value,
    label: "With label",
    emptyMessage: "Clear",
    onChanges: function onChanges(payload, _ref5) {
      var selectedOption = _ref5.selectedOption;
      return store.set({
        value: selectedOption.value
      });
    }
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Disabled"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    value: store.state.value,
    isDisabled: true,
    emptyMessage: "Clear",
    onChanges: function onChanges(payload, _ref6) {
      var selectedOption = _ref6.selectedOption;
      return store.set({
        value: selectedOption.value
      });
    }
  }), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Required"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    onChanges: function onChanges(payload, _ref7) {
      var selectedOption = _ref7.selectedOption;
      return store.set({
        requiredValue: selectedOption.value
      });
    },
    value: store.state.requiredValue,
    isRequired: true,
    requiredMessage: "field is required",
    showValidationErrors: true,
    error: store.state.requiredValue === "",
    label: "label",
    emptyMessage: "Clear"
  }));
}));