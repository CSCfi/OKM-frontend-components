import React from "react";
import CategoryFilter from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { toimintaalueStory } from "./storydata/toimintaalueStory";
storiesOf("CategoryFilter", module).addDecorator(withInfo).add("Toiminta-alueen käyttötapaus", function () {
  return /*#__PURE__*/React.createElement(CategoryFilter, {
    anchor: "maakuntakunnat",
    categories: toimintaalueStory.categories // changeObjectsByMaakunta={toimintaalueStory.changes}
    ,
    changeObjectsByMaakunta: {},
    showCategoryTitles: false,
    onChanges: function onChanges(changeObjectsByMaakunta) {
      console.info(changeObjectsByMaakunta);
      return changeObjectsByMaakunta;
    }
  });
});