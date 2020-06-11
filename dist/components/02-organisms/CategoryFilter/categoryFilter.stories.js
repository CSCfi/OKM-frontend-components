import React from "react";
import CategoryFilter from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";
import osaMaastaValittu from "./storydata/osaMaastaValittu";
import kokoMaaValittu from "./storydata/kokoMaaValittu";
import eiMaariteltyaToimintaaluetta from "./storydata/eiMaariteltyaToimintaaluetta";
import kunnat from "./storydata/kunnat";
import maakunnat from "./storydata/maakunnat";
var initialState = {
  isEditViewActive: false
};
storiesOf("CategoryFilter", module).addDecorator(withInfo).add("Osa maasta", withState(initialState)(function (_ref) {
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
    provinces: osaMaastaValittu.categories,
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
})).add("Koko maa - pois lukien ahvenanmaa", withState(initialState)(function (_ref2) {
  var store = _ref2.store;
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
    provinces: kokoMaaValittu.categories,
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
})).add("Ei määriteltyä toiminta-aluetta", withState(initialState)(function (_ref3) {
  var store = _ref3.store;
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
    provinces: eiMaariteltyaToimintaaluetta.categories,
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