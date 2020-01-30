import React from "react";
import { storiesOf } from "@storybook/react";
import StepperNavigation from "./index";
import { withInfo } from "@storybook/addon-info";
import { isInLupa, isAdded, isRemoved } from "../../../css/label";

storiesOf("StepperNavigation", module)
  .addDecorator(withInfo)
  .add("Stepper example", () => (
    <div>
      <br />
      <StepperNavigation
        name="example"
        isChecked={false}
        onChanges={() => {
          console.info("Clicked!");
        }}></StepperNavigation>
    </div>
  ));
