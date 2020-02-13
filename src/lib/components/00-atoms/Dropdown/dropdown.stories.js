import React from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "./index";

storiesOf("Dropdown", module).add("default, contained", () => (
  <div>
    <Dropdown text="Text is here" />
    <Dropdown text="Text is here" isTall={true} />
  </div>
));
