import React from "react";
import Difference from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { story1 } from "./storyData/story1";
storiesOf("Difference", module).addDecorator(withInfo).add("Modifiable and not required", function () {
  function onChanges(result) {
    console.info(result);
  }

  return /*#__PURE__*/React.createElement(Difference, {
    initialValue: story1.initialValue,
    value: story1.value,
    titles: story1.titles,
    onChanges: onChanges
  });
}).add("Modifiable and required", function () {
  function onChanges(result) {
    console.info(result);
  }

  return /*#__PURE__*/React.createElement(Difference, {
    initialValue: 0,
    applyForValue: 0,
    titles: story1.titles,
    isRequired: true,
    onChanges: onChanges
  });
}).add("Read-only", function () {
  return /*#__PURE__*/React.createElement(Difference, {
    initialValue: 123,
    applyForValue: 4235,
    titles: story1.titles,
    isReadOnly: true
  });
});