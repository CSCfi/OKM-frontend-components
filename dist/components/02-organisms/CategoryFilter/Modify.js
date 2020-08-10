import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import CategorizedListRoot from "../CategorizedListRoot";
import Autocomplete from "../Autocomplete";
import { assoc, equals, filter, find, map, propEq, dissoc, concat, flatten, uniq, last, differenceWith, forEachObjIndexed, sum, endsWith, isEmpty, append, pathEq, values, sortBy, prop } from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_finland from "@amcharts/amcharts4-geodata/finlandHigh";
import am4geodata_lang_FI from "@amcharts/amcharts4-geodata/lang/FI";
import kuntaProvinceMapping from "./storydata/kuntaProvinceMapping";
import SimpleButton from "../../00-atoms/SimpleButton";
import { isEqual } from "lodash";
var labelStyles = {
  addition: {
    color: "purple"
  },
  removal: {
    color: "purple",
    textDecoration: "line-through"
  }
};
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
var countyNamesFinnish = {
  "FI-01": "Ahvenanmaa",
  "FI-02": "Etelä-Karjala",
  "FI-03": "Etelä-Pohjanmaa",
  "FI-04": "Etelä-Savo",
  "FI-05": "Kainuu",
  "FI-06": "Kanta-Häme",
  "FI-07": "Keski-Pohjanmaa",
  "FI-08": "Keski-Suomi",
  "FI-09": "Kymenlaakso",
  "FI-10": "Lappi",
  "FI-11": "Pirkanmaa",
  "FI-12": "Pohjanmaa",
  "FI-13": "Pohjois-Karjala",
  "FI-14": "Pohjois-Pohjanmaa",
  "FI-15": "Pohjois-Savo",
  "FI-16": "Päijät-Häme",
  "FI-17": "Satakunta",
  "FI-18": "Uusimaa",
  "FI-19": "Varsinais-Suomi"
};
var countyNamesSwedish = {
  "FI-01": "Åland",
  "FI-02": "Södra Karelen",
  "FI-03": "Södra Österbotten",
  "FI-04": "Södra Savolax",
  "FI-05": "Kajanaland",
  "FI-06": "Egentliga Tavastland",
  "FI-07": "Mellersta Österbotten",
  "FI-08": "Mellersta Finland",
  "FI-09": "Kymmenedalen",
  "FI-10": "Lappland",
  "FI-11": "Birkaland",
  "FI-12": "Österbotten",
  "FI-13": "Norra Karelen",
  "FI-14": "Norra Österbotten",
  "FI-15": "Norra Savolax",
  "FI-16": "Päijänne-Tavastland",
  "FI-17": "Satakunta",
  "FI-18": "Nyland",
  "FI-19": "Egentliga Finland"
};

