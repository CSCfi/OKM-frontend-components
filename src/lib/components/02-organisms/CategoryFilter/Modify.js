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
  includes,
  sum,
  values
} from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_finland from "@amcharts/amcharts4-geodata/finlandHigh";
import am4geodata_lang_FI from "@amcharts/amcharts4-geodata/lang/FI";
import kuntaProvinceMapping from "./storydata/kuntaProvinceMapping";
import SimpleButton from "../../00-atoms/SimpleButton";
import { getAnchorPart } from "../../../utils/common";
import { getRemovalChangeObj, getAdditionChangeObj } from "./kunta-utils";
import { getAnchor as getKuntaAnchor } from "./kunta-utils";
import { isEqual } from "lodash";
import RadioButtonWithLabel from "../../01-molecules/RadioButtonWithLabel";

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
    country,
    localizations = {},
    municipalities = [],
    provinceInstances = {},
    provincesWithoutMunicipalities = [],
    onClose
  }) => {
    const polygonSeries = useRef(null);
    const kartta = useRef(null);
    const activePolygon = useRef(null);
    const previousSelection = useRef([]);
    const polygonTemplate = useRef(null);

    const [provinceId, setProvinceId] = useState();

    const [cos, setCos] = useState(changeObjectsByProvince);

    const percentages = useMemo(() => {
      return country.getPercentages(cos);
    }, [cos, country]);

    useEffect(() => {
      if (kartta.current) {
        country.colorize(cos);
      }
    }, [cos, country]);

    const isCountryActive = useMemo(() => {
      const percentagesArray = values(percentages);
      return sum(percentagesArray) / percentagesArray.length === 100;
    }, [percentages]);

    const isCountryDeactive = useMemo(() => {
      return sum(values(percentages)) === 0;
    }, [percentages]);

    useEffect(() => {
      setCos(changeObjectsByProvince);
    }, [changeObjectsByProvince]);

    const provinceChanges = useMemo(() => {
      return provinceId && cos[provinceId] ? cos[provinceId] : [];
    }, [cos, provinceId]);

    const provinceCategories = useMemo(() => {
      const result = find(propEq("formId", provinceId), categories);
      return [result].filter(Boolean);
    }, [categories, provinceId]);

    useEffect(() => {
      let finland = am4core.create("finland_map", am4maps.MapChart);
      finland.geodata = am4geodata_finland;
      // Set projection
      finland.projection = new am4maps.projections.Miller();

      finland.geodataNames = am4geodata_lang_FI;
      // kartta.current.responsive.enabled = true;

      kartta.current = finland;

      return function cancel() {
        kartta.current.dispose();
      };
    }, []);

    useEffect(() => {
      if (kartta.current.series.length === 0) {
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
            instance.colorize(cos[instance.getId()]);
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
      }
    }, [categories, cos, provinceInstances]);

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
              provinceInstance.isMunicipalityActive(
                location.value,
                cos[location.provinceKey]
              )
            );
          } else {
            return (
              areAllMunicipalitiesActive &&
              provinceInstance.isActive(cos[location.provinceKey])
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
              return map(municipality => {
                return {
                  label: municipality.getTitle(),
                  value: municipality.getName(),
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
              const isProvinceActive = provinceInstance
                ? provinceInstance.isActive(cos[provinceKey])
                : false;
              okToList =
                !isProvinceActive ||
                !provinceInstance.isMunicipalityActive(
                  option.koodiArvo,
                  cos[provinceKey]
                );
            }
          } else {
            provinceKey = mapping[option.koodiArvo];
            const provinceInstance = provinceInstances[provinceKey];
            if (provinceInstance) {
              const areAllMunicipalitiesActive = provinceInstance
                ? provinceInstance.areAllMunicipalitiesActive(cos[provinceKey])
                : false;
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
      cos,
      municipalities,
      provinceInstances,
      provincesWithoutMunicipalities,
      selectedLocations
    ]);

    const onAutocompleteChanges = useCallback(
      /**
       * The idea of this callback function is to update the list of
       * change objects. By doing so the map (Finland with provinces) and
       * the categorized lists related to it will be updated. The array of
       * change objects is the single point of changes. The content of
       * the autocomplete field will be updated based on it after this
       * function has been run.
       */
      (payload, values) => {
        const currentSel = values.value || [];
        const prevSel = previousSelection.current;
        /**
         * Items to deactivate is calculated by comparing the old value of the
         * autocomplete field to its current value.
         * DifferenceWith returns an array when it gets two arrays as
         * parameters. In this use case the length of returned array
         * should always be 1 because this callback function will be run on
         * every change occurring in the autocomplete field.
         */
        const itemsToDeactivate = differenceWith(
          (x, y) => x.value === y.value,
          prevSel || [],
          currentSel
        );

        /**
         * Current selection (currentSel) includes all the selected items.
         * The items are in the autocomplete field. The most recent one
         * is what interests us.
         */
        const latestSelection = last(currentSel);

        /**
         * Every item can provide a providence id. Depending of the use case
         * it will be fetched from the removed item or by using the latest
         * selection.
         */
        const provinceId = itemsToDeactivate.length
          ? itemsToDeactivate[0].provinceKey
          : latestSelection.provinceKey;

        /**
         * Province instance can easily be picked up from the object of
         * province instances. The object has been formed before entering
         * the edit view (Modify.js).
         */
        const provinceInstance = provinceInstances[provinceId];

        /**
         * Value is koodiarvo or some other identifier of a province or a
         * municipality.
         */
        const value = itemsToDeactivate.length
          ? itemsToDeactivate[0].value
          : latestSelection.value;

        /**
         * The target item is either a province or a municipality.
         */
        const isMunicipality = !!find(
          propEq("kuntaKoodiarvo", value),
          kuntaProvinceMapping
        );

        /**
         * This callback function handles and makes changes only to the current
         * province and its municipalities.
         */
        let _changeObjects = cos[provinceId] || [];

        if (itemsToDeactivate.length) {
          /**********************************************
           * DEACTIVATION OF PROVINCES AND MUNICIPALITIES
           **********************************************/

          if (isMunicipality) {
            /********************************
             * DEACTIVATION OF A MUNICIPALITY
             ********************************/

            // removeMunicipality deactivate the province when needed
            _changeObjects = provinceInstance.removeMunicipality(
              value,
              _changeObjects
            );
          } else {
            /********************************
             * DEACTIVATION OF A PROVINCE
             ********************************/

            // The province and its municipalities will be deactivated.
            _changeObjects = provinceInstance.deactivate(cos[provinceId]);
          }
        } else {
          /********************************************
           * ACTIVATION OF PROVINCES AND MUNICIPALITIES
           ********************************************/

          if (isMunicipality) {
            /********************************
             * ACTIVATION OF A MUNICIPALITY
             ********************************/

            // activateMunicipality activate the province when needed
            _changeObjects = provinceInstance.activateMunicipality(
              value,
              _changeObjects
            );
          } else {
            /**************************
             * ACTIVATION OF A PROVINCE
             **************************/

            // Activate the selected province and its municipalities.
            _changeObjects = provinceInstance.activateFully();
          }
        }
        setProvinceId(provinceId);
        previousSelection.current = currentSel;
        setCos(assoc(provinceId, _changeObjects, cos));
      },
      [cos, provinceInstances]
    );

    return (
      <React.Fragment>
        <fieldset className="p-4 bg-white border-t border-r border-l border-gray-300">
          <legend>{localizations.quickFilter}</legend>
          <div className="flex">
            <RadioButtonWithLabel
              payload={{ anchor: "koko-maa" }}
              isChecked={isCountryActive}
              onChanges={() => {
                setCos(country.activate(cos));
              }}
              value={"1"}>
              {localizations.wholeCountryWithoutAhvenanmaa}
            </RadioButtonWithLabel>
            <RadioButtonWithLabel
              payload={{ anchor: "ei-alueita" }}
              isChecked={isCountryDeactive}
              onChanges={() => {
                setCos(country.deactivate(cos));
              }}
              value={"0"}>
              {localizations.areaOfActionIsUndefined}
            </RadioButtonWithLabel>
          </div>
        </fieldset>

        <hr />

        <Autocomplete
          minChars={1}
          name="maakunnat-ja-kunnat-filter"
          options={locations}
          isSearch
          callback={onAutocompleteChanges}
          value={selectedLocations}
        />
        <div className="bg-white overflow-auto p-2">
          <div className="p-4 flex">
            <div
              id="finland_map"
              className="w-2/5"
              style={{ height: "500px" }}></div>
            <div className="w-3/5">
              {provinceCategories.length > 0 ? (
                <CategorizedListRoot
                  anchor={baseAnchor}
                  categories={provinceCategories}
                  changes={provinceChanges}
                  onUpdate={updateChangeObjects}
                  uncheckParentWithoutActiveChildNodes={
                    true
                  }></CategorizedListRoot>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end">
            <div className="mr-4">
              <SimpleButton
                variant={"outlined"}
                onClick={() => onClose()}
                text={localizations.cancel}></SimpleButton>
            </div>
            <div>
              <SimpleButton
                onClick={() => onClose(cos)}
                text={localizations.accept}></SimpleButton>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  },
  (cp, np) => {
    return (
      isEqual(cp.categories, np.categories) &&
      isEqual(cp.changeObjectsByProvince, np.changeObjectsByProvince)
    );
  }
);

Modify.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changeObjectsByProvince: PropTypes.object,
  country: PropTypes.object,
  municipalities: PropTypes.array,
  provinceInstances: PropTypes.object,
  provincesWithoutMunicipalities: PropTypes.array,
  onClose: PropTypes.func.isRequired,
  localizations: PropTypes.object
};

export default Modify;