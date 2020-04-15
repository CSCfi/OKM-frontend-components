import React from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "./index";

storiesOf("Dropdown", module).add("default, contained", () => (
  <div>
    <Dropdown text="Text is here" />
    <br />
    <Dropdown text="Text is here" isTall={true} />
    <br />
    <Dropdown text="Text is here" label="With label" />
  </div>
));
