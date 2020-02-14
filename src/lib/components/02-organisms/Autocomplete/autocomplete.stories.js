import React from "react";
import { storiesOf } from "@storybook/react";
import Autocomplete from "./index";
import { withInfo } from "@storybook/addon-info";
import { heights } from "../../../css/autocomplete";

storiesOf("Autocomplete", module)
  .addDecorator(withInfo)
  .add("Example 1", () => (
    <div>
      <br />
      <Autocomplete
        name="example"
        options={[
          { label: "Aaaaaaaa", value: "Aaaaaaaa" },
          { label: "Bbbbbb", value: "Bbbbbb" },
          { label: "Ccccccccccc", value: "Ccccccccccc" }
        ]}
        callback={() => {}}
      />
      <br />
      <Autocomplete
        name="filter example"
        options={[
          { label: "Aaaaaaaa", value: "Aaaaaaaa" },
          { label: "Bbbbbb", value: "Bbbbbb" },
          { label: "Ccccccccccc", value: "Ccccccccccc" }
        ]}
        isFilter
        callback={() => {}}
      />
    </div>
  ))
  .add("Short height", () => (
    <div>
      <br />
      <Autocomplete
        name="example"
        options={[
          { label: "Aaaaaaaa", value: "Aaaaaaaa" },
          { label: "Bbbbbb", value: "Bbbbbb" },
          { label: "Ccccccccccc", value: "Ccccccccccc" }
        ]}
        height={heights.SHORT}
        callback={() => {}}
      />
    </div>
  ));
