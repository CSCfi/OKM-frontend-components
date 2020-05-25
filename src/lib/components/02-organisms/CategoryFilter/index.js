import React, { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { map, prop, addIndex, zipObj, isEmpty, equals } from "ramda";

import Modify from "./Modify";
import SimpleButton from "../../00-atoms/SimpleButton";
import { Province } from "./province";

const CategoryFilter = ({
  anchor = "no-anchor-defined",
  changeObjectsByProvince = {},
  localizations = {},
  municipalities = [],
  onChanges,
  provinces = [],
  provincesWithoutMunicipalities = []
}) => {
  console.info(localizations);
  const [isEditViewActive, toggleEditView] = useState(true);

  const [changeObjects, setChangeObjects] = useState(changeObjectsByProvince);

  useEffect(() => {
    setChangeObjects(changeObjectsByProvince);
  }, [changeObjectsByProvince]);

  const provinceInstances = useMemo(() => {
    const provinceIds = map(prop("anchor"), provinces);
    const instances = map(province => {
      return new Province(province, anchor);
    }, provinces);
    return zipObj(provinceIds, instances);
  }, [anchor, provinces]);

  /**
   * Renders a list of active provinces and municipalities.
   * @param {array} provinces - List of all provinces in Finland except Åland.
   * @param {object} changeObjects - Change objects of all provinces by province's anchor.
   */
  function renderToimintaalueList(provinces, changeObjects = {}) {
    return (
      <ul className="flex flex-wrap ml-8">
        {provinces.length ? (
          map(province => {
            const provinceInstance = provinceInstances[province.anchor];
            const isProvinceActive = provinceInstance.isActive(
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
                      % {localizations.ofMunicipalities})
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
          }, provinces || []).filter(Boolean)
        ) : (
          <div className="py-8">-</div>
        )}
      </ul>
    );
  }

  if (isEditViewActive) {
    return (
      <Modify
        provinceInstances={provinceInstances}
        anchor={anchor}
        categories={provinces}
        municipalities={municipalities}
        localizations={localizations}
        provincesWithoutMunicipalities={provincesWithoutMunicipalities}
        onClose={changesByProvince => {
          toggleEditView(false);
          if (changesByProvince) {
            setChangeObjects(changesByProvince);
            onChanges(changesByProvince);
          } else if (!equals(changeObjects, changeObjectsByProvince)) {
            onChanges(changeObjectsByProvince);
          }
        }}
        changeObjectsByProvince={changeObjects}
      />
    );
  } else {
    return (
      <div className={"p-4"}>
        <h3>Nykyinen toiminta-alue</h3>
        {renderToimintaalueList(provinces)}
        <hr />
        <h3 className={"mt-4"}>{localizations.newAreaOfAction}</h3>
        {!isEmpty(changeObjects) ? (
          renderToimintaalueList(provinces, changeObjects)
        ) : (
          <p className={"pl-8 pt-4"}>
            {localizations.sameAsTheCurrentAreaOfAction}
          </p>
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
  localizations: PropTypes.object,
  municipalities: PropTypes.array,
  onChanges: PropTypes.func.isRequired,
  provincesWithoutMunicipalities: PropTypes.array
};

export default CategoryFilter;
