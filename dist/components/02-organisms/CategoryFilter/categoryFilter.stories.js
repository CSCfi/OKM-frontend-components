import React from "react";
import CategoryFilter from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { toimintaalueStory } from "./storydata/toimintaalueStory";
import kunnat from "./storydata/kunnat";
import maakunnat from "./storydata/maakunnat";
storiesOf("CategoryFilter", module).addDecorator(withInfo).add("Toiminta-alueen käyttötapaus", function () {
  return /*#__PURE__*/React.createElement(CategoryFilter, {
    anchor: "maakuntakunnat",
    localizations: {
      accept: "Hyväksy",
      cancel: "Peruuta",
      ofMunicipalities: "kunnista",
      sameAsTheCurrentAreaOfAction: "Sama kuin nykyinen toiminta-alue"
    },
    municipalities: kunnat,
    provinces: toimintaalueStory.categories,
    provincesWithoutMunicipalities: maakunnat,
    changeObjectsByProvince: {},
    showCategoryTitles: false,
    onChanges: function onChanges(changeObjectsByMaakunta) {
      console.info(changeObjectsByMaakunta);
      return changeObjectsByMaakunta;
    }
  });
});