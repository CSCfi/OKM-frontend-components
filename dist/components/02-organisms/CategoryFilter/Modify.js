import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import CategorizedListRoot from "../CategorizedListRoot";
import Autocomplete from "../Autocomplete";
import { assoc, equals, filter, find, map, propEq, dissoc, concat, flatten, uniq, last, differenceWith, append, forEachObjIndexed, not, compose, includes } from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_finland from "@amcharts/amcharts4-geodata/finlandHigh";
import am4geodata_lang_FI from "@amcharts/amcharts4-geodata/lang/FI";
import kunnat from "./storydata/kunnat";
import maakunnat from "./storydata/maakunnat";
import kuntaProvinceMapping from "./storydata/kuntaProvinceMapping";
import { Province } from "./province";
import SimpleButton from "../../00-atoms/SimpleButton";
import { getAnchorPart } from "../../../utils/common";
import { getRemovalChangeObj, getAdditionChangeObj } from "./kunta-utils";
import { getAnchor as getKuntaAnchor } from "./kunta-utils";
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
      _ref$provinceInstance = _ref.provinceInstances,
      provinceInstances = _ref$provinceInstance === void 0 ? {} : _ref$provinceInstance,
      onChanges = _ref.onChanges,
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

  var provinceChanges = useMemo(function () {
    return provinceId && cos[provinceId] ? cos[provinceId] : [];
  }, [cos, provinceId]);
  var provinceCategories = useMemo(function () {
    var result = find(propEq("formId", provinceId), categories);
    return [result].filter(Boolean);
  }, [categories, provinceId]);
  useEffect(function () {
    onChanges(cos);
  }, [cos, onChanges]);
  useEffect(function () {
    kartta.current = am4core.create("finland_map", am4maps.MapChart);
    kartta.current.geodata = am4geodata_finland; // Set projection

    kartta.current.projection = new am4maps.projections.Miller();
    kartta.current.geodataNames = am4geodata_lang_FI; // kartta.current.responsive.enabled = true;
  }, []);
  useEffect(function () {
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
        instance.colorize(changeObjectsByProvince[instance.getId()]);
      }, provinceInstances);
    }); // Configure series

    polygonTemplate.current = polygonSeries.current.mapPolygons.template;
    polygonTemplate.current.tooltipText = "{name}";
    polygonTemplate.current.fill = am4core.color("#dadada"); // Create active state

    var activeState = polygonTemplate.current.states.create("active");
    activeState.properties.stroke = am4core.color("#367B25");
    polygonTemplate.current.events.on("hit", function (e) {
      activePolygon.current = e.target;
      setProvinceId(e.target.dataItem.dataContext.id);
    });
    return function cancel() {
      kartta.current.dispose();
    };
  }, [categories, changeObjectsByProvince, provinceInstances]);
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
  /**
   * Updates the color and percentage of selected province.
   */

  useEffect(function () {
    if (provinceId) {
      var provinceInstance = provinceInstances[provinceId];

      if (!provinceInstance) {
        provinceInstance = new Province(provinceId, kartta.current, find(propEq("anchor", provinceId), categories), polygonSeries.current);
        provinceInstances[provinceId] = provinceInstance;
      }

      provinceInstance.colorize(provinceChanges);
    }
  }, [categories, provinceId, provinceInstances, provinceChanges]);

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
          return !areAllMunicipalitiesActive && provinceInstance.isKuntaActive(location.value, baseAnchor, cos[location.provinceKey]);
        } else {
          return areAllMunicipalitiesActive && provinceInstance.isActive(baseAnchor, cos[location.provinceKey]);
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
          return map(function (kunta) {
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
            var isProvinceActive = provinceInstance.isActive(baseAnchor, cos[provinceKey]);
            okToList = !isProvinceActive || !provinceInstance.isKuntaActive(option.koodiArvo, baseAnchor, cos[provinceKey]);
          }
        } else {
          provinceKey = mapping[option.koodiArvo];
          var _provinceInstance = provinceInstances[provinceKey];

          if (_provinceInstance) {
            var areAllMunicipalitiesActive = _provinceInstance.areAllMunicipalitiesActive(cos[provinceKey]);

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
      kunnat: getValittavissaOlevat(kunnat, true, selectedLocations),
      maakunnat: getValittavissaOlevat(maakunnat, false)
    };
    return concat(valittavissaOlevat.kunnat, valittavissaOlevat.maakunnat);
  }, [baseAnchor, cos, provinceInstances, selectedLocations]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Autocomplete, {
    minChars: 1,
    name: "filter example",
    options: locations,
    isSearch: true,
    callback: function callback(payload, values) {
      var currentSel = values.value || [];
      var prevSel = previousSelection.current;

      var cmp = function cmp(x, y) {
        return x.value === y.value;
      };

      var itemsToRemove = differenceWith(cmp, prevSel || [], currentSel); // Remvoval

      if (itemsToRemove.length) {
        var _provinceId2 = itemsToRemove[0].provinceKey;
        var provinceInstance = provinceInstances[_provinceId2];
        setProvinceId(_provinceId2);
        var isKunta = !!find(propEq("kuntaKoodiarvo", itemsToRemove[0].value), kuntaProvinceMapping); // const currentProvincePolygon = polygonSeries.current.getPolygonById(
        //   itemsToRemove[0].provinceKey
        // );
        // setProvinceId(currentProvincePolygon.dataItem.dataContext.id);

        if (isKunta) {
          var provinceRemovalChangeObj = null; // Aktiiviset kunnat

          var activeMunicipalities = provinceInstance.getActiveMunicipalities(cos[_provinceId2]);
          /**
           * If there's only one active municipality we are going to
           * deactivate the province.
           **/

          if (activeMunicipalities.length === 1) {
            provinceRemovalChangeObj = provinceInstance.getRemovalChangeObj(baseAnchor);
          }

          if (cos[_provinceId2]) {
            var provinceChangeObjects = filter(function (changeObj) {
              var value = getAnchorPart(changeObj.anchor, 3);
              return value !== itemsToRemove[0].value;
            }, cos[_provinceId2]);
            /**
             * Couldn't remove the municipality. It means that we have
             * to create a new change object.
             **/

            if (provinceChangeObjects && provinceChangeObjects.length === cos[_provinceId2].length) {
              provinceChangeObjects = append(getRemovalChangeObj(baseAnchor, _provinceId2, itemsToRemove[0].value), provinceChangeObjects);
            }

            updateChangeObjects({
              changes: flatten([provinceRemovalChangeObj, provinceChangeObjects].filter(Boolean))
            }, _provinceId2);
          } else {
            updateChangeObjects({
              changes: [provinceRemovalChangeObj, getRemovalChangeObj(baseAnchor, _provinceId2, itemsToRemove[0].value)].filter(Boolean)
            }, _provinceId2);
          }
        } else {
          // Maakunnan poisto
          var nextCos;

          if (cos[itemsToRemove[0].provinceKey]) {
            nextCos = dissoc(_provinceId2, cos);
          } else {
            var province = find(propEq("anchor", _provinceId2), categories);
            nextCos = assoc(_provinceId2, flatten([[provinceInstance.getRemovalChangeObj(baseAnchor)], map(function (kunta) {
              return getRemovalChangeObj(baseAnchor, _provinceId2, kunta.anchor);
            }, province.categories[0].components)]), cos);
          }

          setCos(nextCos);
        }
      } // Addition
      else {
          var latestSelection = last(currentSel);
          var _provinceId3 = latestSelection.provinceKey;

          var _changeObjects = cos[_provinceId3] || [];

          var _provinceInstance2 = provinceInstances[_provinceId3];

          var _activeMunicipalities = _provinceInstance2.getActiveMunicipalities(cos[_provinceId3]);

          var provinceChangeObj = find(propEq("anchor", _provinceInstance2.getAnchor()), _changeObjects);

          var _isKunta = !!find(propEq("kuntaKoodiarvo", latestSelection.value), kuntaProvinceMapping);

          if (_isKunta) {
            var anchor = getKuntaAnchor(baseAnchor, _provinceId3, latestSelection.value);
            var changeObj = find(propEq("anchor", anchor), _changeObjects);

            if (changeObj && !changeObj.properties.isChecked) {
              // Delete change object
              _changeObjects = filter(compose(not, propEq("anchor", anchor)), _changeObjects);
            } else {
              // Create change object
              _changeObjects = append(getAdditionChangeObj(baseAnchor, _provinceId3, latestSelection.label, latestSelection.value), _changeObjects);
            }

            var provinceAnchor = _provinceInstance2.getAnchor();

            if (provinceChangeObj) {
              if (_activeMunicipalities.length === _provinceInstance2.getMunicipalities().length - 1) {
                var originalProvince = _provinceInstance2.initializedAs(); // Delete province's change object


                _changeObjects = filter(compose(not, propEq("anchor", provinceAnchor)), _changeObjects);

                if (!(originalProvince.components[0].properties.isChecked && !originalProvince.components[0].properties.isIndeterminate)) {
                  // Original province isn't valid without a new change object.
                  provinceChangeObj = _provinceInstance2.getAdditionChangeObj(false);
                  _changeObjects = append(provinceChangeObj, _changeObjects);
                }
              }
            } else {
              // Create province's change object
              var _originalProvince = _provinceInstance2.initializedAs();

              if (_activeMunicipalities.length === _provinceInstance2.getMunicipalities().length - 1) {
                if (!(_originalProvince.components[0].properties.isChecked && !_originalProvince.components[0].properties.isIndeterminate)) {
                  // Original province isn't valid without a new change object.
                  provinceChangeObj = _provinceInstance2.getAdditionChangeObj(false);
                  _changeObjects = append(provinceChangeObj, _changeObjects);
                }
              } else {
                if (!(_originalProvince.components[0].properties.isChecked && _originalProvince.components[0].properties.isIndeterminate)) {
                  // Original province isn't valid without a new change object.
                  provinceChangeObj = _provinceInstance2.getAdditionChangeObj(true);
                  _changeObjects = append(provinceChangeObj, _changeObjects);
                }
              }
            }
          } else {
            /**
             * Province and its municipalities have to be active.
             * Let's remove irrelevant change objects first.
             **/
            _changeObjects = filter(function (changeObj) {
              var isRelatedToCurrentProvince = includes(".".concat(_provinceId3, "."), changeObj.anchor);
              return !isRelatedToCurrentProvince || changeObj.properties.isChecked;
            }, _changeObjects); // Activate the selected province and its municipalities.

            _changeObjects = _provinceInstance2.activateFully(_changeObjects);
          }

          updateChangeObjects({
            changes: _changeObjects
          }, latestSelection.provinceKey);
          setProvinceId(latestSelection.provinceKey);
        }

      previousSelection.current = currentSel;
    },
    value: selectedLocations
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border overflow-auto p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mt-12 p-4 flex"
  }, /*#__PURE__*/React.createElement("div", {
    id: "finland_map",
    ref: kartta,
    className: "flex-1",
    style: {
      height: "700px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex-2"
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
      return onClose(changeObjectsByProvince);
    },
    text: "Peruuta"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SimpleButton, {
    onClick: function onClick() {
      return onClose(cos);
    },
    text: "Hyväksy"
  })))));
});
export default Modify;