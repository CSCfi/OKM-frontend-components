import React from "react";
import Difference from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { story1 } from "./storyData/story1";

storiesOf("Difference", module)
  .addDecorator(withInfo)
  .add("Modifiable and not required", () => {
    function onChanges(result) {
      console.info(result);
    }
    return (
      <Difference
        initialValue={story1.initialValue}
        titles={story1.titles}
        onChanges={onChanges}
      />
    );
  })
  .add("Modifiable and required", () => {
    function onChanges(result) {
      console.info(result);
    }
    return (
      <Difference
        initialValue={0}
        applyForValue={0}
        titles={story1.titles}
        isRequired
        onChanges={onChanges}
      />
    );
  })
  .add("Read-only", () => {
    return (
      <Difference
        initialValue={123}
        applyForValue={4235}
        titles={story1.titles}
        isReadOnly={true}
      />
    );
  });
