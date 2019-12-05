import React from "react";
import { storiesOf } from "@storybook/react";
import NumberOfChanges from "./index";
import { withInfo } from "@storybook/addon-info";
import centered from "@storybook/addon-centered/react";

storiesOf("NumberOfChanges", module)
  .addDecorator(centered)
  .addDecorator(withInfo)
  .add("no changes", () => <NumberOfChanges color={'blue'} changes={[]} />)
  .add("9 changes", () => <NumberOfChanges color={'blue'} changes={new Array(9)} />);
