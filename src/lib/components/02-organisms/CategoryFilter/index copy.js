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
  filter
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

  const valitutKunnatMaakunnittain = useMemo(() => {
    const maakuntaIds = map(prop("anchor"), categories);
    const valitutKunnat = map(category => {
      return filter(kunta => {
        return kunta.properties.isChecked;
      }, category.categories[0].components);
    }, categories);
    console.info(valitutKunnat, maakuntaIds);
    return zipObj(maakuntaIds, valitutKunnat);
  }, [categories]);

  useEffect(() => {
    onChanges(cos);
  }, [onChanges, cos]);

  function renderToimintaalueList(categories, existing = true) {
    return (
      <ul className="flex flex-wrap ml-8">
        {map(maakuntaId => {
          console.info(maakuntaId);
          // const category = find(propEq("anchor", maakuntaId), categories);
          // const valitutKunnat = filter(kunta => {
          //   return kunta.properties.isChecked;
          // }, categories[maakuntaId].categories[0].components);

          const maakuntaChangeObj = find(
            compose(includes(".A"), prop("anchor")),
            categories[maakuntaId]
          );
          const kunnatCount = categories[maakuntaId].length;
          const category = find(propEq("anchor", maakuntaId), categories);
          const kunnatAmount = category.categories[0].components.length;
          return (
            <li key={maakuntaId} className={"w-1/2 pt-4 pb-6 pr-6"}>
              <div className="flex items-baseline">
                <h4>{maakuntaChangeObj.properties.metadata.title}</h4>
                <p className="ml-2 text-xs">
                  ({Math.round(((kunnatCount - 1) / kunnatAmount) * 100)}%
                  kunnista)
                </p>
              </div>
              <ul className={"mt-4"}>
                <li>
                  {addIndex(map)((changeObj, index) => {
                    return includes(".kunnat", changeObj.anchor) ? (
                      <span key={`kuntamuutos-${index}`}>
                        {changeObj.properties.metadata.title}
                        {index < kunnatCount - 1 ? ", " : null}
                      </span>
                    ) : null;
                  }, categories[maakuntaId]).filter(Boolean)}
                </li>
              </ul>
            </li>
          );
        }, keys(categories) || [])}
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
          console.info(muutoksetMaakunnittain);
          setCos(muutoksetMaakunnittain);
        }}
        changeObjectsByMaakunta={cos}
      />
    );
  } else {
    return (
      <div className={"p-4"}>
        <h3>Nykyinen toiminta-alue</h3>
        {console.info(valitutKunnatMaakunnittain)}
        {renderToimintaalueList(valitutKunnatMaakunnittain)}
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
