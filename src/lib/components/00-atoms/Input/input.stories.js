import React from "react";
import Input from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";

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
        <p>Invalid</p>
        <Input
          payload={{ testProp: 1 }}
          onChanges={onChanges}
          isValid={false}
          label="Invalid"
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
  })
  .add(
    "Requirement example",
    withState({ values: ["", "", "", "", ""] })(({ store }) => {
      const onChanges = (payload, { value }, index) => {
        console.info(payload, value);
        store.set({ values: store.state.currentStep + 1 });
      };
      return (
        <div className="p-4">
          <Input
            payload={{ testProp: store.state.values[0] }}
            onChanges={(payload, value) => onChanges(payload, { value }, 0)}
            isRequired
            isValid={true}
            label="Perustele muutos"
          />
          <Input
            payload={{ testProp: store.state.values[1] }}
            onChanges={(payload, value) => onChanges(payload, { value }, 1)}
            isRequired
            isValid={true}
            label="Perustele muutos"
          />
          <Input
            payload={{ testProp: store.state.values[2] }}
            onChanges={(payload, value) => onChanges(payload, { value }, 2)}
            isRequired
            isValid={true}
            label="Perustele muutos"
          />
          <Input
            payload={{ testProp: store.state.values[3] }}
            onChanges={(payload, value) => onChanges(payload, { value }, 3)}
            isRequired
            isValid={true}
            label="Perustele muutos"
          />
          <Input
            payload={{ testProp: store.state.values[4] }}
            onChanges={(payload, value) => onChanges(payload, { value }, 4)}
            isRequired
            isValid={true}
            label="Perustele muutos"
          />
        </div>
      );
    })
  );
