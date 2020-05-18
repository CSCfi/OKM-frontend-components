import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { map, prop, equals, addIndex, zipObj } from "ramda";

import Modify from "./Modify";
import SimpleButton from "../../00-atoms/SimpleButton";
import { Province } from "./province";

const CategoryFilter = ({
  anchor = "no-anchor-defined",
  provinces = [],
  changeObjectsByProvince = {},
  onChanges
}) => {
  const [isEditViewActive, toggleEditView] = useState(true);

  const [cos, setCos] = useState(changeObjectsByProvince);

  const provinceInstances = useMemo(() => {
    const provinceIds = map(prop("anchor"), provinces);
    const instances = map(province => {
      return new Province(province, anchor);
    }, provinces);
    return zipObj(provinceIds, instances);
  }, [anchor, provinces]);

  useEffect(() => {
    onChanges(cos);
  }, [onChanges, cos]);

  /**
   * Renders a list of active provinces and municipalities.
   * @param {array} provinces - List of all provinces in Finland except Åland.
   * @param {object} changeObjects - Change objects of all provinces by province's anchor.
   */
  function renderToimintaalueList(provinces, changeObjects = {}) {
    return (
      <ul className="flex flex-wrap ml-8">
        {map(province => {
          const provinceInstance = provinceInstances[province.anchor];
          const isProvinceActive = provinceInstance.isActive(
            anchor,
            changeObjects[province.anchor]
          );
          if (isProvinceActive) {
            const activeMunicipalities = provinceInstance.getActiveMunicipalities(
              changeObjects[province.anchor]
            );
            return (
              <li key={province.anchor} className={"w-1/2 pt-4 pb-6 pr-6"}>
                <div className="flex items-baseline">
                  <h4>{province.components[0].properties.title}</h4>
                  <p className="ml-2 text-xs">
                    (
                    {Math.round(
                      (activeMunicipalities.length /
                        province.categories[0].components.length) *
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
                          {activeMunicipalities[index + 1] ? ", " : null}
                        </span>
                      );
                    }, activeMunicipalities).filter(Boolean)}
                  </li>
                </ul>
              </li>
            );
          }
          return null;
        }, provinces || []).filter(Boolean)}
      </ul>
    );
  }

  if (isEditViewActive) {
    return (
      <Modify
        provinceInstances={provinceInstances}
        anchor={anchor}
        categories={provinces}
        onChanges={onChanges}
        onClose={muutoksetMaakunnittain => {
          toggleEditView(false);
          setCos(muutoksetMaakunnittain);
        }}
        changeObjectsByProvince={cos}
      />
    );
  } else {
    return (
      <div className={"p-4"}>
        <h3>Nykyinen toiminta-alue</h3>
        {renderToimintaalueList(provinces)}
        <hr />
        <h3 className={"mt-4"}>Uusi toiminta-alue</h3>
        {!equals(cos, changeObjectsByProvince) ? (
          renderToimintaalueList(provinces, cos)
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
  changeObjectsByProvince: PropTypes.object,
  onChanges: PropTypes.func.isRequired
};

export default CategoryFilter;
