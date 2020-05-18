import React from "react";
import CategoryFilter from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { toimintaalueStory } from "./storydata/toimintaalueStory";
import maakunnat from "./storydata/maakunnat";

storiesOf("CategoryFilter", module)
  .addDecorator(withInfo)
  .add("Toiminta-alueen käyttötapaus", () => (
    <CategoryFilter
      anchor={"maakuntakunnat"}
      provinces={toimintaalueStory.categories}
      provincesWithoutMunicipalities={maakunnat}
      changeObjectsByProvince={{}}
      showCategoryTitles={false}
      onChanges={changeObjectsByMaakunta => {
        console.info(changeObjectsByMaakunta);
        return changeObjectsByMaakunta;
      }}
    />
  ));
