import React from "react";
import Datepicker from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

storiesOf("Datepicker", module)
  .addDecorator(withInfo)
  .add("Simple example", () => {
    const onChanges = (payload, { value }) => {
      console.info(payload, value);
    };
    const today = new Date(Date.now());
    const yesterday = new Date(Date.now() - 86400000);
    const messages = {
      ok: "ok",
      cancel: "cancel",
      clear: "clear",
      today: "today",
      datemax: "datemax",
      datemin: "datemin",
      dateinvalid: "dateinvalid"
    };

    return (
      <div>
        <p>Normal</p>
        <Datepicker
          value={today}
          payload={{ value: today }}
          onChanges={onChanges}
          messages={messages}
          locale={"fi"}
        />
        <p>Error + clearable</p>
        <Datepicker
          label="Datepicker"
          value={yesterday}
          payload={{ value: yesterday }}
          onChanges={onChanges}
          error={true}
          clearable={true}
          showTodayButton={false}
          messages={messages}
          locale={"fi"}
        />
        <p>Read only</p>
        <Datepicker
          label="Datepicker"
          value={yesterday}
          payload={{ value: yesterday }}
          showTodayButton={false}
          messages={messages}
          locale={"fi"}
          isReadonly
        />
        <p>Required</p>
        <Datepicker
          label="Datepicker"
          showTodayButton={false}
          messages={messages}
          onChanges={onChanges}
          locale={"fi"}
          isRequired
        />
        <Datepicker
          label="requiredMessage"
          showTodayButton={false}
          messages={messages}
          onChanges={onChanges}
          locale={"fi"}
          isRequired
          requiredMessage="Pakollinen"
        />
        <p>Wide given</p>
        <Datepicker
          label="Datepicker"
          value={today}
          onChanges={onChanges}
          messages={messages}
          locale={"fi"}
          width="30rem"
        />
      </div>
    );
  });
