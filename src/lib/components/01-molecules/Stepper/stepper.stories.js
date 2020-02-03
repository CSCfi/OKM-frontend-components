import React from "react";
import { storiesOf } from "@storybook/react";
import StepperNavigation from "./index";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";

const props = [
  {
    title: "Step 1",
    isFailed: true
  },
  {
    title: "Step 2",
    isCompleted: true
  },
  { title: "Step 3", onChange: () => console.log("Clicked 3") }
];

storiesOf("StepperNavigation", module)
  .addDecorator(withInfo)
  .add(
    "Stepper example",
    withState({ currentStep: 0 })(({ store }) => (
      <div>
        <br />
        <StepperNavigation
          name="example"
          stepProps={props}
          activeStep={store.state.currentStep}
          handleStepChange={step => store.set({ currentStep: step - 1 })}
        />
        <button
          onClick={() => {
            store.set({ currentStep: store.state.currentStep - 1 });
          }}>
          - Prev
        </button>
        |
        <button
          onClick={() => {
            store.set({ currentStep: store.state.currentStep + 1 });
          }}>
          Next +
        </button>
      </div>
    ))
  );
