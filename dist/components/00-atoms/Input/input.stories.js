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

  return React.createElement("div", null, React.createElement("p", null, "Normal"), React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges
  }), React.createElement("p", null, "Error"), React.createElement(Input, {
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    error: true
  }), React.createElement("p", null, "Required and valid or not yet visited/validated"), React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isRequired: true,
    isValid: true,
    label: "Required"
  }), React.createElement("p", null, "Invalid"), React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isValid: false,
    label: "Invalid"
  }), React.createElement("p", null, "Required and invalid"), React.createElement(Input, {
    payload: {
      testProp: 1
    },
    onChanges: onChanges,
    isRequired: true,
    isValid: false,
    label: "Required"
  }), React.createElement("p", null, "Wide"), React.createElement(Input, {
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    width: "100%"
  }), React.createElement(Input, {
    label: "Readonly",
    payload: {
      testProp: 2
    },
    onChanges: onChanges,
    isReadOnly: true,
    value: "readonly"
  }), React.createElement("p", null, "Number"), React.createElement(Input, {
    payload: {
      testProp: 123
    },
    onChanges: onChanges,
    type: "number"
  }), React.createElement(Input, {
    payload: {
      testProp: 123
    },
    onChanges: onChanges,
    type: "number",
    isRequired: true,
    label: "Required"
  }), React.createElement(Input, {
    label: "Readonly",
    payload: {
      testProp: 123
    },
    type: "number",
    onChanges: onChanges,
    isReadOnly: true,
    value: 123
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

  return React.createElement("div", {
    className: "p-4"
  }, React.createElement(Input, {
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
  }), React.createElement(Input, {
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
  }), React.createElement(Input, {
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
  }), React.createElement(Input, {
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
  }), React.createElement(Input, {
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