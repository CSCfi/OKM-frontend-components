import React from "react";
import { storiesOf } from "@storybook/react";
import StepperNavigation from "./index";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";
var props = [{
  title: "Step 1",
  isFailed: true
}, {
  title: "Step 2",
  isCompleted: true
}, {
  title: "Step 3",
  onChange: function onChange() {
    return console.log("Clicked 3");
  }
}];
storiesOf("StepperNavigation", module).addDecorator(withInfo).add("Stepper example", withState({
  currentStep: 0
})(function (_ref) {
  var store = _ref.store;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "1em",
      borderTop: "1px solid red",
      borderBottom: "1px solid red"
    }
  }, /*#__PURE__*/React.createElement(StepperNavigation, {
    name: "example",
    stepProps: props,
    activeStep: store.state.currentStep,
    handleStepChange: function handleStepChange(step) {
      return store.set({
        currentStep: step - 1
      });
    }
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      store.set({
        currentStep: store.state.currentStep - 1
      });
    }
  }, "- Prev"), "|", /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      store.set({
        currentStep: store.state.currentStep + 1
      });
    }
  }, "Next +"));
}));