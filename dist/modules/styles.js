import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  height: 110px;\n  width: 300px;\n  background: url(", ");\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  height: 800px;\n  width: 100vw;\n  background: url(", ");\n  background-size: cover;\n  position: absolute;\n  top: -450px;\n  right: 0;\n  opacity: 0.3;\n  z-index: -1;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  font-weight: 100;\n  font-size: 16px;\n  line-height: 22px;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  body {\n    margin: 0;\n    font-family: ", ";\n  } \n    \n  table {\n    border: 1px solid #D5D5D5;\n  }\n  \n  thead {\n    color: ", ";\n    background: ", ";\n  }\n  \n  thead {\n    th {\n    }\n  }\n  \n  tbody {\n    tr {\n      &:nth-child(even) {\n        background: #F9F9F9;\n      }\n    }\n  }\n\n  th {\n    font-weight: normal;\n    padding: 6px 18px;\n  }\n  \n  h1 {\n    font-family: ", ";\n    font-size: 40px;\n  }\n  \n  h4 {\n    margin: 18px 0 10px;\n  }\n  \n  a {\n    color: ", ";\n    text-decoration: none;\n  }\n  \n  @media ", " {\n    h1 {\n      font-size: 26px;\n    }\n  }\n  \n  div, p, span, label, li {\n    &.is-removed {\n      text-decoration: line-through;\n      color: ", ";\n    }\n    \n    &.is-added {\n      color: ", ";\n    }\n    \n    &.is-changed {\n      color: ", ";\n    }\n    \n    &.is-in-lupa {\n      font-weight: bold;\n    }\n  }\n  \n  .control {\n    display: flex;\n    position: relative;\n    padding-left: 30px;\n    margin-bottom: 5px;\n    margin-right: 20px;\n    padding-top: 3px;\n    cursor: pointer;\n    font-size: 16px;\n  }\n  .control input {\n      position: absolute;\n      z-index: -1;\n      opacity: 0;\n  }\n  .control_indicator {\n      position: absolute;\n      top: -2px;\n      left: 0;\n      height: 24px;\n      width: 24px;\n      background: #ffffff;\n      border: 1px solid #909090;\n  }\n  .control-radio .control_indicator {\n      border-radius: 50%;\n  }\n  \n  .control:hover input ~ .control_indicator,\n  .control input:focus ~ .control_indicator {\n      background: #ffffff;\n  }\n  \n  .control input:checked ~ .control_indicator {\n      background: #ffffff;\n  }\n  .control:hover input:not([disabled]):checked ~ .control_indicator,\n  .control input:checked:focus ~ .control_indicator {\n      background: #ffffff;\n  }\n  .control input:disabled ~ .control_indicator {\n      background: #e6e6e6;\n      opacity: 0.6;\n      pointer-events: none;\n  }\n  .control_indicator:after {\n      box-sizing: unset;\n      content: '';\n      position: absolute;\n      display: none;\n  }\n  .control input:checked ~ .control_indicator:after {\n      display: block;\n  }\n  .control-radio .control_indicator:after {\n      left: 4px;\n      top: 4px;\n      height: 16px;\n      width: 16px;\n      border-radius: 50%;\n      background: #5A8A70;\n  }\n  .control-radio input:disabled ~ .control_indicator:after {\n      background: #7b7b7b;\n  }\n  \n  .react-datepicker-popper {\n    .react-datepicker {\n      border-radius: 0;\n      \n      .react-datepicker__day--selected {\n        background-color: ", ";\n      }\n    }\n  }\n  \n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

/**
 * Tässä tiedostossa:
 *
 * 1) Määritetään applikaatiolle globaalit tyylit
 * 2) Määritetään tyylielementtejä (värit jne.) joita käytetään komponenteissa
 * 3) Määritetään styled-components komponentteja, joita voidaan käyttää applikaatiossa
 */
import styled, { createGlobalStyle } from "styled-components";
import background from "../static/images/palikat.png";
import leijona from "../static/images/OKM_FiSve_LM_RGB_logot.png";
import "../static/fonts/OpenSans-Regular.ttf";
import "../static/fonts/OpenSans-SemiBold.ttf";
import "../static/fonts/GothamNarrow-Book.otf";
import "../static/fonts/GothamNarrow-Light.otf"; // Colors

export var COLORS = {
  OIVA_GREEN: "#48bb78",
  OIVA_RED: "#cc3300",
  OIVA_PURPLE: "#9B26B6",
  DARK_GRAY: "#525252",
  BLACK: "#000000",
  WHITE: "#FFFFFF",
  LIGHT_GRAY: "#fafafa",
  BORDER_GRAY: "#e2e8f0",
  BG_GRAY: "#fafafa",
  BG_DARKER_GRAY: "#e3e3e3",
  ACTIVE_BLUE: "#E9F6FA",
  OIVA_OPAQUE_GREEN: "rgba(90,138,112,0.4)",
  OIVA_DARK_GREEN: "#3B604C",
  OIVA_LIGHT_GREEN: "#65A884",
  OIVA_MENU_FONT_COLOR: "#fff",
  OIVA_MENU_BG_COLOR: "#4C7A61",
  OIVA_MENU_HOVER_COLOR: "#3B604C",
  OIVA_MENU_HOVER_2_COLOR: "#99C6C6",
  OIVA_MENU_SELECTED_COLOR: "#3B604C",
  OIVA_MENU_BG_2_COLOR: "#519D9D",
  OIVA_TABLE_BG_COLOR: "#70A489",
  OIVA_TABLE_HOVER_COLOR: "rgba(90,138,112,0.2)",
  OIVA_TABLE_HEADER_HOVER_COLOR: "#98B8A7",
  OIVA_ORANGE: "#E5C317",
  OIVA_ORANGE_TEXT: "#757600",
  OIVA_TEXT: "#333"
};
export var FONT_STACK = {
  GOTHAM_NARROW: "\"Gotham Narrow\", Helvetica, Arial, sans-serif",
  GOTHAM_NARROW_BOLD: "\"Gotham Narrow Bold\", Helvetica, Arial, sans-serif",
  OPEN_SANS_REGULAR: "\"Open Sans\", Helvetica, Arial, sans-serif",
  OPEN_SANS_SEMIBOLD: "\"Open Sans\", Helvetica, Arial, sans-serif",
  PT_SANS_NARROW: "\"PT Sans Narrow\", \"Open Sans\", Helvetica, Arial, sans-serif",
  SOURCE_SANS: "\"Source Sans\", \"Open Sans\", Helvetica, Arial, sans-serif",
  ARIAL: "\"Arial\", \"Open Sans\", Helvetica, sans-serif"
};
export var APP_WIDTH = 1030; // Media query breakpointit

export var MEDIA_QUERIES = {
  MOBILE: "only screen and (min-width: 360px) and (max-width: 767px)",
  TABLET: "only screen and (min-width: 768px) and (max-width: 1023px)",
  TABLET_MIN: "only screen and (min-width: 768px)",
  DESKTOP_NORMAL: "only screen and (min-width: 1024px) and (max-width: 1279px)",
  DESKTOP_LARGE: "only screen and (min-width: 1280px)"
};
export var TRANSITIONS = {
  EASE_IN_OUT_QUICK: "all 0.05s ease-in-out"
}; // Globaalit tyylit

createGlobalStyle(_templateObject(), FONT_STACK.GOTHAM_NARROW, COLORS.WHITE, COLORS.OIVA_TABLE_BG_COLOR, FONT_STACK.PT_SANS_NARROW, COLORS.OIVA_GREEN, MEDIA_QUERIES.MOBILE, COLORS.OIVA_PURPLE, COLORS.OIVA_PURPLE, COLORS.OIVA_PURPLE, COLORS.OIVA_GREEN);
export var P = styled.p(_templateObject2());
export var BackgroundImage = styled.div(_templateObject3(), background);
export var Leijona = styled.div(_templateObject4(), leijona);