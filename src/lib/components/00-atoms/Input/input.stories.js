import React from "react";
import Input from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

storiesOf("Input", module)
  .addDecorator(withInfo)
  .add("Simple example", () => {
    const onChanges = (payload, { value }) => {
      console.info(payload, value);
    };
    return (
      <div>
        <p>Normal</p>
        <Input payload={{ testProp: 1 }} onChanges={onChanges} />
        <p>Error</p>
        <Input payload={{ testProp: 2 }} onChanges={onChanges} error={true} />
        <p>Required and valid or not yet visited/validated</p>
        <Input
          payload={{ testProp: 1 }}
          onChanges={onChanges}
          isRequired
          isValid={true}
          label="Required"
        />
        <p>Required and invalid</p>
        <Input
          payload={{ testProp: 1 }}
          onChanges={onChanges}
          isRequired
          isValid={false}
          label="Required"
        />
        <p>Wide</p>
        <Input payload={{ testProp: 2 }} onChanges={onChanges} width={"100%"} />
        <Input
          label="Readonly"
          payload={{ testProp: 2 }}
          onChanges={onChanges}
          isReadOnly
          value="readonly"
        />
        <p>Number</p>
        <Input
          payload={{ testProp: 123 }}
          onChanges={onChanges}
          type={"number"}
        />
        <Input
          payload={{ testProp: 123 }}
          onChanges={onChanges}
          type={"number"}
          isRequired
          label="Required"
        />
        <Input
          label="Readonly"
          payload={{ testProp: 123 }}
          type={"number"}
          onChanges={onChanges}
          isReadOnly
          value={123}
        />
      </div>
    );
  });
