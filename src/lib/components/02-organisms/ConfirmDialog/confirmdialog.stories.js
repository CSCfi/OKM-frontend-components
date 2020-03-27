import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import ConfirmDialog from "./index";

storiesOf("Confirm Dialog", module)
  .addDecorator(withInfo)
  .add("Example 1", () => (
    <ConfirmDialog
      content={
        "Tähän kuvaava ohjeteksti varmistamaan, että muutokset on allekirjoitutettu ministerillä. Muutosta ei voi esittelijä kumota."
      }
      title={"Merkitäänkö asia päätetyksi?"}
      isConfirmDialogVisible={true}
      handleCancel={() => console.log("cancel")}
      handleOk={() => console.log("ok")}
      onClose={() => console.log("onClose clicked!")}
      yesMessage={"Merkitse päätetyksi"}
      noMessage={"Peruuta"}
    />
  ));
