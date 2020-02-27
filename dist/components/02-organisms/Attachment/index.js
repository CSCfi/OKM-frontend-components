import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  background-color: ", ";\n  border: 1px solid\n    ", ";\n  margin: 0.5em 0;\n  font-size: 0.9em;\n  transition: ", ";\n  width: 10em;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  border-radius: 0.2em;\n  div {\n    position: absolute;\n    text-align: center;\n    white-space: nowrap;\n    margin: 0 auto;\n    cursor: pointer;\n    svg {\n      margin: 0.2em 0.2em 0.3em 0;\n    }\n  }\n  &:hover {\n    color: ", ";\n    background-color: ", ";\n    ", "\n    cursor: pointer;\n  }\n\n  input[type=\"file\"] {\n    opacity: 0;\n    cursor: pointer;\n    width: 100%;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { COLORS, TRANSITIONS } from "../Attachments/styles";
var FileInput = styled.div(_templateObject(), function (props) {
  return props.disabled ? COLORS.WHITE : props.color ? props.textColor : COLORS.OIVA_GREEN;
}, function (props) {
  return props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.WHITE;
}, function (props) {
  return props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN;
}, TRANSITIONS.EASE_IN_OUT_QUICK, function (props) {
  return props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.WHITE;
}, function (props) {
  return props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.OIVA_GREEN;
}, function (props) {
  return props.disabled ? "cursor: not-allowed;" : null;
});
var Attachment = React.memo(function (props) {
  return React.createElement(React.Fragment, null, React.createElement(FileInput, null, React.createElement("div", {
    className: "flex flex-row uppercase"
  }, React.createElement(FaPlus, null), " ", props.messages.attachmentAdd, "..."), React.createElement("input", {
    id: props.id,
    name: props.name,
    type: "file",
    defaultValue: "",
    onChange: function onChange(e) {
      props.setAttachment(e);
      e.target.value = null;
      e.stopPropagation();
    }
  })));
});
export default Attachment;