var resetCountyNames = function resetCountyNames(mapdata) {
  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "fi";
  mapdata.features.forEach(function (feature) {
    feature.properties.name = locale === "sv" ? countyNamesSwedish[feature.id] : countyNamesFinnish[feature.id];
  });
  return mapdata;
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
      _ref$quickFilterChang = _ref.quickFilterChangeObjects,
      quickFilterChangeObjects = _ref$quickFilterChang === void 0 ? [] : _ref$quickFilterChang,
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

  var _useState3 = useState(quickFilterChangeObjects),
      _useState4 = _slicedToArray(_useState3, 2),
      quickFilterChanges = _useState4[0],
      setQuickFilterChanges = _useState4[1];

  var _useState5 = useState(changeObjectsByProvince),
      _useState6 = _slicedToArray(_useState5, 2),
      cos = _useState6[0],
      setCos = _useState6[1];

  var isCountryActiveByDefault = useMemo(function () {
    var percentagesArray = values(country.getPercentages());
    return sum(percentagesArray) / percentagesArray.length === 100;
  }, [country]);
  var isCountryDeactiveByDefault = useMemo(function () {
    var percentagesArray = values(country.getPercentages());
    return sum(percentagesArray) === 0;
  }, [country]);
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
    var anchor = "".concat(baseAnchor, "-radios.quick-filters.koko-maa");
    var changeObj = find(propEq("anchor", anchor), quickFilterChanges);

    if (isCountryActive && !changeObj && !isEmpty(cos) && !isCountryActiveByDefault) {
      setQuickFilterChanges(append({
        anchor: anchor,
        properties: {
          isChecked: true
        }
      }, quickFilterChanges));
    }
  }, [baseAnchor, cos, isCountryActive, isCountryActiveByDefault, quickFilterChanges]);
  useEffect(function () {
    var anchor = "".concat(baseAnchor, "-radios.quick-filters.ei-alueita");
    var changeObj = find(propEq("anchor", anchor), quickFilterChanges);

    if (isCountryDeactive && !changeObj && !isEmpty(cos) && !isCountryDeactiveByDefault) {
      setQuickFilterChanges(append({
        anchor: anchor,
        properties: {
          isChecked: true
        }
      }, quickFilterChanges));
    }
  }, [cos, baseAnchor, isCountryDeactive, isCountryDeactiveByDefault, quickFilterChanges]);
  useEffect(function () {
    if (!isCountryActive && !isCountryDeactive && quickFilterChanges.length > 0) {
      var changeObjects = filter(function (changeObj) {
        return !changeObj.properties.isChecked;
      }, quickFilterChanges);

      if (!equals(changeObjects, quickFilterChanges)) {
        setQuickFilterChanges(changeObjects);
      }
    }
  }, [isCountryActive, isCountryDeactive, quickFilterChanges]);
  useEffect(function () {
    var anchor = "".concat(baseAnchor, "-radios.quick-filters.ei-alueita");
    var changeObj = find(propEq("anchor", anchor), quickFilterChanges);

    if (!isCountryDeactive && isCountryDeactiveByDefault && !changeObj) {
      setQuickFilterChanges([{
        anchor: anchor,
        properties: {
          isChecked: false
        }
      }]);
    }
  }, [baseAnchor, isCountryDeactive, isCountryDeactiveByDefault, quickFilterChanges]);
  useEffect(function () {
    if (isCountryDeactive) {
      var anchor = "".concat(baseAnchor, "-radios.quick-filters.ei-alueita");
      var changeObj = find(propEq("anchor", anchor), quickFilterChanges);

      if (isCountryDeactiveByDefault && changeObj) {
        var nextQuickFilterChanges = filter(function (_changeObj) {
          return _changeObj.anchor !== changeObj.anchor;
        }, quickFilterChanges);
        setQuickFilterChanges(nextQuickFilterChanges);
      }
    }
  }, [baseAnchor, isCountryDeactive, isCountryDeactiveByDefault, quickFilterChanges]);
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
    finland.geodata = resetCountyNames(am4geodata_finland); // Set projection

    finland.projection = new am4maps.projections.Mercator();
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

  var _useState7 = useState([]),
      _useState8 = _slicedToArray(_useState7, 2),
      selectedLocations = _useState8[0],
      setSelectedLocations = _useState8[1];

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
      setSelectedLocations(sortBy(prop("label"), locationsCombined));
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
  function (payload, _values) {
    var currentSel = _values.value || [];
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
     * If there isn't an item to deactivate and the latestSelection is
     * missing too then it's time to stop immediately.
     */

    if (!itemsToDeactivate.length && !latestSelection) {
      return true;
    }
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
    var nextChanges = assoc(provinceId, _changeObjects, cos);
    var hasChanges = flatten(values(nextChanges)).length > 0;
    setCos(hasChanges ? nextChanges : []);
  }, [cos, provinceInstances]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("fieldset", {
    className: "p-4 bg-white border-t border-r border-l border-gray-300"
  }, /*#__PURE__*/React.createElement("legend", null, localizations.quickFilter), /*#__PURE__*/React.createElement("div", {
    className: "flex"
  }, /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: "".concat(baseAnchor, "-radios"),
    categories: [{
      anchor: "quick-filters",
      components: [{
        anchor: "koko-maa",
        name: "RadioButtonWithLabel",
        properties: {
          forChangeObject: {
            koodiarvo: "FI1"
          },
          isChecked: isCountryActive,
          labelStyles: _objectSpread({}, labelStyles, {
            custom: {
              fontWeight: isCountryActiveByDefault ? 600 : "initial"
            }
          }),
          title: localizations.wholeCountryWithoutAhvenanmaa,
          value: "1"
        }
      }, {
        anchor: "ei-alueita",
        name: "RadioButtonWithLabel",
        properties: {
          forChangeObject: {
            koodiarvo: "FI2"
          },
          isChecked: isCountryDeactive,
          labelStyles: _objectSpread({}, labelStyles, {
            custom: {
              fontWeight: isCountryDeactiveByDefault ? 600 : "initial"
            }
          }),
          title: localizations.areaOfActionIsUndefined,
          value: "0"
        }
      }]
    }],
    changes: quickFilterChanges,
    onUpdate: function onUpdate(payload) {
      var changes = payload.changes;
      var nextChanges = null;
      var activeChange = find(pathEq(["properties", "isChecked"], true), payload.changes);

      if (endsWith("ei-alueita", activeChange.anchor)) {
        nextChanges = country.deactivate(cos);
        changes = isCountryDeactiveByDefault ? [] : changes;
      } else if (endsWith("koko-maa", activeChange.anchor)) {
        nextChanges = country.activate(cos);
        changes = isCountryActiveByDefault ? [] : changes;
      }

      setCos(nextChanges);
      setQuickFilterChanges(changes);
      setProvinceId(null);
    }
  }))), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(Autocomplete, {
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
    onUpdate: updateChangeObjects,
    uncheckParentWithoutActiveChildNodes: true
  }) : null)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/React.createElement(SimpleButton, {
    variant: "outlined",
    onClick: function onClick() {
      return onClose(quickFilterChanges);
    },
    text: localizations.cancel
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SimpleButton, {
    onClick: function onClick() {
      return onClose(quickFilterChanges, cos);
    },
    text: localizations.accept
  })))));
}, function (cp, np) {
  return isEqual(cp.categories, np.categories) && isEqual(cp.changeObjectsByProvince, np.changeObjectsByProvince);
});
export default Modify;