import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef
} from "react";
import PropTypes from "prop-types";
import CategorizedListRoot from "../CategorizedListRoot";
import Autocomplete from "../Autocomplete";
import {
  assoc,
  equals,
  filter,
  find,
  map,
  propEq,
  dissoc,
  concat,
  flatten,
  uniq,
  last,
  differenceWith,
  append,
  forEachObjIndexed,
  not,
  compose,
  includes
} from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_finland from "@amcharts/amcharts4-geodata/finlandHigh";
import am4geodata_lang_FI from "@amcharts/amcharts4-geodata/lang/FI";
import kuntaProvinceMapping from "./storydata/kuntaProvinceMapping";
import { Province } from "./province";
import SimpleButton from "../../00-atoms/SimpleButton";
import { getAnchorPart } from "../../../utils/common";
import { getRemovalChangeObj, getAdditionChangeObj } from "./kunta-utils";
import { getAnchor as getKuntaAnchor } from "./kunta-utils";

const mapping = {
  "01": "FI-18",
  "02": "FI-19",
  "04": "FI-17",
  "05": "FI-06",
  "06": "FI-11",
  "07": "FI-16",
  "08": "FI-09",
  "09": "FI-02",
  "10": "FI-04",
  "11": "FI-15",
  "12": "FI-13",
  "14": "FI-03",
  "16": "FI-07",
  "13": "FI-08",
  "15": "FI-12",
  "17": "FI-14",
  "18": "FI-05",
  "19": "FI-10",
  "21": "FI-01"
};

