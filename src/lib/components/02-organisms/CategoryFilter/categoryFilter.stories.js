import React from "react";
import CategoryFilter from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { toimintaalueStory } from "./storydata/toimintaalueStory";

storiesOf("CategoryFilter", module)
  .addDecorator(withInfo)
  .add("Toiminta-alueen käyttötapaus", () => (
    <CategoryFilter
      anchor={"maakuntakunnat"}
      provinces={toimintaalueStory.categories}
      // changeObjectsByMaakunta={toimintaalueStory.changes}
      changeObjectsByProvince={{}}
      showCategoryTitles={false}
      onChanges={changeObjectsByMaakunta => {
        console.info(changeObjectsByMaakunta);
        return changeObjectsByMaakunta;
      }}
    />
  ));
