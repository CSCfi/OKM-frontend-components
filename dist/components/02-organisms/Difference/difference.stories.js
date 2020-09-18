import React from "react";
import Difference from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { story1 } from "./storyData/story1";
import { story2 } from "./storyData/story2";
import { story3 } from "./storyData/story3";
import { withState } from "@dump247/storybook-state";
storiesOf("Difference", module).addDecorator(withInfo).add("Modifiable and not required", withState(story1)(function (_ref) {
  var store = _ref.store;

  var onChanges = function onChanges(payload, _ref2) {
    var applyForValue = _ref2.applyForValue;
    store.set({
      applyForValue: applyForValue
    });
  };

  return /*#__PURE__*/React.createElement(Difference, {
    initialValue: story1.initialValue,
    titles: story1.titles,
    onChanges: onChanges
  });
})).add("Modifiable and required", withState(story1)(function (_ref3) {
  var store = _ref3.store;

  var onChanges = function onChanges(payload, _ref4) {
    var applyForValue = _ref4.applyForValue;
    store.set({
      applyForValue: applyForValue
    });
  };

  return /*#__PURE__*/React.createElement(Difference, {
    initialValue: story2.initialValue,
    applyForValue: story2.applyForValue,
    titles: story2.titles,
    isRequired: true,
    onChanges: onChanges
  });
})).add("Read-only", function () {
  return /*#__PURE__*/React.createElement(Difference, {
    initialValue: story3.initialValue,
    applyForValue: story3.applyForValue,
    titles: story2.titles,
    isReadOnly: true
  });
});