const Modify = React.memo(
  ({
    anchor: baseAnchor = "no-anchor-defined",
    categories = [],
    changeObjectsByProvince = {},
    municipalities = [],
    provinceInstances = {},
    provincesWithoutMunicipalities = [],
    onChanges,
    onClose
  }) => {
    const polygonSeries = useRef(null);
    const kartta = useRef(null);
    const activePolygon = useRef(null);
    const previousSelection = useRef([]);
    const polygonTemplate = useRef(null);

    const [provinceId, setProvinceId] = useState();

    const [cos, setCos] = useState(changeObjectsByProvince);

    const provinceChanges = useMemo(() => {
      return provinceId && cos[provinceId] ? cos[provinceId] : [];
    }, [cos, provinceId]);

    const provinceCategories = useMemo(() => {
      const result = find(propEq("formId", provinceId), categories);
      return [result].filter(Boolean);
    }, [categories, provinceId]);

    useEffect(() => {
      onChanges(cos);
    }, [cos, onChanges]);

    useEffect(() => {
      kartta.current = am4core.create("finland_map", am4maps.MapChart);
      kartta.current.geodata = am4geodata_finland;
      // Set projection
      kartta.current.projection = new am4maps.projections.Miller();

      kartta.current.geodataNames = am4geodata_lang_FI;
      // kartta.current.responsive.enabled = true;

      // Create map polygon series
      polygonSeries.current = kartta.current.series.push(
        new am4maps.MapPolygonSeries()
      );

      // Make map load polygon (like country names) data from GeoJSON
      polygonSeries.current.useGeodata = true;

      // Add expectancy data
      polygonSeries.current.events.on("beforedatavalidated", function(ev) {
        var source = ev.target.data;
        if (source.maybe) {
          ev.target.data = source.maybe.here.values;
        }
      });

      polygonSeries.current.events.on("inited", function(ev) {
        forEachObjIndexed(instance => {
          instance.setMap(kartta.current);
          instance.setPolygonSeries(polygonSeries.current);
          instance.colorize(changeObjectsByProvince[instance.getId()]);
        }, provinceInstances);
      });

      // Configure series
      polygonTemplate.current = polygonSeries.current.mapPolygons.template;
      polygonTemplate.current.tooltipText = "{name}";
      polygonTemplate.current.fill = am4core.color("#dadada");

      // Create active state
      const activeState = polygonTemplate.current.states.create("active");
      activeState.properties.stroke = am4core.color("#367B25");

      polygonTemplate.current.events.on("hit", function(e) {
        if (e.target.dataItem.dataContext.id !== "FI-01") {
          activePolygon.current = e.target;
          // FI-01 = Ahvenanmaa
          setProvinceId(e.target.dataItem.dataContext.id);
        }
      });

      return function cancel() {
        kartta.current.dispose();
      };
    }, [categories, changeObjectsByProvince, provinceInstances]);

    const updateChangeObjects = useCallback(
      (payload, _provinceId) => {
        let nextChangeObjects = [];
        const nextProvinceChanges = uniq(payload.changes);
        if (nextProvinceChanges.length) {
          nextChangeObjects = assoc(
            _provinceId || provinceId,
            nextProvinceChanges,
            cos
          );
        } else {
          nextChangeObjects = dissoc(_provinceId || provinceId, cos);
        }
        if (!equals(cos, nextChangeObjects)) {
          setCos(nextChangeObjects);
        }
      },
      [provinceId, cos]
    );

    /**
     * Updates the color and percentage of selected province.
     */
    useEffect(() => {
      if (provinceId) {
        let provinceInstance = provinceInstances[provinceId];
        if (!provinceInstance) {
          provinceInstance = new Province(
            provinceId,
            kartta.current,
            find(propEq("anchor", provinceId), categories),
            polygonSeries.current
          );
          provinceInstances[provinceId] = provinceInstance;
        }
        provinceInstance.colorize(provinceChanges);
      }
    }, [categories, provinceId, provinceInstances, provinceChanges]);

    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
      const shouldBeSelected = filter(location => {
        const provinceInstance = provinceInstances[location.provinceKey];
        if (provinceInstance) {
          const areAllMunicipalitiesActive = provinceInstance.areAllMunicipalitiesActive(
            cos[location.provinceKey]
          );
          if (location.isKunta) {
            return (
              !areAllMunicipalitiesActive &&
              provinceInstance.isKuntaActive(
                location.value,
                baseAnchor,
                cos[location.provinceKey]
              )
            );
          } else {
            return (
              areAllMunicipalitiesActive &&
              provinceInstance.isActive(baseAnchor, cos[location.provinceKey])
            );
          }
        }
        return true;
      }, selectedLocations);

      // Selected by default
      const selectedByDefault = flatten(
        map(province => {
          const provinceInstance = provinceInstances[province.anchor];
          if (provinceInstance) {
            const activeMunicipalities = provinceInstance.getActiveMunicipalities(
              cos[province.anchor]
            );
            const areAllMunicipalitiesActive = provinceInstance.areAllMunicipalitiesActive(
              cos[province.anchor],
              activeMunicipalities
            );
            if (areAllMunicipalitiesActive) {
              return {
                label: province.components[0].properties.title,
                value: province.components[0].properties.name,
                provinceKey: province.anchor,
                isKunta: false
              };
            } else {
              return map(kunta => {
                return {
                  label: kunta.properties.title,
                  value: kunta.properties.name,
                  provinceKey: province.anchor,
                  isKunta: true
                };
              }, activeMunicipalities);
            }
          }
          return null;
        }, categories).filter(Boolean)
      );

      const locationsCombined = uniq(
        flatten([shouldBeSelected, selectedByDefault])
      );
      previousSelection.current = locationsCombined;
      if (!equals(selectedLocations, locationsCombined)) {
        setSelectedLocations(locationsCombined);
      }
    }, [baseAnchor, categories, cos, provinceInstances, selectedLocations]);

    const locale = "FI";

    const locations = useMemo(() => {
      function getValittavissaOlevat(options, isKunta) {
        return map(option => {
          let okToList = true;
          let provinceKey = "";
          let kuntaMapping = null;
          const metadata = find(propEq("kieli", locale), option.metadata);
          if (isKunta) {
            kuntaMapping = find(
              propEq("kuntaKoodiarvo", option.koodiArvo),
              kuntaProvinceMapping
            );
            if (kuntaMapping) {
              provinceKey = kuntaMapping.maakuntaKey;
              const provinceInstance = provinceInstances[provinceKey];
              const isProvinceActive = provinceInstance.isActive(
                baseAnchor,
                cos[provinceKey]
              );
              okToList =
                !isProvinceActive ||
                !provinceInstance.isKuntaActive(
                  option.koodiArvo,
                  baseAnchor,
                  cos[provinceKey]
                );
            }
          } else {
            provinceKey = mapping[option.koodiArvo];
            const provinceInstance = provinceInstances[provinceKey];
            if (provinceInstance) {
              const areAllMunicipalitiesActive = provinceInstance.areAllMunicipalitiesActive(
                cos[provinceKey]
              );
              okToList = !areAllMunicipalitiesActive;
            } else {
              okToList = false;
            }
          }
          return okToList
            ? {
                label: metadata.nimi,
                value: option.koodiArvo,
                provinceKey,
                isKunta
              }
            : null;
        }, options).filter(Boolean);
      }

      const valittavissaOlevat = {
        kunnat: getValittavissaOlevat(municipalities, true, selectedLocations),
        maakunnat: getValittavissaOlevat(provincesWithoutMunicipalities, false)
      };

      return concat(valittavissaOlevat.kunnat, valittavissaOlevat.maakunnat);
    }, [
      baseAnchor,
      cos,
      municipalities,
      provinceInstances,
      provincesWithoutMunicipalities,
      selectedLocations
    ]);

    return (
      <React.Fragment>
        <Autocomplete
          minChars={1}
          name="filter example"
          options={locations}
          isSearch
          callback={(payload, values) => {
            const currentSel = values.value || [];
            const prevSel = previousSelection.current;
            const cmp = (x, y) => {
              return x.value === y.value;
            };
            const itemsToRemove = differenceWith(
              cmp,
              prevSel || [],
              currentSel
            );
            // Remvoval
            if (itemsToRemove.length) {
              const provinceId = itemsToRemove[0].provinceKey;
              const provinceInstance = provinceInstances[provinceId];

              setProvinceId(provinceId);

              const isKunta = !!find(
                propEq("kuntaKoodiarvo", itemsToRemove[0].value),
                kuntaProvinceMapping
              );

              // const currentProvincePolygon = polygonSeries.current.getPolygonById(
              //   itemsToRemove[0].provinceKey
              // );

              // setProvinceId(currentProvincePolygon.dataItem.dataContext.id);

              if (isKunta) {
                let provinceRemovalChangeObj = null;
                // Aktiiviset kunnat
                const activeMunicipalities = provinceInstance.getActiveMunicipalities(
                  cos[provinceId]
                );

                /**
                 * If there's only one active municipality we are going to
                 * deactivate the province.
                 **/
                if (activeMunicipalities.length === 1) {
                  provinceRemovalChangeObj = provinceInstance.getRemovalChangeObj(
                    baseAnchor
                  );
                }

                if (cos[provinceId]) {
                  let provinceChangeObjects = filter(changeObj => {
                    const value = getAnchorPart(changeObj.anchor, 3);
                    return value !== itemsToRemove[0].value;
                  }, cos[provinceId]);

                  /**
                   * Couldn't remove the municipality. It means that we have
                   * to create a new change object.
                   **/
                  if (
                    provinceChangeObjects &&
                    provinceChangeObjects.length === cos[provinceId].length
                  ) {
                    provinceChangeObjects = append(
                      getRemovalChangeObj(
                        baseAnchor,
                        provinceId,
                        itemsToRemove[0].value
                      ),
                      provinceChangeObjects
                    );
                  }
                  updateChangeObjects(
                    {
                      changes: flatten(
                        [
                          provinceRemovalChangeObj,
                          provinceChangeObjects
                        ].filter(Boolean)
                      )
                    },
                    provinceId
                  );
                } else {
                  updateChangeObjects(
                    {
                      changes: [
                        provinceRemovalChangeObj,
                        getRemovalChangeObj(
                          baseAnchor,
                          provinceId,
                          itemsToRemove[0].value
                        )
                      ].filter(Boolean)
                    },
                    provinceId
                  );
                }
              } else {
                // Maakunnan poisto
                let nextCos;
                if (cos[itemsToRemove[0].provinceKey]) {
                  nextCos = dissoc(provinceId, cos);
                } else {
                  const province = find(
                    propEq("anchor", provinceId),
                    categories
                  );
                  nextCos = assoc(
                    provinceId,
                    flatten([
                      [provinceInstance.getRemovalChangeObj(baseAnchor)],
                      map(kunta => {
                        return getRemovalChangeObj(
                          baseAnchor,
                          provinceId,
                          kunta.anchor
                        );
                      }, province.categories[0].components)
                    ]),
                    cos
                  );
                }
                setCos(nextCos);
              }
            }
            // Addition
            else {
              const latestSelection = last(currentSel);
              const provinceId = latestSelection.provinceKey;
              let _changeObjects = cos[provinceId] || [];
              const provinceInstance = provinceInstances[provinceId];
              const activeMunicipalities = provinceInstance.getActiveMunicipalities(
                cos[provinceId]
              );
              let provinceChangeObj = find(
                propEq("anchor", provinceInstance.getAnchor()),
                _changeObjects
              );
              const isKunta = !!find(
                propEq("kuntaKoodiarvo", latestSelection.value),
                kuntaProvinceMapping
              );
              if (isKunta) {
                const anchor = getKuntaAnchor(
                  baseAnchor,
                  provinceId,
                  latestSelection.value
                );
                let changeObj = find(propEq("anchor", anchor), _changeObjects);

                if (changeObj && !changeObj.properties.isChecked) {
                  // Delete change object
                  _changeObjects = filter(
                    compose(not, propEq("anchor", anchor)),
                    _changeObjects
                  );
                } else {
                  // Create change object
                  _changeObjects = append(
                    getAdditionChangeObj(
                      baseAnchor,
                      provinceId,
                      latestSelection.label,
                      latestSelection.value
                    ),
                    _changeObjects
                  );
                }

                const provinceAnchor = provinceInstance.getAnchor();
                if (provinceChangeObj) {
                  if (
                    activeMunicipalities.length ===
                    provinceInstance.getMunicipalities().length - 1
                  ) {
                    const originalProvince = provinceInstance.initializedAs();
                    // Delete province's change object
                    _changeObjects = filter(
                      compose(not, propEq("anchor", provinceAnchor)),
                      _changeObjects
                    );
                    if (
                      !(
                        originalProvince.components[0].properties.isChecked &&
                        !originalProvince.components[0].properties
                          .isIndeterminate
                      )
                    ) {
                      // Original province isn't valid without a new change object.
                      provinceChangeObj = provinceInstance.getAdditionChangeObj(
                        false
                      );
                      _changeObjects = append(
                        provinceChangeObj,
                        _changeObjects
                      );
                    }
                  }
                } else {
                  // Create province's change object
                  const originalProvince = provinceInstance.initializedAs();
                  if (
                    activeMunicipalities.length ===
                    provinceInstance.getMunicipalities().length - 1
                  ) {
                    if (
                      !(
                        originalProvince.components[0].properties.isChecked &&
                        !originalProvince.components[0].properties
                          .isIndeterminate
                      )
                    ) {
                      // Original province isn't valid without a new change object.
                      provinceChangeObj = provinceInstance.getAdditionChangeObj(
                        false
                      );
                      _changeObjects = append(
                        provinceChangeObj,
                        _changeObjects
                      );
                    }
                  } else {
                    if (
                      !(
                        originalProvince.components[0].properties.isChecked &&
                        originalProvince.components[0].properties
                          .isIndeterminate
                      )
                    ) {
                      // Original province isn't valid without a new change object.
                      provinceChangeObj = provinceInstance.getAdditionChangeObj(
                        true
                      );
                      _changeObjects = append(
                        provinceChangeObj,
                        _changeObjects
                      );
                    }
                  }
                }
              } else {
                /**
                 * Province and its municipalities have to be active.
                 * Let's remove irrelevant change objects first.
                 **/

                _changeObjects = filter(changeObj => {
                  const isRelatedToCurrentProvince = includes(
                    `.${provinceId}.`,
                    changeObj.anchor
                  );
                  return (
                    !isRelatedToCurrentProvince ||
                    changeObj.properties.isChecked
                  );
                }, _changeObjects);
                // Activate the selected province and its municipalities.
                _changeObjects = provinceInstance.activateFully(_changeObjects);
              }
              updateChangeObjects(
                {
                  changes: _changeObjects
                },
                latestSelection.provinceKey
              );
              setProvinceId(latestSelection.provinceKey);
            }
            previousSelection.current = currentSel;
          }}
          value={selectedLocations}
        />
        <div className="bg-white border overflow-auto p-2">
          <div className="mt-12 p-4 flex">
            <div
              id="finland_map"
              ref={kartta}
              className="w-2/5"
              style={{ height: "700px" }}></div>
            <div className="w-3/5">
              {provinceCategories.length > 0 ? (
                <CategorizedListRoot
                  anchor={baseAnchor}
                  categories={provinceCategories}
                  changes={provinceChanges}
                  onUpdate={updateChangeObjects}></CategorizedListRoot>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="mr-4">
              <SimpleButton
                variant={"outlined"}
                onClick={() => onClose(changeObjectsByProvince)}
                text={"Peruuta"}></SimpleButton>
            </div>
            <div>
              <SimpleButton
                onClick={() => onClose(cos)}
                text={"Hyväksy"}></SimpleButton>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
);

Modify.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changeObjectsByProvince: PropTypes.object,
  municipalities: PropTypes.array,
  provinceInstances: PropTypes.object,
  provincesWithoutMunicipalities: PropTypes.array,
  onClose: PropTypes.func,
  onChanges: PropTypes.func
};

export default Modify;
