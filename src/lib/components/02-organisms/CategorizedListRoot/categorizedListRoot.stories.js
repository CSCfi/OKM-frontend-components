import React from "react";
import CategorizedListRoot from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { checkboxStory } from "./storydata/checkboxStory";
import { simpleStory } from "./storydata/simpleStory";
import { simpleRadioStory } from "./storydata/simpleRadioStory";
import { complexStory } from "./storydata/complexStory";
import { radioStory } from "./storydata/radioStory";
import { longAndPlainStory } from "./storydata/longAndPlainStory";
import { simpleTextBoxStory } from "./storydata/simpleTextBoxStory";
import { subformStory } from "./storydata/subformStory";
import { textBoxStory } from "./storydata/textBoxStory";
import { attachmentsStory } from "./storydata/attachmentsStory";
import { inputStory } from "./storydata/inputStory";
import { datepickerStory } from "./storydata/datepickerStory";
import { alertStory } from "./storydata/alertStory";
import Stage from "./Stage";
import Stage2 from "./Stage2";

storiesOf("CategorizedListRoot", module)
  .addDecorator(withInfo)
  .add("Long and plain example", () => {
    return (
      <Stage2
        anchor={"long-and-plain"}
        categories={longAndPlainStory.categories}
        changes={longAndPlainStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}></Stage2>
    );
  })
  .add("Simple radio example", () => {
    return (
      <Stage2
        anchor={"simple-radio"}
        categories={simpleRadioStory.categories}
        changes={simpleRadioStory.changes}
        render={props => <CategorizedListRoot {...props} />}></Stage2>
    );
  })
  .add("One checkbox example", () => {
    return (
      <Stage2
        anchor={"checkbox"}
        categories={checkboxStory.categories}
        changes={checkboxStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}></Stage2>
    );
  })
  .add("Simple example", () => {
    return (
      <Stage2
        anchor={"simple"}
        categories={simpleStory.categories}
        changes={simpleStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage2>
    );
  })
  .add("Complex example", () => {
    return (
      <Stage2
        anchor={"complex"}
        categories={complexStory.categories}
        changes={complexStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage2>
    );
  })
  .add("Radio example", () => {
    return (
      <Stage
        anchor={"radio"}
        // interval={1000}
        loopChanges={[
          { anchor: "C.A.A", properties: { isChecked: true } },
          { anchor: "B.A", properties: { isChecked: true } },
          { anchor: "A.A.A", properties: { isChecked: true } },
          { anchor: "A.C.A", properties: { isChecked: true } },
          { anchor: "A.B.A", properties: { isChecked: true } }
        ]}
        categories={radioStory.categories}
        changes={radioStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage>
    );
  })
  .add("Simple textbox example", () => {
    return (
      <Stage
        anchor={"simple-textbox"}
        // interval={1000}
        loopChanges={[
          { anchor: "A.A", properties: { isChecked: true } },
          { anchor: "A.A", properties: { isChecked: false } }
        ]}
        categories={simpleTextBoxStory.categories}
        changes={simpleTextBoxStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}></Stage>
    );
  })
  .add("Textbox example", () => {
    return (
      <Stage
        anchor={"textbox"}
        // interval={1000}
        loopChanges={[
          { anchor: "A.A", properties: { isChecked: true } },
          { anchor: "C.A", properties: { isChecked: true } },
          { anchor: "B.A", properties: { isChecked: false } },
          { anchor: "A.A", properties: { isChecked: false } },
          { anchor: "A.B.A.A", properties: { isChecked: true } },
          { anchor: "B.A", properties: { isChecked: true } },
          { anchor: "C.A", properties: { isChecked: false } },
          { anchor: "A.A", properties: { isChecked: false } }
        ]}
        categories={textBoxStory.categories}
        changes={textBoxStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage>
    );
  })
  .add("Input example", () => {
    return (
      <Stage
        anchor={"input"}
        // interval={1000}
        loopChanges={[
          { anchor: "A.A", properties: { isChecked: true } },
          { anchor: "C.A", properties: { isChecked: true } },
          { anchor: "B.A", properties: { isChecked: false } },
          { anchor: "A.A", properties: { isChecked: false } },
          { anchor: "A.B.A.A", properties: { isChecked: true } },
          { anchor: "B.A", properties: { isChecked: true } },
          { anchor: "C.A", properties: { isChecked: false } },
          { anchor: "A.A", properties: { isChecked: false } }
        ]}
        categories={inputStory.categories}
        changes={inputStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage>
    );
  })
  .add("Datepicker example", () => {
    return (
      <CategorizedListRoot
        anchor="datepicker"
        categories={datepickerStory.categories}
        changes={datepickerStory.changes}
        onUpdate={() => {}}
        showCategoryTitles={false}
      />
    );
  })
  .add("Attachments example", () => {
    return (
      <Stage
        anchor={"attachments"}
        // interval={1000}
        categories={attachmentsStory.categories}
        changes={attachmentsStory.changes}
        render={props => (
          <CategorizedListRoot
            showCategoryTitles={false}
            {...props}
            placement="test"
          />
        )}></Stage>
    );
  })
  .add("Dynamic subform example", () => {
    return (
      <Stage
        anchor={"dynamicSubforms"}
        // interval={1000}
        loopChanges={
          [
            // { anchor: "A.A", properties: { isChecked: true } },
            // { anchor: "C.A", properties: { isChecked: true } },
            // { anchor: "B.A", properties: { isChecked: false } },
            // { anchor: "A.A", properties: { isChecked: false } },
            // { anchor: "A.B.A.A", properties: { isChecked: true } },
            // { anchor: "B.A", properties: { isChecked: true } },
            // { anchor: "C.A", properties: { isChecked: false } },
            // { anchor: "A.A", properties: { isChecked: false } }
          ]
        }
        categories={subformStory.categories}
        changes={subformStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage>
    );
  })
  .add("Alert example", () => {
    return (
      <Stage
        anchor={"alert"}
        categories={alertStory.categories}
        changes={alertStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage>
    );
  });
