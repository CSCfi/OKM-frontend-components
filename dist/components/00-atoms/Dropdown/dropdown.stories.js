import React from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "./index";
import { withState } from "@dump247/storybook-state";
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Dropdown, {
  value: "1",
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Dropdown, {
}, {
  value: "2",
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Dropdown, {
}, {
  value: "3",
  label: "три"
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
    fullWidth: true,
    emptyMessage: "Clear"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Doesn't fill container"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    emptyMessage: "Clear"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "With label"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    label: "With label",
    emptyMessage: "Clear"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Disabled"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    value: 3,
    isDisabled: true,
    emptyMessage: "Clear"
  }), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", null, "Required"), /*#__PURE__*/React.createElement(Dropdown, {
    options: options,
    onChanges: function onChanges(payload, _ref3) {
      var selectedOption = _ref3.selectedOption;
      return store.set({
        requiredValue: selectedOption.value
      });
    },
    value: store.state.requiredValue,
    isRequired: true,
    requiredMessage: "field is required",
    showValidationErrors: true,
    error: store.state.requiredValue === '',
    label: "label",
    emptyMessage: "Clear"
  }));
}));