import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  background-color: ", ";\n  border: ", "\n    ", ";\n  margin: 0.5em 0;\n  font-size: ", ";\n  transition: ", ";\n  width: 10em;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-around;\n  align-items: center;\n  border-radius: 0.2em;\n  div {\n    position: absolute;\n    text-align: center;\n    white-space: nowrap;\n    margin: 0 auto;\n    cursor: pointer;\n    svg {\n      margin: ", ";\n      cursor: pointer\n    }\n  }\n  &:hover {\n    color: ", ";\n    background-color: ", ";\n    ", "\n    cursor: pointer;\n  }\n  input[type=\"file\"],\n  input[type=file]::-webkit-file-upload-button {\n    opacity: 0;\n    cursor: pointer;\n    width: 100%;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { COLORS, TRANSITIONS } from "../Attachments/styles";
var FileInput = styled.div(_templateObject(), function (props) {
  return props.disabled ? COLORS.WHITE : props.color ? props.textColor : COLORS.OIVA_GREEN;
}, function (props) {
  return props.styles.backgroundColor ? props.styles.backgroundColor : props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.WHITE;
}, function (props) {
  return props.styles.border ? props.styles.border : '1px solid';
}, function (props) {
  return props.disabled ? COLORS.LIGHT_GRAY : props.bgColor ? props.bgColor : COLORS.OIVA_GREEN;
}, function (props) {
  return props.styles.fontSize ? props.styles.fontSize : '0.9em';
}, TRANSITIONS.EASE_IN_OUT_QUICK, function (props) {
  return props.styles.svgMargin ? props.styles.svgMargin : '0.2em 0.2em 0.3em 0';
}, function (props) {
  return props.styles.disableHover ? '' : props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.WHITE;
}, function (props) {
  return props.styles.disableHover ? '' : props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.OIVA_GREEN;
}, function (props) {
  return props.disabled ? "cursor: not-allowed;" : null;
});
var Attachment = React.memo(function (props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FileInput, {
    styles: props.styles
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row"
  }, props.styles.circleIcon ? /*#__PURE__*/React.createElement(MdAddCircleOutline, {
    size: props.styles.iconSize ? props.styles.iconSize : 14
  }) : /*#__PURE__*/React.createElement(FaPlus, {
    size: props.styles.iconSize ? props.styles.iconSize : 14
  }), /*#__PURE__*/React.createElement("span", {
    className: props.styles.normalCase ? "justify-center" : "uppercase justify-center"
  }, "\xA0", props.messages.attachmentAdd)), /*#__PURE__*/React.createElement("input", {
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
Attachment.defaultProps = {
  styles: {}
};
export default Attachment;