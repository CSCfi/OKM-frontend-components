import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: white;\n  text-transform: none;\n  font-family: ", ";\n\n  a:visited {\n    color: white;\n  }\n\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  &.active {\n    color: ", ";\n    background: ", ";\n  }\n\n  &.text-small {\n    font-size: 14px;\n    text-transform: none;\n  }\n\n  &.pull-right {\n    margin-left: auto;\n  }\n  \n  &.has-separator {\n    border-right: 1px solid rgba(255, 255, 255, 0.25);\n  }\n  \n  @media ", " {\n    font-size: 14px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { COLORS, FONT_STACK, MEDIA_QUERIES } from 'modules/styles';
var LinkItem = styled(NavLink)(_templateObject(), FONT_STACK.ARIAL, COLORS.OIVA_MENU_HOVER_COLOR, COLORS.WHITE, COLORS.WHITE, COLORS.OIVA_MENU_SELECTED_COLOR, MEDIA_QUERIES.MOBILE);
export default LinkItem;