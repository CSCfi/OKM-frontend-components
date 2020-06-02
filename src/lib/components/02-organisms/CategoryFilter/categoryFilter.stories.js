import React from "react";
import CategoryFilter from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withState } from "@dump247/storybook-state";
import { toimintaalueStory } from "./storydata/toimintaalueStory";
import kunnat from "./storydata/kunnat";
import maakunnat from "./storydata/maakunnat";

const initialState = {
  isEditViewActive: false
};

storiesOf("CategoryFilter", module)
  .addDecorator(withInfo)
  .add(
    "Toiminta-alueen käyttötapaus",
    withState(initialState)(({ store }) => (
      <CategoryFilter
        anchor={"maakuntakunnat"}
        isEditViewActive={store.state.isEditViewActive}
        localizations={{
          accept: "Hyväksy",
          areaOfActionIsUndefined: "Ei määritettyä toiminta-aluetta",
          cancel: "Peruuta",
          currentAreaOfAction: "Nykyinen toiminta-alue",
          newAreaOfAction: "Uusi toiminta-alue",
          ofMunicipalities: "kunnista",
          quickFilter: "Pikavalinnat",
          sameAsTheCurrentAreaOfAction: "Sama kuin nykyinen toiminta-alue",
          wholeCountryWithoutAhvenanmaa:
            "Koko maa - pois lukien Ahvenanmaan maakunnat"
        }}
        municipalities={kunnat}
        provinces={toimintaalueStory.categories}
        provincesWithoutMunicipalities={maakunnat}
        changeObjectsByProvince={{}}
        showCategoryTitles={false}
        onChanges={changeObjectsByMaakunta => {
          console.info(changeObjectsByMaakunta);
          return changeObjectsByMaakunta;
        }}
        toggleEditView={_isEditViewActive => {
          console.info(_isEditViewActive);
          store.set({ isEditViewActive: _isEditViewActive });
        }}
      />
    ))
  );
