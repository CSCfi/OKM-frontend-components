import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  map,
  keys,
  compose,
  prop,
  includes,
  find,
  equals,
  addIndex,
  propEq,
  zipObj,
  filter,
  pathEq
} from "ramda";

import Modify from "./Modify";
import SimpleButton from "../../00-atoms/SimpleButton";

const CategoryFilter = ({
  anchor = "no-anchor-defined",
  categories = [],
  changeObjectsByMaakunta = {},
  onChanges
}) => {
  const [isEditViewActive, toggleEditView] = useState(false);

  const [cos, setCos] = useState(changeObjectsByMaakunta);

  // const valitutKunnatMaakunnittain = useMemo(() => {
  //   const maakuntaIds = map(prop("anchor"), categories);
  //   const valitutKunnat = map(category => {
  //     return {
  //       title: category.components[0].properties.title,
  //       kunnat: filter(kunta => {
  //         return kunta.properties.isChecked;
  //       }, category.categories[0].components)
  //     };
  //   }, categories);
  //   return zipObj(maakuntaIds, valitutKunnat);
  // }, [categories]);

  useEffect(() => {
    onChanges(cos);
  }, [onChanges, cos]);

  function renderToimintaalueList(maakunnat, existing = true) {
    return (
      <ul className="flex flex-wrap ml-8">
        {map(maakunta => {
          const valitutKunnat = filter(
            pathEq(["properties", "isChecked"], true),
            maakunta.categories[0].components
          );
          console.info(maakunta);
          // const category = find(propEq("anchor", maakuntaId), categories);

          // const maakuntaChangeObj = find(
          //   compose(includes(".A"), prop("anchor")),
          //   categories[maakuntaId]
          // );
          // const kunnatCount = categories[maakuntaId].length;
          // const category = find(propEq("anchor", maakuntaId), categories);
          // const kunnatAmount = category.categories[0].components.length;
          return (
            <li key={maakunta.anchor} className={"w-1/2 pt-4 pb-6 pr-6"}>
              <div className="flex items-baseline">
                <h4>{maakunta.components[0].properties.title}</h4>
                <p className="ml-2 text-xs">
                  (
                  {Math.round(
                    (valitutKunnat.length /
                      maakunta.categories[0].components.length) *
                      100
                  )}
                  % kunnista)
                </p>
              </div>
              <ul className={"mt-4"}>
                <li>
                  {addIndex(map)((kunta, index) => {
                    return (
                      <span key={`kunta-${index}`}>
                        {kunta.properties.title}
                        {valitutKunnat[index + 1] ? ", " : null}
                      </span>
                    );
                  }, valitutKunnat).filter(Boolean)}
                </li>
              </ul>
            </li>
          );
        }, maakunnat || [])}
      </ul>
    );
  }

  if (isEditViewActive) {
    return (
      <Modify
        anchor={anchor}
        categories={categories}
        onChanges={onChanges}
        onClose={muutoksetMaakunnittain => {
          toggleEditView(false);
          setCos(muutoksetMaakunnittain);
        }}
        changeObjectsByMaakunta={cos}
      />
    );
  } else {
    return (
      <div className={"p-4"}>
        <h3>Nykyinen toiminta-alue</h3>
        {renderToimintaalueList(categories)}
        <hr />
        <h3 className={"mt-4"}>Uusi toiminta-alue</h3>
        {!equals(cos, changeObjectsByMaakunta) ? (
          renderToimintaalueList(cos, false)
        ) : (
          <p className={"pl-8 pt-4"}>Sama kuin nykyinen toiminta-alue.</p>
        )}
        <div className={"float-right pt-6"}>
          <SimpleButton
            onClick={() => toggleEditView(true)}
            text={"Muokkaa toiminta-aluetta"}></SimpleButton>
        </div>
      </div>
    );
  }
};

CategoryFilter.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changeObjectsByMaakunta: PropTypes.object,
  onChanges: PropTypes.func.isRequired
};

export default CategoryFilter;
