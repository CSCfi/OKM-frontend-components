import React from "react";
import { storiesOf } from "@storybook/react";
import SimpleButton from "./index";

storiesOf("SimpleButton", module).add("Normal", () => (
  <div className="flex flex-col w-56 p-4">
    <SimpleButton text="Text is here" />
  </div>
));
storiesOf("SimpleButton", module).add("Outlined", () => (
  <div className="flex flex-col w-56 p-4">
    <SimpleButton text="Text is here" variant="outlined" />
  </div>
));
storiesOf("SimpleButton", module).add("Text button", () => (
  <div className="flex flex-col w-56 p-4">
    <SimpleButton text="Text is here" color="default" variant="default" />
  </div>
));
