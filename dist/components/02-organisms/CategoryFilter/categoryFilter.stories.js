import React from "react";
import CategoryFilter from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { simpleStory } from "./storydata/simpleStory";
import { withState } from "@dump247/storybook-state";
import { toimintaalueStory } from "./storydata/toimintaalueStory";
storiesOf("CategoryFilter", module).addDecorator(withInfo).add("Three levels of checkboxes", withState(simpleStory)(function (_ref) {
  var store = _ref.store;
  return /*#__PURE__*/React.createElement(CategoryFilter, {
    anchor: "simple-story",
    categories: store.state.categories,
    changeObjects: store.state.changes,
    showCategoryTitles: false,
    onChanges: function onChanges(payload) {
      return store.set({
        changes: payload.changes
      });
    }
  });
})).add("Toiminta-alueen käyttötapaus", function () {
  return /*#__PURE__*/React.createElement(CategoryFilter, {
    anchor: "erilliset-maakunnat",
    categories: toimintaalueStory.categories,
    changeObjects: toimintaalueStory.changes,
    showCategoryTitles: false,
    onChanges: function onChanges(payload) {
      console.info(payload);
    }
  });
});