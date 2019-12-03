import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: ", ";\n  border-radius: 3px;\n  transition: all 150ms;\n  border: 1px solid ", ";\n\n  ", ":focus + & {\n    box-shadow: 0 0 0 3px pink;\n  }\n\n  ", " {\n    visibility: ", "\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  border: 0;\n  clip: rect(0 0 0 0);\n  clippath: inset(50%);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  white-space: nowrap;\n  width: 1px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  fill: none;\n  stroke: white;\n  stroke-width: 2px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from 'react';
import styled from 'styled-components';
import { COLORS } from 'modules/styles';
import '../../../css/tailwind.css';
var CheckboxContainer = styled.div(_templateObject());
var Icon = styled.svg(_templateObject2()); // Hide checkbox visually but remain accessible to screen readers.
// Source: https://polished.js.org/docs/#hidevisually

var HiddenCheckbox = styled.input.attrs({
  type: 'checkbox'
})(_templateObject3());
var StyledCheckbox = styled.div(_templateObject4(), function (props) {
  return props.checked ? COLORS.OIVA_GREEN : 'white';
}, COLORS.OIVA_GREEN, HiddenCheckbox, Icon, function (props) {
  return props.checked ? 'visible' : 'hidden';
});

var Checkbox = function Checkbox(_ref) {
  var className = _ref.className,
      checked = _ref.checked,
      props = _objectWithoutProperties(_ref, ["className", "checked"]);

  return React.createElement(CheckboxContainer, {
    className: className
  }, React.createElement(HiddenCheckbox, Object.assign({
    checked: checked
  }, props)), React.createElement(StyledCheckbox, {
    checked: checked
  }, React.createElement(Icon, {
    viewBox: "0 0 24 24"
  }, React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))));
};

export default Checkbox;