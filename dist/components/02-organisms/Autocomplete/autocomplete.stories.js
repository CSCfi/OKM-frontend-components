import React from "react";
import { storiesOf } from "@storybook/react";
import Autocomplete from "./index";
import { withInfo } from "@storybook/addon-info";
import { heights } from "../../../css/autocomplete";
storiesOf("Autocomplete", module).addDecorator(withInfo).add("Example 1", function () {
  return React.createElement("div", null, React.createElement("br", null), React.createElement(Autocomplete, {
    name: "example",
    options: [{
      label: "Aaaaaaaa",
      value: "Aaaaaaaa"
    }, {
      label: "Bbbbbb",
      value: "Bbbbbb"
    }, {
      label: "Ccccccccccc",
      value: "Ccccccccccc"
    }],
    callback: function callback() {}
  }), React.createElement("br", null), React.createElement(Autocomplete, {
    name: "filter example",
    options: [{
      label: "Aaaaaaaa",
      value: "Aaaaaaaa"
    }, {
      label: "Bbbbbb",
      value: "Bbbbbb"
    }, {
      label: "Ccccccccccc",
      value: "Ccccccccccc"
    }],
    isFilter: true,
    callback: function callback() {}
  }));
}).add("Short height", function () {
  return React.createElement("div", null, React.createElement("br", null), React.createElement(Autocomplete, {
    name: "example",
    options: [{
      label: "Aaaaaaaa",
      value: "Aaaaaaaa"
    }, {
      label: "Bbbbbb",
      value: "Bbbbbb"
    }, {
      label: "Ccccccccccc",
      value: "Ccccccccccc"
    }],
    height: heights.SHORT,
    callback: function callback() {}
  }));
});