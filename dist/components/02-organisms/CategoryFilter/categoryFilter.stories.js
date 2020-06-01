import React from "react";
import CategoryFilter from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";
import { toimintaalueStory } from "./storydata/toimintaalueStory";
import kunnat from "./storydata/kunnat";
import maakunnat from "./storydata/maakunnat";
var initialState = {
  isEditViewActive: false
};
storiesOf("CategoryFilter", module).addDecorator(withInfo).add("Toiminta-alueen käyttötapaus", withState(initialState)(function (_ref) {
  var store = _ref.store;
  return /*#__PURE__*/React.createElement(CategoryFilter, {
    anchor: "maakuntakunnat",
    isEditViewActive: store.state.isEditViewActive,
    localizations: {
      accept: "Hyväksy",
      areaOfActionIsUndefined: "Ei määritettyä toiminta-aluetta",
      cancel: "Peruuta",
      currentAreaOfAction: "Nykyinen toiminta-alue",
      newAreaOfAction: "Uusi toiminta-alue",
      ofMunicipalities: "kunnista",
      quickFilter: "Pikavalinnat",
      sameAsTheCurrentAreaOfAction: "Sama kuin nykyinen toiminta-alue",
      wholeCountryWithoutAhvenanmaa: "Koko maa - pois lukien Ahvenanmaan maakunnat"
    },
    municipalities: kunnat,
    provinces: toimintaalueStory.categories,
    provincesWithoutMunicipalities: maakunnat,
    changeObjectsByProvince: {},
    showCategoryTitles: false,
    onChanges: function onChanges(changeObjectsByMaakunta) {
      console.info(changeObjectsByMaakunta);
      return changeObjectsByMaakunta;
    },
    toggleEditView: function toggleEditView(_isEditViewActive) {
      console.info(_isEditViewActive);
      store.set({
        isEditViewActive: _isEditViewActive
      });
    }
  });
}));