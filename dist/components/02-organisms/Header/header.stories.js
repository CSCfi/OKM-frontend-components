import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import Header from ".";
import Navigation from "../Navigation";
import SideNavigation from "../SideNavigation";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
storiesOf("Header", module).add("Basic layout", function () {
  return /*#__PURE__*/React.createElement(Router, {
    history: createBrowserHistory()
  }, /*#__PURE__*/React.createElement(Header, {
    inFinnish: "Suomeksi",
    inSwedish: "P\xE5 svenska",
    isLoggedIn: false,
    locale: "fi",
    logIn: "Kirjaudu sis\xE4\xE4n",
    logo: {
      text: "Oiva",
      path: "/"
    },
    authenticationLink: {
      text: ["Kirjaudu ulos", "(oiva-sanni)"],
      path: "example.path.fi"
    },
    onLocaleChange: function onLocaleChange() {
      for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
        props[_key] = arguments[_key];
      }

      console.info(props);
    },
    onLoginButtonClick: function onLoginButtonClick() {
      for (var _len2 = arguments.length, props = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        props[_key2] = arguments[_key2];
      }

      console.info(props);
    },
    onMenuClick: function onMenuClick() {
      for (var _len3 = arguments.length, props = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        props[_key3] = arguments[_key3];
      }

      console.info(props);
    },
    organisation: {
      text: "Jyväskylän koulutuskuntayhtymä",
      path: "/"
    },
    shortDescription: {
      text: "Opetushallinnon ohjaus- ja säätelypalvelu",
      path: "/"
    }
  }));
}).add("Header and Navigation", function () {
  var links = [{
    path: "/esi-ja-perusopetus",
    text: "Esi- ja perusopetus",
    isExact: false
  }, {
    path: "/lukiokoulutus",
    text: "Lukiokoulutus"
  }, {
    path: "/jarjestajat",
    text: "Ammatillinen koulutus"
  }, {
    path: "/vapaa-sivistystyo",
    text: "Vapaa sivistystyö"
  }, {
    path: "/tilastot",
    text: "Tilastot"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Router, {
    history: createBrowserHistory()
  }, /*#__PURE__*/React.createElement(Header, {
    inFinnish: "Suomeksi",
    inSwedish: "P\xE5 svenska",
    isLoggedIn: false,
    locale: "fi",
    logIn: "Kirjaudu sis\xE4\xE4n",
    logo: {
      text: "Oiva",
      path: "/"
    },
    authenticationLink: {
      text: ["Kirjaudu ulos", "(oiva-sanni)"],
      path: "example.path.fi"
    },
    onLocaleChange: function onLocaleChange() {
      for (var _len4 = arguments.length, props = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        props[_key4] = arguments[_key4];
      }

      console.info(props);
    },
    onLoginButtonClick: function onLoginButtonClick() {
      for (var _len5 = arguments.length, props = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        props[_key5] = arguments[_key5];
      }

      console.info(props);
    },
    onMenuClick: function onMenuClick() {
      for (var _len6 = arguments.length, props = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        props[_key6] = arguments[_key6];
      }

      console.info(props);
    },
    organisation: {
      text: "Jyväskylän koulutuskuntayhtymä",
      path: "/"
    },
    shortDescription: {
      text: "Opetushallinnon ohjaus- ja säätelypalvelu",
      path: "/"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block"
  }, /*#__PURE__*/React.createElement(Navigation, {
    links: links
  }))));
}).add("Header and Navigation and SideNavigation", function () {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isSideMenuVisible = _useState2[0],
      setSideMenuVisibility = _useState2[1];

  var links = [{
    path: "/esi-ja-perusopetus",
    text: "Esi- ja perusopetus",
    isExact: false
  }, {
    path: "/lukiokoulutus",
    text: "Lukiokoulutus"
  }, {
    path: "/jarjestajat",
    text: "Ammatillinen koulutus"
  }, {
    path: "/vapaa-sivistystyo",
    text: "Vapaa sivistystyö"
  }, {
    path: "/tilastot",
    text: "Tilastot"
  }];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Router, {
    history: createBrowserHistory()
  }, /*#__PURE__*/React.createElement(Header, {
    inFinnish: "Suomeksi",
    inSwedish: "P\xE5 svenska",
    isLoggedIn: false,
    locale: "fi",
    logIn: "Kirjaudu sis\xE4\xE4n",
    logo: {
      text: "Oiva",
      path: "/"
    },
    authenticationLink: {
      text: ["Kirjaudu ulos", "(oiva-sanni)"],
      path: "example.path.fi"
    },
    onLocaleChange: function onLocaleChange() {
      for (var _len7 = arguments.length, props = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        props[_key7] = arguments[_key7];
      }

      console.info(props);
    },
    onLoginButtonClick: function onLoginButtonClick() {
      for (var _len8 = arguments.length, props = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        props[_key8] = arguments[_key8];
      }

      console.info(props);
    },
    onMenuClick: function onMenuClick() {
      return setSideMenuVisibility(function (isVisible) {
        return !isVisible;
      });
    },
    organisation: {
      text: "Jyväskylän koulutuskuntayhtymä",
      path: "/"
    },
    shortDescription: {
      text: "Opetushallinnon ohjaus- ja säätelypalvelu",
      path: "/"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block"
  }, /*#__PURE__*/React.createElement(Navigation, {
    links: links
  })), /*#__PURE__*/React.createElement("div", {
    className: "block md:hidden"
  }, /*#__PURE__*/React.createElement(SideNavigation, {
    isVisible: isSideMenuVisible,
    handleDrawerToggle: function handleDrawerToggle(isVisible) {
      setSideMenuVisibility(isVisible);
    }
  }, /*#__PURE__*/React.createElement(Header, {
    inFinnish: "Suomeksi",
    inSwedish: "P\xE5 svenska",
    isLoggedIn: false,
    locale: "fi",
    logIn: "Kirjaudu sis\xE4\xE4n",
    logo: {
      text: "Oiva",
      path: "/"
    },
    authenticationLink: {
      text: ["Kirjaudu ulos", "(oiva-sanni)"],
      path: "example.path.fi"
    },
    onLocaleChange: function onLocaleChange() {
      for (var _len9 = arguments.length, props = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
        props[_key9] = arguments[_key9];
      }

      console.info(props);
    },
    onLoginButtonClick: function onLoginButtonClick() {
      for (var _len10 = arguments.length, props = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
        props[_key10] = arguments[_key10];
      }

      console.info(props);
    },
    onMenuClick: function onMenuClick() {
      for (var _len11 = arguments.length, props = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        props[_key11] = arguments[_key11];
      }

      console.info(props);
    },
    organisation: {
      text: "Jyväskylän koulutuskuntayhtymä",
      path: "/"
    },
    shortDescription: {
      text: "Opetushallinnon ohjaus- ja säätelypalvelu",
      path: "/"
    },
    template: "C"
  }), /*#__PURE__*/React.createElement("div", {
    className: "px-4"
  }, /*#__PURE__*/React.createElement(Navigation, {
    direction: "vertical",
    links: links,
    theme: {
      backgroundColor: "white",
      color: "black",
      hoverColor: "gray-100"
    }
  }))))));
}).add("Header without organisation link", function () {
  return /*#__PURE__*/React.createElement(Router, {
    history: createBrowserHistory()
  }, /*#__PURE__*/React.createElement(Header, {
    inFinnish: "Suomeksi",
    inSwedish: "P\xE5 svenska",
    isLoggedIn: false,
    locale: "fi",
    logIn: "Kirjaudu sis\xE4\xE4n",
    logo: {
      text: "Oiva",
      path: "/"
    },
    authenticationLink: {
      text: ["Kirjaudu ulos", "(oiva-sanni)"],
      path: "example.path.fi"
    },
    onLocaleChange: function onLocaleChange() {
      for (var _len12 = arguments.length, props = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        props[_key12] = arguments[_key12];
      }

      console.info(props);
    },
    onLoginButtonClick: function onLoginButtonClick() {
      for (var _len13 = arguments.length, props = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        props[_key13] = arguments[_key13];
      }

      console.info(props);
    },
    onMenuClick: function onMenuClick() {
      for (var _len14 = arguments.length, props = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        props[_key14] = arguments[_key14];
      }

      console.info(props);
    },
    organisation: {
      text: "Jyväskylän koulutuskuntayhtymä"
    },
    shortDescription: {
      text: "Opetushallinnon ohjaus- ja säätelypalvelu",
      path: "/"
    }
  }));
});