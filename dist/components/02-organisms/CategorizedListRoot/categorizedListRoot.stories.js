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
import { multiselectStory } from "./storydata/multiselectStory";
import Stage from "./Stage";
storiesOf("CategorizedListRoot", module).addDecorator(withInfo).add("Long and plain - Checkboxes only", function () {
  return React.createElement(Stage, {
    anchor: "long-and-plain",
    categories: longAndPlainStory.categories,
    changes: longAndPlainStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: true
      }, props));
    }
  });
}).add("Three levels of radio buttons", function () {
  return React.createElement(Stage, {
    anchor: "simple-radio",
    categories: simpleRadioStory.categories,
    changes: simpleRadioStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, props);
    }
  });
}).add("Checkbox under a checkbox", function () {
  return React.createElement(Stage, {
    anchor: "checkbox",
    categories: checkboxStory.categories,
    changes: checkboxStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: true
      }, props));
    }
  });
}).add("Three levels of checkboxes", function () {
  return React.createElement(Stage, {
    anchor: "simple",
    categories: simpleStory.categories,
    changes: simpleStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: false
      }, props));
    }
  });
}).add("Checkboxes, radio buttons and dropdowns", function () {
  return React.createElement(Stage, {
    anchor: "complex",
    categories: complexStory.categories,
    changes: complexStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: false
      }, props));
    }
  });
}).add("Checkboxes, radio buttons and dropdowns (simpler)", function () {
  return React.createElement(Stage, {
    anchor: "radio",
    categories: radioStory.categories,
    changes: radioStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: false
      }, props));
    }
  });
}).add("Simple textbox example", function () {
  return React.createElement(Stage, {
    anchor: "simple-textbox",
    categories: simpleTextBoxStory.categories,
    changes: simpleTextBoxStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: true
      }, props));
    }
  });
}).add("Checkboxes, Dropdowns, textboxes and radio buttons", function () {
  return React.createElement(Stage, {
    anchor: "textbox",
    categories: textBoxStory.categories,
    changes: textBoxStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: false
      }, props));
    }
  });
}).add("Checkboxes, Dropdowns, inputs and radio buttons", function () {
  return React.createElement(Stage, {
    anchor: "input",
    categories: inputStory.categories,
    changes: inputStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: false
      }, props));
    }
  });
}).add("Datepicker example", function () {
  return React.createElement(CategorizedListRoot, {
    anchor: "datepicker",
    categories: datepickerStory.categories,
    changes: datepickerStory.changes,
    onUpdate: function onUpdate() {},
    showCategoryTitles: false
  });
}).add("Attachments example", function () {
  return React.createElement(Stage, {
    anchor: "attachments" // interval={1000}
    ,
    categories: attachmentsStory.categories,
    changes: attachmentsStory.changes,
    render: function render(props) {
      return React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: false
      }, props, {
        placement: "test"
      }));
    }
  });
}).add("Alert example", function () {
  return React.createElement(Stage, {
    anchor: "alert",
    categories: alertStory.categories,
    changes: alertStory.changes,
    render: function render(props) {
      return React.createElement("div", {
        className: "mb-64"
      }, React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: false
      }, props)));
    }
  });
}).add("Multiselect example WIP", function () {
  return React.createElement(Stage, {
    anchor: "multiselect",
    categories: multiselectStory.categories,
    changes: multiselectStory.changes,
    render: function render(props) {
      return React.createElement("div", {
        className: "mb-64"
      }, React.createElement(CategorizedListRoot, Object.assign({
        showCategoryTitles: false
      }, props)));
    }
  });
});