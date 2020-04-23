import React from "react";
import { fireEvent, render } from "react-testing-library";
import CheckboxWithLabel from "./index";
it("renders the correct label", function () {
  var labelText = "Label text";
  var div = document.createElement("div");

  var _render = render( /*#__PURE__*/React.createElement(CheckboxWithLabel, {
    name: "test-checkbox",
    onChanges: jest.fn()
  }, labelText), div),
      getByLabelText = _render.getByLabelText;

  expect(getByLabelText(labelText)).toBeInTheDocument();
});
it("renders input as checked", function () {
  var labelText = "Label text";
  var div = document.createElement("div");

  var _render2 = render( /*#__PURE__*/React.createElement(CheckboxWithLabel, {
    name: "test-checkbox",
    isChecked: true,
    onChanges: jest.fn()
  }, labelText), div),
      container = _render2.container;

  expect(container.querySelector('input[type="checkbox"]').checked).toBe(true);
});
it("handles the click", function () {
  var _render3 = render( /*#__PURE__*/React.createElement(CheckboxWithLabel, {
    name: "test-checkbox",
    isChecked: false,
    onChanges: jest.fn()
  }, "Label text")),
      container = _render3.container;

  fireEvent.click(container.querySelector("label"));
  expect(container.querySelector('input[type="checkbox"]').checked).toBe(true);
});
it("checks if the callback method is called on click", function () {
  var f = jest.fn();

  var _render4 = render( /*#__PURE__*/React.createElement(CheckboxWithLabel, {
    name: "test-checkbox",
    isChecked: false,
    onChanges: f
  }, "Label text")),
      container = _render4.container;

  fireEvent.click(container.querySelector("label"));
  expect(f).toHaveBeenCalled();
});