import React from "react";
import CategorizedListRoot from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { checkboxStory } from "./storydata/checkboxStory";
import { threeLevelsOfCheckboxes } from "./storydata/threeLevelsOfCheckboxes";
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
import { oneCheckboxStory } from "./storydata/oneCheckboxStory";
import { withState } from "@dump247/storybook-state";
storiesOf("CategorizedListRoot", module).addDecorator(withInfo).add("One checkbox story", withState(oneCheckboxStory)(function (_ref) {
  var store = _ref.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "one-checkbox",
    categories: oneCheckboxStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref2) {
      var changes = _ref2.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: true
  });
})).add("Long and plain - Checkboxes only", withState(longAndPlainStory)(function (_ref3) {
  var store = _ref3.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "long-and-plain",
    categories: longAndPlainStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref4) {
      var changes = _ref4.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: true
  });
})).add("Three levels of radio buttons", withState(simpleRadioStory)(function (_ref5) {
  var store = _ref5.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "simple-radio",
    categories: simpleRadioStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref6) {
      var changes = _ref6.changes;
      store.set({
        changes: changes
      });
    }
  });
})).add("Checkbox under a checkbox", withState(checkboxStory)(function (_ref7) {
  var store = _ref7.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "checkbox",
    categories: checkboxStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref8) {
      var changes = _ref8.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: true
  });
})).add("Three levels of checkboxes", withState(checkboxStory)(function (_ref9) {
  var store = _ref9.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "simple",
    categories: threeLevelsOfCheckboxes.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref10) {
      var changes = _ref10.changes;
      store.set({
        changes: changes
      });
    }
  });
})).add("Checkboxes, radio buttons and dropdowns", withState(complexStory)(function (_ref11) {
  var store = _ref11.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "complex",
    categories: complexStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref12) {
      var changes = _ref12.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: false
  });
})).add("Checkboxes, radio buttons and dropdowns (simpler)", withState(complexStory)(function (_ref13) {
  var store = _ref13.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "radio",
    categories: radioStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref14) {
      var changes = _ref14.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: false
  });
})).add("Simple textbox example", withState(simpleTextBoxStory)(function (_ref15) {
  var store = _ref15.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "simple-textbox",
    categories: simpleTextBoxStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref16) {
      var changes = _ref16.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: true
  });
})).add("Checkboxes, Dropdowns, textboxes and radio buttons", withState(textBoxStory)(function (_ref17) {
  var store = _ref17.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "textboxStory",
    categories: textBoxStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref18) {
      var changes = _ref18.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: false
  });
})).add("Checkboxes, Dropdowns, inputs and radio buttons", withState(inputStory)(function (_ref19) {
  var store = _ref19.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "input",
    categories: inputStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref20) {
      var changes = _ref20.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: false
  });
})).add("Datepicker example", withState(inputStory)(function (_ref21) {
  var store = _ref21.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "datepicker",
    categories: datepickerStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref22) {
      var changes = _ref22.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: false
  });
})).add("Attachments example", withState(attachmentsStory)(function (_ref23) {
  var store = _ref23.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "attachments",
    categories: attachmentsStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref24) {
      var changes = _ref24.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: false
  });
})).add("Alert example", withState(attachmentsStory)(function (_ref25) {
  var store = _ref25.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "alert",
    categories: alertStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref26) {
      var changes = _ref26.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: false
  });
})).add("Multiselect example", withState(multiselectStory)(function (_ref27) {
  var store = _ref27.store;
  return /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "multiselect",
    categories: multiselectStory.categories,
    changes: store.state.changes,
    onUpdate: function onUpdate(_ref28) {
      var changes = _ref28.changes;
      store.set({
        changes: changes
      });
    },
    showCategoryTitles: false
  });
}));