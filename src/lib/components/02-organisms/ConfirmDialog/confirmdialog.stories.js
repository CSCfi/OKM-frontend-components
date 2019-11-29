import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import ConfirmDialog from "./index";

storiesOf("Confirm Dialog", module)
  .addDecorator(withInfo)
  .add("Example 1",
    () =>
      <ConfirmDialog
        content={"Haluatko poistua?"}
        title={"Poistetaanko?"}
        isConfirmDialogVisible={true}
        handleCancel={() => console.log('cancel')}
        handleOk={() => console.log('ok')}
        yesMessage={"Kyllä"}
        noMessage={"Ei"}
      />);
