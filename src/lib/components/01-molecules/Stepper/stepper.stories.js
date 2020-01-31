import React from "react";
import { storiesOf } from "@storybook/react";
import StepperNavigation from "./index";
import { withInfo } from "@storybook/addon-info";

const props = [
  {
    title: "Step 1",
    isFailed: true,
    onChange: () => console.log("Clicked 1")
  },
  {
    title: "Step 2",
    isCompleted: true,
    onChange: () => console.log("Clicked 2")
  },
  { title: "Step 3", onChange: () => console.log("Clicked 3") }
];

storiesOf("StepperNavigation", module)
  .addDecorator(withInfo)
  .add("Stepper example", () => (
    <div>
      <br />
      <StepperNavigation name="example" stepProps={props} />
    </div>
  ));
