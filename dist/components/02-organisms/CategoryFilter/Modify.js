import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import CategorizedListRoot from "../CategorizedListRoot";
import Autocomplete from "../Autocomplete";
import { assoc, equals, filter, find, map, propEq, dissoc, concat, flatten, uniq, last, differenceWith, append, forEachObjIndexed, not, compose, includes, sum, values } from "ramda";
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
var mapping = {
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
var Modify = React.memo(function (_ref) {
  var _ref$anchor = _ref.anchor,
      baseAnchor = _ref$anchor === void 0 ? "no-anchor-defined" : _ref$anchor,
      _ref$categories = _ref.categories,
      categories = _ref$categories === void 0 ? [] : _ref$categories,
      _ref$changeObjectsByP = _ref.changeObjectsByProvince,
      changeObjectsByProvince = _ref$changeObjectsByP === void 0 ? {} : _ref$changeObjectsByP,
      country = _ref.country,
      _ref$localizations = _ref.localizations,
      localizations = _ref$localizations === void 0 ? {} : _ref$localizations,
      _ref$municipalities = _ref.municipalities,
      municipalities = _ref$municipalities === void 0 ? [] : _ref$municipalities,
      _ref$provinceInstance = _ref.provinceInstances,
      provinceInstances = _ref$provinceInstance === void 0 ? {} : _ref$provinceInstance,
      _ref$provincesWithout = _ref.provincesWithoutMunicipalities,
      provincesWithoutMunicipalities = _ref$provincesWithout === void 0 ? [] : _ref$provincesWithout,
      onClose = _ref.onClose;
  var polygonSeries = useRef(null);
  var kartta = useRef(null);
  var activePolygon = useRef(null);
  var previousSelection = useRef([]);
  var polygonTemplate = useRef(null);

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      provinceId = _useState2[0],
      setProvinceId = _useState2[1];

  var _useState3 = useState(changeObjectsByProvince),
      _useState4 = _slicedToArray(_useState3, 2),
      cos = _useState4[0],
      setCos = _useState4[1];

  var percentages = useMemo(function () {
    return country.getPercentages(cos);
  }, [cos, country]);
  useEffect(function () {
    if (kartta.current) {
      country.colorize(cos);
    }
  }, [cos, country]);
  var isCountryActive = useMemo(function () {
    var percentagesArray = values(percentages);
    return sum(percentagesArray) / percentagesArray.length === 100;
  }, [percentages]);
  var isCountryDeactive = useMemo(function () {
    return sum(values(percentages)) === 0;
  }, [percentages]);
  useEffect(function () {
    setCos(changeObjectsByProvince);
  }, [changeObjectsByProvince]);
  var provinceChanges = useMemo(function () {
    return provinceId && cos[provinceId] ? cos[provinceId] : [];
  }, [cos, provinceId]);
  var provinceCategories = useMemo(function () {
    var result = find(propEq("formId", provinceId), categories);
    return [result].filter(Boolean);
  }, [categories, provinceId]);
  useEffect(function () {
    var finland = am4core.create("finland_map", am4maps.MapChart);
    finland.geodata = am4geodata_finland; // Set projection

    finland.projection = new am4maps.projections.Miller();
    finland.geodataNames = am4geodata_lang_FI; // kartta.current.responsive.enabled = true;

    kartta.current = finland;
    return function cancel() {
      kartta.current.dispose();
    };
  }, []);
  useEffect(function () {
    if (kartta.current.series.length === 0) {
      // Create map polygon series
      polygonSeries.current = kartta.current.series.push(new am4maps.MapPolygonSeries()); // Make map load polygon (like country names) data from GeoJSON

      polygonSeries.current.useGeodata = true; // Add expectancy data

      polygonSeries.current.events.on("beforedatavalidated", function (ev) {
        var source = ev.target.data;

        if (source.maybe) {
          ev.target.data = source.maybe.here.values;
        }
      });
      polygonSeries.current.events.on("inited", function (ev) {
        forEachObjIndexed(function (instance) {
          instance.setMap(kartta.current);
          instance.setPolygonSeries(polygonSeries.current);
          instance.colorize(cos[instance.getId()]);
        }, provinceInstances);
      }); // Configure series

      polygonTemplate.current = polygonSeries.current.mapPolygons.template;
      polygonTemplate.current.tooltipText = "{name}";
      polygonTemplate.current.fill = am4core.color("#dadada"); // Create active state

      var activeState = polygonTemplate.current.states.create("active");
      activeState.properties.stroke = am4core.color("#367B25");
      polygonTemplate.current.events.on("hit", function (e) {
        if (e.target.dataItem.dataContext.id !== "FI-01") {
          activePolygon.current = e.target; // FI-01 = Ahvenanmaa

          setProvinceId(e.target.dataItem.dataContext.id);
        }
      });
    }
  }, [categories, cos, provinceInstances]);
  var updateChangeObjects = useCallback(function (payload, _provinceId) {
    var nextChangeObjects = [];
    var nextProvinceChanges = uniq(payload.changes);

    if (nextProvinceChanges.length) {
      nextChangeObjects = assoc(_provinceId || provinceId, nextProvinceChanges, cos);
    } else {
      nextChangeObjects = dissoc(_provinceId || provinceId, cos);
    }

    if (!equals(cos, nextChangeObjects)) {
      setCos(nextChangeObjects);
    }
  }, [provinceId, cos]);

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedLocations = _useState6[0],
      setSelectedLocations = _useState6[1];

  useEffect(function () {
    var shouldBeSelected = filter(function (location) {
      var provinceInstance = provinceInstances[location.provinceKey];

      if (provinceInstance) {
        var areAllMunicipalitiesActive = provinceInstance.areAllMunicipalitiesActive(cos[location.provinceKey]);

        if (location.isKunta) {
          return !areAllMunicipalitiesActive && provinceInstance.isMunicipalityActive(location.value, cos[location.provinceKey]);
        } else {
          return areAllMunicipalitiesActive && provinceInstance.isActive(cos[location.provinceKey]);
        }
      }

      return true;
    }, selectedLocations); // Selected by default

    var selectedByDefault = flatten(map(function (province) {
      var provinceInstance = provinceInstances[province.anchor];

      if (provinceInstance) {
        var activeMunicipalities = provinceInstance.getActiveMunicipalities(cos[province.anchor]);
        var areAllMunicipalitiesActive = provinceInstance.areAllMunicipalitiesActive(cos[province.anchor], activeMunicipalities);

        if (areAllMunicipalitiesActive) {
          return {
            label: province.components[0].properties.title,
            value: province.components[0].properties.name,
            provinceKey: province.anchor,
            isKunta: false
          };
        } else {
          return map(function (municipality) {
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
    }, categories).filter(Boolean));
    var locationsCombined = uniq(flatten([shouldBeSelected, selectedByDefault]));
    previousSelection.current = locationsCombined;

    if (!equals(selectedLocations, locationsCombined)) {
      setSelectedLocations(locationsCombined);
    }
  }, [baseAnchor, categories, cos, provinceInstances, selectedLocations]);
  var locale = "FI";
  var locations = useMemo(function () {
    function getValittavissaOlevat(options, isKunta) {
      return map(function (option) {
        var okToList = true;
        var provinceKey = "";
        var kuntaMapping = null;
        var metadata = find(propEq("kieli", locale), option.metadata);

        if (isKunta) {
          kuntaMapping = find(propEq("kuntaKoodiarvo", option.koodiArvo), kuntaProvinceMapping);

          if (kuntaMapping) {
            provinceKey = kuntaMapping.maakuntaKey;
            var provinceInstance = provinceInstances[provinceKey];
            var isProvinceActive = provinceInstance ? provinceInstance.isActive(cos[provinceKey]) : false;
            okToList = !isProvinceActive || !provinceInstance.isMunicipalityActive(option.koodiArvo, cos[provinceKey]);
          }
        } else {
          provinceKey = mapping[option.koodiArvo];
          var _provinceInstance = provinceInstances[provinceKey];

          if (_provinceInstance) {
            var areAllMunicipalitiesActive = _provinceInstance ? _provinceInstance.areAllMunicipalitiesActive(cos[provinceKey]) : false;
            okToList = !areAllMunicipalitiesActive;
          } else {
            okToList = false;
          }
        }

        return okToList ? {
          label: metadata.nimi,
          value: option.koodiArvo,
          provinceKey: provinceKey,
          isKunta: isKunta
        } : null;
      }, options).filter(Boolean);
    }

    var valittavissaOlevat = {
      kunnat: getValittavissaOlevat(municipalities, true, selectedLocations),
      maakunnat: getValittavissaOlevat(provincesWithoutMunicipalities, false)
    };
    return concat(valittavissaOlevat.kunnat, valittavissaOlevat.maakunnat);
  }, [cos, municipalities, provinceInstances, provincesWithoutMunicipalities, selectedLocations]);
  var onAutocompleteChanges = useCallback(
  /**
   * The idea of this callback function is to update the list of
   * change objects. By doing so the map (Finland with provinces) and
   * the categorized lists related to it will be updated. The array of
   * change objects is the single point of changes. The content of
   * the autocomplete field will be updated based on it after this
   * function has been run.
   */
  function (payload, values) {
    var currentSel = values.value || [];
    var prevSel = previousSelection.current;
    /**
     * Items to deactivate is calculated by comparing the old value of the
     * autocomplete field to its current value.
     * DifferenceWith returns an array when it gets two arrays as
     * parameters. In this use case the length of returned array
     * should always be 1 because this callback function will be run on
     * every change occurring in the autocomplete field.
     */

    var itemsToDeactivate = differenceWith(function (x, y) {
      return x.value === y.value;
    }, prevSel || [], currentSel);
    /**
     * Current selection (currentSel) includes all the selected items.
     * The items are in the autocomplete field. The most recent one
     * is what interests us.
     */

    var latestSelection = last(currentSel);
    /**
     * Every item can provide a providence id. Depending of the use case
     * it will be fetched from the removed item or by using the latest
     * selection.
     */

    var provinceId = itemsToDeactivate.length ? itemsToDeactivate[0].provinceKey : latestSelection.provinceKey;
    /**
     * Province instance can easily be picked up from the object of
     * province instances. The object has been formed before entering
     * the edit view (Modify.js).
     */

    var provinceInstance = provinceInstances[provinceId];
    /**
     * Value is koodiarvo or some other identifier of a province or a
     * municipality.
     */

    var value = itemsToDeactivate.length ? itemsToDeactivate[0].value : latestSelection.value;
    /**
     * The target item is either a province or a municipality.
     */

    var isMunicipality = !!find(propEq("kuntaKoodiarvo", value), kuntaProvinceMapping);
    /**
     * This callback function handles and makes changes only to the current
     * province and its municipalities.
     */

    var _changeObjects = cos[provinceId] || [];

    if (itemsToDeactivate.length) {
      /**********************************************
       * DEACTIVATION OF PROVINCES AND MUNICIPALITIES
       **********************************************/
      if (isMunicipality) {
        /********************************
         * DEACTIVATION OF A MUNICIPALITY
         ********************************/
        // removeMunicipality deactivate the province when needed
        _changeObjects = provinceInstance.removeMunicipality(value, _changeObjects);
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
      //  const activeMunicipalities = provinceInstance.getActiveMunicipalities(
      //   cos[provinceId]
      // );
      if (isMunicipality) {
        /********************************
         * ACTIVATION OF A MUNICIPALITY
         ********************************/
        // activateMunicipality activate the province when needed
        _changeObjects = provinceInstance.activateMunicipality(value, _changeObjects);
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
  }, [cos, provinceInstances]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("fieldset", {
    className: "p-4 bg-white border-t border-r border-l border-gray-300"
  }, /*#__PURE__*/React.createElement("legend", null, localizations.quickFilter), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement(RadioButtonWithLabel, {
    payload: {
      anchor: "koko-maa"
    },
    isChecked: isCountryActive,
    onChanges: function onChanges() {
      setCos(country.activate(cos));
    },
    value: "1"
  }, localizations.wholeCountryWithoutAhvenanmaa), /*#__PURE__*/React.createElement(RadioButtonWithLabel, {
    payload: {
      anchor: "ei-alueita"
    },
    isChecked: isCountryDeactive,
    onChanges: function onChanges() {
      setCos(country.deactivate(cos));
    },
    value: "0"
  }, localizations.areaOfActionIsUndefined))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(Autocomplete, {
    minChars: 1,
    name: "maakunnat-ja-kunnat-filter",
    options: locations,
    isSearch: true,
    callback: onAutocompleteChanges,
    value: selectedLocations
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white overflow-auto p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 flex"
  }, /*#__PURE__*/React.createElement("div", {
    id: "finland_map",
    className: "w-2/5",
    style: {
      height: "500px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "w-3/5"
  }, provinceCategories.length > 0 ? /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: baseAnchor,
    categories: provinceCategories,
    changes: provinceChanges,
    onUpdate: updateChangeObjects
  }) : null)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/React.createElement(SimpleButton, {
    variant: "outlined",
    onClick: function onClick() {
      return onClose();
    },
    text: localizations.cancel
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SimpleButton, {
    onClick: function onClick() {
      return onClose(cos);
    },
    text: localizations.accept
  })))));
}, function (cp, np) {
  return isEqual(cp.categories, np.categories) && isEqual(cp.changeObjectsByProvince, np.changeObjectsByProvince);
});
export default Modify;