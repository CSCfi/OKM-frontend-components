import React from "react";
import Input from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";
storiesOf("Input", module).addDecorator(withInfo).add("Simple example", function () {
  var onChanges = function onChanges(payload, _ref) {
    var value = _ref.value;
    console.info(payload, value);
  };

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, "Normal"), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges
  }), /*#__PURE__*/React.createElement("p", null, "Error"), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    error: true
  }), /*#__PURE__*/React.createElement("p", null, "Required and valid or not yet visited/validated"), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isRequired: true,
    isValid: true,
    label: "Required",
    tooltip: {
      text: "This is info text"
    }
  }), /*#__PURE__*/React.createElement("p", null, "Invalid"), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isValid: false,
    label: "Invalid",
    tooltip: {
      text: "This is info text"
    }
  }), /*#__PURE__*/React.createElement("p", null, "Required and invalid"), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isRequired: true,
    isValid: false,
    label: "Required"
  }), /*#__PURE__*/React.createElement("p", null, "Wide"), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    width: "100%"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Readonly",
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    isReadOnly: true,
    value: "readonly"
  }), /*#__PURE__*/React.createElement("p", null, "Number"), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: 123
    },
    onChanges: onChanges,
    type: "number"
  }), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: 123
    },
    onChanges: onChanges,
    type: "number",
    isRequired: true,
    label: "Required"
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Readonly",
    payload: {
      testProp: 123
    },
    type: "number",
    onChanges: onChanges,
    isReadOnly: true,
    isRequired: true,
    value: 123,
    tooltip: {
      text: "This is info text"
    }
  }), /*#__PURE__*/React.createElement(Input, {
    label: "Readonly empty",
    payload: {
      testProp: 123
    },
    type: "number",
    onChanges: onChanges,
    isReadOnly: true,
    isRequired: true,
    tooltip: {
      text: "This is info text"
    }
  }));
}).add("Requirement example", withState({
  values: ["", "", "", "", ""]
})(function (_ref2) {
  var store = _ref2.store;

  var _onChanges = function onChanges(payload, _ref3, index) {
    var value = _ref3.value;
    console.info(payload, value);
    store.set({
      values: store.state.currentStep + 1
    });
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "p-4"
  }, /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: store.state.values[0]
    },
    onChanges: function onChanges(payload, value) {
      return _onChanges(payload, {
        value: value
      }, 0);
    },
    isRequired: true,
    isValid: true,
    label: "Perustele muutos"
  }), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: store.state.values[1]
    },
    onChanges: function onChanges(payload, value) {
      return _onChanges(payload, {
        value: value
      }, 1);
    },
    isRequired: true,
    isValid: true,
    label: "Perustele muutos"
  }), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: store.state.values[2]
    },
    onChanges: function onChanges(payload, value) {
      return _onChanges(payload, {
        value: value
      }, 2);
    },
    isRequired: true,
    isValid: true,
    label: "Perustele muutos"
  }), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: store.state.values[3]
    },
    onChanges: function onChanges(payload, value) {
      return _onChanges(payload, {
        value: value
      }, 3);
    },
    isRequired: true,
    isValid: true,
    label: "Perustele muutos"
  }), /*#__PURE__*/React.createElement(Input, {
    payload: {
      testProp: store.state.values[4]
    },
    onChanges: function onChanges(payload, value) {
      return _onChanges(payload, {
        value: value
      }, 4);
    },
    isRequired: true,
    isValid: true,
    label: "Perustele muutos"
  }));
}));