import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import AlertMessage from "./index";

storiesOf("AlertMessage", module)
  .addDecorator(withInfo)
  .add("default", () => (
    <div className="mt-8">
      <AlertMessage title="Title is here" />
      <br />
      <AlertMessage message="Message is here" />
      <br />
      <AlertMessage
        message="Link message is here"
        handleClick={() => console.log("Link pressed")}
      />
      <br />
      <AlertMessage title="Title" message="Message is here" />
      <br />
      <AlertMessage type="warning" title="Warning is here" />
      <br />
      <AlertMessage type="error" title="Error is here" />
      <br />
      <AlertMessage type="success" title="Success is here" />
    </div>
  ));
