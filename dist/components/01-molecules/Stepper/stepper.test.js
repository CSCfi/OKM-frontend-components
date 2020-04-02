import React from "react";
import { fireEvent, render } from "react-testing-library";
import StepperNavigation from "./index";
var props = [{
  title: "Step 1",
  isFailed: true,
  onChange: jest.fn()
}, {
  title: "Step 2",
  isCompleted: true,
  onChange: jest.fn()
}, {
  title: "Step 3",
  onChange: jest.fn()
}];
it("renders the correct titles", function () {
  var _render = render(React.createElement(StepperNavigation, {
    name: "example",
    stepProps: props
  })),
      getByLabelText = _render.getByLabelText;

  expect(getByLabelText(props[0].title)).toBeInTheDocument();
  expect(getByLabelText(props[1].title)).toBeInTheDocument();
  expect(getByLabelText(props[2].title)).toBeInTheDocument();
});
it("checks if the callback method is called on click", function () {
  var _render2 = render(React.createElement(StepperNavigation, {
    name: "example",
    stepProps: props
  })),
      container = _render2.container;

  fireEvent.click(container.querySelector(props[0].title));
  expect(props[0].onChange).toHaveBeenCalled();
});