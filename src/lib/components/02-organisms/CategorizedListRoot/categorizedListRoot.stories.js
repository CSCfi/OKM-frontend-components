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
import { textBoxStory } from "./storydata/textBoxStory";
import { attachmentsStory } from "./storydata/attachmentsStory";
import { inputStory } from "./storydata/inputStory";
import { datepickerStory } from "./storydata/datepickerStory";
import { alertStory } from "./storydata/alertStory";
import Stage from "./Stage";

storiesOf("CategorizedListRoot", module)
  .addDecorator(withInfo)
  .add("Long and plain - Checkboxes only", () => {
    return (
      <Stage
        anchor={"long-and-plain"}
        categories={longAndPlainStory.categories}
        changes={longAndPlainStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}></Stage>
    );
  })
  .add("Three levels of radio buttons", () => {
    return (
      <Stage
        anchor={"simple-radio"}
        categories={simpleRadioStory.categories}
        changes={simpleRadioStory.changes}
        render={props => <CategorizedListRoot {...props} />}></Stage>
    );
  })
  .add("Checkbox under a checkbox", () => {
    return (
      <Stage
        anchor={"checkbox"}
        categories={checkboxStory.categories}
        changes={checkboxStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}></Stage>
    );
  })
  .add("Three levels of checkboxes", () => {
    return (
      <Stage
        anchor={"simple"}
        categories={simpleStory.categories}
        changes={simpleStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage>
    );
  })
  .add("Checkboxes, radio buttons and dropdowns", () => {
    return (
      <Stage
        anchor={"complex"}
        categories={complexStory.categories}
        changes={complexStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage>
    );
  })
  .add("Checkboxes, radio buttons and dropdowns (simpler)", () => {
    return (
      <Stage
        anchor={"radio"}
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
        categories={simpleTextBoxStory.categories}
        changes={simpleTextBoxStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}></Stage>
    );
  })
  .add("Checkboxes, Dropdowns, textboxes and radio buttons", () => {
    return (
      <Stage
        anchor={"textbox"}
        categories={textBoxStory.categories}
        changes={textBoxStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}></Stage>
    );
  })
  .add("Checkboxes, Dropdowns, inputs and radio buttons", () => {
    return (
      <Stage
        anchor={"input"}
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
  .add("Alert example", () => {
    return (
      <Stage
        anchor={"alert"}
        categories={alertStory.categories}
        changes={alertStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />

        )}
        showValidationErrors={() => {}}></Stage>
    );
  });
