import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import CategorizedListRoot from "../CategorizedListRoot";
import Autocomplete from "../Autocomplete";
import { assoc, equals, filter, find, includes, map, propEq, dissoc, concat, flatten, values, uniq, last, differenceWith, mapObjIndexed, keys } from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_finland from "@amcharts/amcharts4-geodata/finlandHigh";
import am4geodata_lang_FI from "@amcharts/amcharts4-geodata/lang/FI";
import { getAnchorPart } from "../../../utils/common";
import kunnat from "./storydata/kunnat";
import maakunnat from "./storydata/maakunnat";
import kuntaMaakuntaMapping from "./storydata/kuntaMaakuntaMapping";
import { Maakunta } from "./maakunta";
import SimpleButton from "../../00-atoms/SimpleButton";
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
      _ref$changeObjectsByM = _ref.changeObjectsByMaakunta,
      changeObjectsByMaakunta = _ref$changeObjectsByM === void 0 ? {} : _ref$changeObjectsByM,
      onChanges = _ref.onChanges,
      onClose = _ref.onClose;
  console.info("Muutosopbjektit: ", changeObjectsByMaakunta);
  var polygonSeries = useRef(null);
  var kartta = useRef(null);
  var activePolygon = useRef(null);
  var previousSelection = useRef([]);
  var polygonTemplate = useRef(null);
  var maakuntaInstances = useRef([]);

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      maakuntaId = _useState2[0],
      setMaakuntaId = _useState2[1];

  var _useState3 = useState(changeObjectsByMaakunta),
      _useState4 = _slicedToArray(_useState3, 2),
      cos = _useState4[0],
      setCos = _useState4[1];

  var maakuntaChanges = useMemo(function () {
    return maakuntaId && cos[maakuntaId] ? cos[maakuntaId] : [];
  }, [cos, maakuntaId]);
  var maakuntaCategories = useMemo(function () {
    var result = find(propEq("formId", maakuntaId), categories);
    return [result].filter(Boolean);
  }, [categories, maakuntaId]);
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
      maakuntaInstances.current = mapObjIndexed(function (changeObjects, id) {
        console.info("Muutosobjektit maakunnittain: ", changeObjectsByMaakunta);
        var maakuntaInstance = new Maakunta(id, kartta.current, find(propEq("anchor", id), categories), polygonSeries.current);
        maakuntaInstance.colorize(changeObjects);
        return maakuntaInstance;
      }, changeObjectsByMaakunta);
    }); // Configure series

    polygonTemplate.current = polygonSeries.current.mapPolygons.template;
    polygonTemplate.current.tooltipText = "{name}";
    polygonTemplate.current.fill = am4core.color("#dadada"); // Create active state

    var activeState = polygonTemplate.current.states.create("active");
    activeState.properties.stroke = am4core.color("#367B25");
    polygonTemplate.current.events.on("hit", function (e) {
      console.info(maakuntaInstances.current); // maakuntaInstances.current["FI-10"].colorize(0.5);

      activePolygon.current = e.target;
      setMaakuntaId(e.target.dataItem.dataContext.id);
    });
    return function cancel() {
      kartta.current.dispose();
    };
  }, [categories, changeObjectsByMaakunta]);
  /**
   * Updates the color and percentage of selected maakunta.
   */

  useEffect(function () {
    if (maakuntaId) {
      var maakuntaInstance = maakuntaInstances.current[maakuntaId];

      if (!maakuntaInstance) {
        maakuntaInstance = new Maakunta(maakuntaId, kartta.current, find(propEq("anchor", maakuntaId), categories), polygonSeries.current);
        maakuntaInstances.current[maakuntaId] = maakuntaInstance;
      }

      maakuntaInstance.colorize(maakuntaChanges);
    }
  }, [categories, maakuntaId, maakuntaChanges]);
  var updateChangeObjects = useCallback(function (payload, _maakuntaId) {
    var nextChangeObjects = [];
    var nextMaakuntaChanges = payload.changes.length === 1 ? [] : uniq(payload.changes);

    if (nextMaakuntaChanges.length) {
      nextChangeObjects = assoc(_maakuntaId || maakuntaId, nextMaakuntaChanges, cos);
    } else {
      nextChangeObjects = dissoc(_maakuntaId || maakuntaId, cos);
    }

    if (!equals(cos, nextChangeObjects)) {
      setCos(nextChangeObjects);
    }
  }, [maakuntaId, cos]);

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedLocations = _useState6[0],
      setSelectedLocations = _useState6[1];

  useEffect(function () {
    var shouldBeSelected = filter(function (location) {
      var isKunta = !!find(propEq("kuntaKoodiarvo", location.value), kuntaMaakuntaMapping);
      var category = find(propEq("anchor", location.maakuntaKey), categories);
      var isTheWholeMaakuntaSelected = category && cos[location.maakuntaKey] && cos[location.maakuntaKey].length - 1 === category.categories[0].components.length;
      var anchor = isKunta ? "".concat(baseAnchor, ".").concat(location.maakuntaKey, ".kunnat.").concat(location.value) : "".concat(baseAnchor, ".").concat(location.maakuntaKey, ".").concat(location.value);
      var changeObj = find(propEq("anchor", anchor), cos[location.maakuntaKey] || []);
      return !!changeObj && !isTheWholeMaakuntaSelected || isTheWholeMaakuntaSelected && !isKunta;
    }, selectedLocations);
    var kunnat = flatten(values(map(function (arr) {
      var maakuntaKey = getAnchorPart(arr[0].anchor, 1);
      var maakuntaAnchor = "".concat(baseAnchor, ".").concat(maakuntaKey, ".A");
      var maakuntaChangeObj = find(propEq("anchor", maakuntaAnchor), arr);
      var maakuntaKuntineen = find(propEq("anchor", maakuntaKey), categories);
      var kuntienMaaraMaakunnassa = maakuntaKuntineen.categories[0].components.length;

      if (maakuntaChangeObj && arr.length === kuntienMaaraMaakunnassa + 1) {
        return {
          label: maakuntaChangeObj.properties.metadata.title,
          value: maakuntaChangeObj.properties.metadata.koodiarvo,
          maakuntaKey: maakuntaChangeObj.properties.metadata.maakuntaKey,
          isKunta: false
        };
      } else {
        return map(function (changeObj) {
          if (includes(".kunnat", changeObj.anchor)) {
            return {
              label: changeObj.properties.metadata.title,
              value: changeObj.properties.metadata.koodiarvo,
              maakuntaKey: changeObj.properties.metadata.maakuntaKey,
              isKunta: true
            };
          }

          return null;
        }, arr).filter(Boolean);
      }
    }, cos)));
    var locationsCombined = uniq(concat(kunnat || [], shouldBeSelected || []));
    previousSelection.current = locationsCombined;

    if (!equals(selectedLocations, locationsCombined)) {
      setSelectedLocations(locationsCombined);
    }
  }, [baseAnchor, categories, cos, selectedLocations]);
  var locale = "FI";
  var locations = useMemo(function () {
    function getValittavissaOlevat(options, isKunta, selectedLocations) {
      return map(function (location) {
        var okToList = true;
        var maakuntaKey = "";
        var kuntaMapping = null;
        var metadata = find(propEq("kieli", locale), location.metadata);

        if (isKunta) {
          kuntaMapping = find(propEq("kuntaKoodiarvo", location.koodiArvo), kuntaMaakuntaMapping);

          if (kuntaMapping) {
            maakuntaKey = kuntaMapping.maakuntaKey;
            var maakunta = find(function (l) {
              return l.maakuntaKey === maakuntaKey && l.isKunta === false;
            }, selectedLocations);
            var isMaakuntaSelected = !!maakunta;
            okToList = !isMaakuntaSelected;
          }
        } else {
          maakuntaKey = mapping[location.koodiArvo];
        }

        return okToList ? {
          label: metadata.nimi,
          value: location.koodiArvo,
          maakuntaKey: maakuntaKey,
          isKunta: isKunta
        } : null;
      }, options).filter(Boolean);
    }

    var valittavissaOlevat = {
      kunnat: getValittavissaOlevat(kunnat, true, selectedLocations),
      maakunnat: getValittavissaOlevat(maakunnat, false, selectedLocations)
    };
    return concat(valittavissaOlevat.kunnat, valittavissaOlevat.maakunnat);
  }, [selectedLocations]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Autocomplete, {
    minChars: 1,
    name: "filter example",
    options: locations,
    isSearch: true,
    callback: function callback(payload, values) {
      var prevSel = previousSelection.current;
      /**
       * If there're not any selected items all the change object must
       * be removed.
       */

      if (!values.value) {
        setMaakuntaId(prevSel[0].maakuntaKey);
        setCos({});
      } else {
        var cmp = function cmp(x, y) {
          return x.value === y.value;
        };

        var itemsToRemove = differenceWith(cmp, prevSel || [], values.value);

        if (itemsToRemove.length) {
          setMaakuntaId(itemsToRemove[0].maakuntaKey);
          var isKunta = !!find(propEq("kuntaKoodiarvo", itemsToRemove[0].value), kuntaMaakuntaMapping); // const currentMaakuntaPolygon = polygonSeries.current.getPolygonById(
          //   itemsToRemove[0].maakuntaKey
          // );
          // setMaakuntaId(currentMaakuntaPolygon.dataItem.dataContext.id);

          if (isKunta) {
            var maakuntaChangeObjects = filter(function (changeObj) {
              return changeObj.properties.metadata.koodiarvo !== itemsToRemove[0].value;
            }, cos[itemsToRemove[0].maakuntaKey]);
            updateChangeObjects({
              changes: maakuntaChangeObjects
            }, itemsToRemove[0].maakuntaKey);
          } else {
            // Maakunnan poisto
            var nextCos = dissoc(itemsToRemove[0].maakuntaKey, cos);
            setCos(nextCos);
          }
        } else {
          var latestSelection = last(values.value);
          var changeObjectsWithCurrentMaakuntaKey = cos[latestSelection.maakuntaKey];

          var _isKunta = !!find(propEq("kuntaKoodiarvo", latestSelection.value), kuntaMaakuntaMapping);

          var changeObj = null;
          var maakuntaChangeObj = null;
          var kunnatChangeObjects = [];
          var maakuntaKuntineen = find(propEq("anchor", latestSelection.maakuntaKey), categories);

          if (_isKunta) {
            var anchor = _isKunta ? "".concat(baseAnchor, ".").concat(latestSelection.maakuntaKey, ".kunnat.").concat(latestSelection.value) : "";
            changeObj = {
              anchor: anchor,
              properties: {
                isChecked: true,
                metadata: {
                  title: latestSelection.label,
                  koodiarvo: latestSelection.value,
                  maakuntaKey: latestSelection.maakuntaKey
                }
              }
            }; // If the selected item is kunta we have to activate its maakunta too.

            maakuntaChangeObj = {
              anchor: "".concat(baseAnchor, ".").concat(latestSelection.maakuntaKey, ".A"),
              properties: {
                isChecked: true,
                isIndeterminate: true,
                metadata: {
                  title: maakuntaKuntineen.components[0].properties.forChangeObject.title,
                  koodiarvo: maakuntaKuntineen.components[0].properties.forChangeObject.koodiarvo,
                  maakuntaKey: maakuntaKuntineen.anchor
                }
              }
            };
          } else {
            changeObjectsWithCurrentMaakuntaKey = [];
            changeObj = {
              anchor: "".concat(baseAnchor, ".").concat(latestSelection.maakuntaKey, ".A"),
              properties: {
                isChecked: true,
                isIndeterminate: false,
                metadata: {
                  title: latestSelection.label,
                  koodiarvo: latestSelection.value,
                  maakuntaKey: latestSelection.maakuntaKey
                }
              }
            };

            if (maakuntaKuntineen) {
              kunnatChangeObjects = map(function (kunta) {
                return {
                  anchor: "".concat(baseAnchor, ".").concat(latestSelection.maakuntaKey, ".kunnat.").concat(kunta.anchor),
                  properties: {
                    isChecked: true,
                    metadata: {
                      title: kunta.properties.forChangeObject.title,
                      koodiarvo: kunta.properties.forChangeObject.koodiarvo,
                      maakuntaKey: latestSelection.maakuntaKey
                    }
                  }
                };
              }, maakuntaKuntineen.categories[0].components);
            }
          }

          var changeObjects = uniq(flatten([[changeObj, maakuntaChangeObj].filter(Boolean), changeObjectsWithCurrentMaakuntaKey || [], kunnatChangeObjects]));
          updateChangeObjects({
            changes: changeObjects
          }, latestSelection.maakuntaKey);
          setMaakuntaId(latestSelection.maakuntaKey);
        }
      }

      previousSelection.current = values.value;
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
  }, maakuntaCategories.length > 0 ? /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: baseAnchor,
    categories: maakuntaCategories,
    changes: maakuntaChanges,
    onUpdate: updateChangeObjects
  }) : null)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mr-4"
  }, /*#__PURE__*/React.createElement(SimpleButton, {
    variant: "outlined",
    onClick: function onClick() {
      return onClose(changeObjectsByMaakunta);
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