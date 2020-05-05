import React from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import css from "./header.module.css";
import { NavLink } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { AppBar, Toolbar, useMediaQuery, Typography, IconButton, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HorizontalLayout from "./HorizontalLayout";
import VerticalLayout from "./VerticalLayout";
import { equals } from "ramda";
var MEDIA_QUERIES = {
  MOBILE: "only screen and (min-width: 360px) and (max-width: 767px)",
  TABLET: "only screen and (min-width: 768px) and (max-width: 1023px)",
  TABLET_MIN: "only screen and (min-width: 768px)",
  DESKTOP_NORMAL: "only screen and (min-width: 1024px) and (max-width: 1279px)",
  DESKTOP_LARGE: "only screen and (min-width: 1280px)"
};
var useStyles = makeStyles(function (theme) {
  return {
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  };
});
var useStylesForTypography = makeStyles(function () {
  return {
    root: {
      lineHeight: 1
    }
  };
});
var Header = React.memo(function (_ref) {
  var inFinnish = _ref.inFinnish,
      inSwedish = _ref.inSwedish,
      isAuthenticated = _ref.isAuthenticated,
      locale = _ref.locale,
      logIn = _ref.logIn,
      logo = _ref.logo,
      authenticationLink = _ref.authenticationLink,
      onLocaleChange = _ref.onLocaleChange,
      onLoginButtonClick = _ref.onLoginButtonClick,
      onMenuClick = _ref.onMenuClick,
      organisation = _ref.organisation,
      shortDescription = _ref.shortDescription,
      _ref$template = _ref.template,
      template = _ref$template === void 0 ? "A" : _ref$template;
  var classes = useStyles();
  var typographyClasses = useStylesForTypography();
  var items = [/*#__PURE__*/React.createElement(NavLink, {
    to: logo.path,
    exact: true,
    className: "inline-block no-underline text-gray-800"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    classes: typographyClasses
  }, logo.text)), /*#__PURE__*/React.createElement(NavLink, {
    to: shortDescription.path,
    exact: true,
    className: "inline-block no-underline text-gray-800"
  }, shortDescription.text), !!authenticationLink ? /*#__PURE__*/React.createElement(NavLink, {
    to: authenticationLink.path,
    exact: false,
    className: "inline-block no-underline text-gray-800 hover:underline"
  }, /*#__PURE__*/React.createElement("span", null, authenticationLink.text[0], " "), authenticationLink.text[1] && /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, authenticationLink.text[1])) : /*#__PURE__*/React.createElement(React.Fragment, null), organisation.path ? /*#__PURE__*/React.createElement(NavLink, {
    className: "link-to-own-organisation",
    to: organisation.path,
    exact: false
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-gray-600"
  }, organisation.text)) : /*#__PURE__*/React.createElement("span", {
    className: "text-gray-800"
  }, organisation.text)];
  var breakpointTabletMin = useMediaQuery(MEDIA_QUERIES.TABLET_MIN);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !breakpointTabletMin && /*#__PURE__*/React.createElement(React.Fragment, null, template === "C" && /*#__PURE__*/React.createElement(VerticalLayout, {
    items: items
  }, /*#__PURE__*/React.createElement(ToggleButtonGroup, {
    size: "small",
    onChange: onLocaleChange,
    value: locale,
    exclusive: true
  }, /*#__PURE__*/React.createElement(ToggleButton, {
    key: 1,
    value: "fi",
    className: "whitespace-no-wrap",
    classes: {
      label: css["locale-label"],
      selected: css["locale-selected"],
      sizeSmall: css["locale-button"]
    }
  }, inFinnish), /*#__PURE__*/React.createElement(ToggleButton, {
    key: 2,
    value: "sv",
    className: "whitespace-no-wrap",
    classes: {
      label: css["locale-label"],
      selected: css["locale-selected"],
      sizeSmall: css["locale-button"]
    }
  }, inSwedish))), template !== "C" && /*#__PURE__*/React.createElement("div", {
    className: "fixed w-full z-50 ".concat(classes.root, " ")
  }, /*#__PURE__*/React.createElement(AppBar, {
    elevation: 0,
    position: "static"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    className: "bg-green-500"
  }, /*#__PURE__*/React.createElement(IconButton, {
    edge: "start",
    className: classes.menuButton,
    color: "inherit",
    "aria-label": "menu",
    onClick: onMenuClick
  }, /*#__PURE__*/React.createElement(MenuIcon, null)), /*#__PURE__*/React.createElement(NavLink, {
    to: logo.path,
    exact: true,
    className: "inline-block no-underline text-white flex-grow"
  }, /*#__PURE__*/React.createElement(Typography, {
    variant: "h6",
    className: classes.title
  }, logo.text)), !isAuthenticated && !!authenticationLink ? /*#__PURE__*/React.createElement(Button, {
    color: "inherit",
    onClick: onLoginButtonClick
  }, logIn) : /*#__PURE__*/React.createElement(React.Fragment, null))))), breakpointTabletMin && /*#__PURE__*/React.createElement(AppBar, {
    elevation: 0,
    position: "static"
  }, /*#__PURE__*/React.createElement(Toolbar, {
    className: "bg-white px-4 border border-gray-300"
  }, (template === "A" || !template) && /*#__PURE__*/React.createElement(HorizontalLayout, {
    items: items
  }, /*#__PURE__*/React.createElement(ToggleButtonGroup, {
    size: "small",
    onChange: onLocaleChange,
    value: locale,
    exclusive: true
  }, /*#__PURE__*/React.createElement(ToggleButton, {
    key: 1,
    value: "fi",
    className: "whitespace-no-wrap",
    classes: {
      label: css["locale-label"],
      selected: css["locale-selected"],
      sizeSmall: css["locale-button"]
    }
  }, inFinnish), /*#__PURE__*/React.createElement(ToggleButton, {
    key: 2,
    value: "sv",
    className: "whitespace-no-wrap",
    classes: {
      label: css["locale-label"],
      selected: css["locale-selected"],
      sizeSmall: css["locale-button"]
    }
  }, inSwedish))))));
}, function (currentProps, nextProps) {
  var isSameOld = equals("" + currentProps.onLocaleChange, "" + nextProps.onLocaleChange) && equals(currentProps.organisation, nextProps.organisation) && equals(currentProps.locale, nextProps.locale);
  return isSameOld;
});
export default Header;