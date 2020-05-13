import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  map,
  keys,
  compose,
  prop,
  includes,
  find,
  join,
  equals,
  addIndex
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

  useEffect(() => {
    onChanges(cos);
  }, [onChanges, cos]);

  function renderToimintaalueList(changeObjectsBy, existing = true) {
    return (
      <ul className="flex flex-wrap ml-8">
        {map(maakuntaId => {
          const maakuntaChangeObj = find(
            compose(includes(".A"), prop("anchor")),
            changeObjectsBy[maakuntaId]
          );
          const kunnatCount = changeObjectsBy[maakuntaId].length;
          return (
            <li key={maakuntaId} className={"w-1/2 pt-4 pb-6 pr-6"}>
              <h4>{maakuntaChangeObj.properties.metadata.title}</h4>
              <ul className={"mt-4"}>
                <li>
                  {addIndex(map)((changeObj, index) => {
                    return (
                      <span>
                        {changeObj.properties.metadata.title}
                        {index < kunnatCount - 1 ? ", " : null}
                      </span>
                    );
                  }, changeObjectsBy[maakuntaId])}
                </li>
              </ul>
            </li>
          );
        }, keys(changeObjectsBy) || [])}
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

        {renderToimintaalueList(changeObjectsByMaakunta)}

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
