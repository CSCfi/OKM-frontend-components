import React from "react";
import { storiesOf } from "@storybook/react";
import AlertMessage from "./index";

storiesOf("AlertMessage", module).add("default, contained", () => (
  <div>
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
    <AlertMessage type="warning" title="Title is here" />
    <br />
    <AlertMessage type="error" title="Title is here" />
    <br />
    <AlertMessage type="success" title="Title is here" />
  </div>
));
