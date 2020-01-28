import React from "react";
import { storiesOf } from "@storybook/react";
import Navigation from ".";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
storiesOf("Navigation", module).add("Basic layout", function () {
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
  return React.createElement(Router, {
    history: createBrowserHistory()
  }, React.createElement(Navigation, {
    links: links
  }));
});