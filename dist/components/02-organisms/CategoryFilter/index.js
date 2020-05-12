import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import CategorizedListRoot from "../CategorizedListRoot";
import Input from "../../00-atoms/Input";
import { getReducedStructure, getChangeObjByAnchor } from "../CategorizedListRoot/utils";
import { assoc, compose, dissocPath, equals, filter, find, includes, isEmpty, map, prop, propEq, startsWith, toLower, dissoc } from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_finland from "@amcharts/amcharts4-geodata/finlandHigh";
import am4geodata_lang_FI from "@amcharts/amcharts4-geodata/lang/FI";
import { getAnchorPart } from "../../../utils/common";
var CategoryFilter = React.memo(function (_ref) {
  var _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? "no-anchor-defined" : _ref$anchor,
      _ref$categories = _ref.categories,
      categories = _ref$categories === void 0 ? [] : _ref$categories,
      changeObjects = _ref.changeObjects,
      onChanges = _ref.onChanges;

  var _useState = useState(""),
      _useState2 = _slicedToArray(_useState, 2),
      maakuntaId = _useState2[0],
      setMaakuntaId = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      cos = _useState4[0],
      setCos = _useState4[1];

  var labelSeries = useRef(null);
  var polygonSeries = useRef(null);
  var kartta = useRef(null);
  var activePolygon = useRef(null);
  var maakuntaCategories = useMemo(function () {
    var result = find(propEq("formId", maakuntaId), categories);
    return [result].filter(Boolean);
  }, [categories, maakuntaId]);
  var ids = useMemo(function () {
    return map(function (category) {
      return {
        id: category.formId,
        title: category.components[0].properties.title
      };
    }, categories);
  }, [categories]); // const reducedStructure = useMemo(() => getReducedStructure(categories), [
  //   categories
  // ]);

  var _useState5 = useState(changeObjects),
      _useState6 = _slicedToArray(_useState5, 2),
      filteredChangeObjects = _useState6[0],
      setFilteredChangeObjects = _useState6[1];

  useEffect(function () {
    kartta.current = am4core.create("finland_map", am4maps.MapChart);
    kartta.current.geodata = am4geodata_finland; // Set projection

    kartta.current.projection = new am4maps.projections.Miller();
    kartta.current.geodataNames = am4geodata_lang_FI;

    kartta.current.interactions.keydown = function (e) {
      console.info(e);
    }; // Create map polygon series


    polygonSeries.current = kartta.current.series.push(new am4maps.MapPolygonSeries()); // Make map load polygon (like country names) data from GeoJSON

    polygonSeries.current.useGeodata = true; // Add heat rule

    polygonSeries.current.heatRules.push({
      property: "fill",
      target: polygonSeries.current.mapPolygons.template,
      min: am4core.color("#E7E7B9"),
      max: am4core.color("#109F52") // logarithmic: true

    }); // Add expectancy data

    polygonSeries.current.events.on("beforedatavalidated", function (ev) {
      var source = ev.target.data;

      if (source.maybe) {
        ev.target.data = source.maybe.here.values;
      }
    }); // Configure series

    var polygonTemplate = polygonSeries.current.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#dadada"); // polygonTemplate.stroke = am4core.color("#dddddd");
    // Create hover state and set alternative fill color

    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#dbe1db"); // Create active state

    var activeState = polygonTemplate.states.create("active");
    activeState.properties.stroke = am4core.color("#367B25");
    polygonTemplate.events.on("hit", function (e) {
      activePolygon.current = e.target;
      var label = labelSeries.current.mapImages.create(); // e.target.isActive = !e.target.isActive;
      // ev.target.series.chart.zoomToMapObject(ev.target);
      // console.log(ev.target.dataItem.dataContext);
      // console.info(ev.target.series);
      // ev.target.series.invalidate();
      // ev.target.series.stroke = am4core.color("#00ff00");
      // ev.target.series.fill = am4core.color("#dadada");

      setMaakuntaId(e.target.dataItem.dataContext.id);
    }); // polygonTemplate.events.onAll(function(ev) {
    //   console.log("something happened ", ev);
    // }, this);
    // Configure label series

    labelSeries.current = kartta.current.series.push(new am4maps.MapImageSeries());
    var labelTemplate = labelSeries.current.mapImages.template.createChild(am4core.Label);
    labelTemplate.horizontalCenter = "middle";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fontSize = 16;
    labelTemplate.interactionsEnabled = false;
    labelTemplate.nonScaling = true; // polygonSeries.current.events.on("inited", function() {
    //   console.info(ids);
    //   for (var i = 0; i < ids.length; i++) {
    //     var polygon = polygonSeries.current.getPolygonById(ids[i].id);
    //     if (polygon) {
    //       var label = labelSeries.current.mapImages.create();
    //       // var state = polygon.dataItem.dataContext.id.split("-").pop();
    //       label.latitude = polygon.visualLatitude;
    //       label.longitude = polygon.visualLongitude;
    //       label.children.getIndex(0).text = ids[i].title;
    //     }
    //   }
    // });
    // polygonSeries.current.events.on("hit", function(e) {
    //   setMaakuntaId(ev.target.dataItem.dataContext.id);
    // });

    return function cancel() {
      kartta.current.dispose();
    };
  }, [ids]);
  var kuntiaPerMaakunta = map(function (category) {
    return {
      id: category.anchor,
      amount: category.categories[0].components.length
    };
  }, categories);
  useEffect(function () {
    console.info(kuntiaPerMaakunta);
    var polygonSerie = find(propEq("id", maakuntaId), polygonSeries.current.data);
    var valittujaKuntia = Math.max(filter(function (changeObj) {
      return changeObj.properties.isChecked;
    }, cos[maakuntaId] || []).length - 1, // Maakunta excluded
    0);
    var kuntiaYhteensa = (find(propEq("id", maakuntaId), kuntiaPerMaakunta) || {}).amount;
    console.info(valittujaKuntia, kuntiaYhteensa);

    if (kuntiaYhteensa) {
      if (valittujaKuntia > 0) {
        polygonSerie = assoc("value", valittujaKuntia / kuntiaYhteensa, polygonSerie);
      } else {
        polygonSerie = dissoc("value", polygonSerie);
      }

      var kunnatVareissa = map(function (kunta) {
        return kunta.id === polygonSerie.id ? polygonSerie : kunta;
      }, polygonSeries.current.data);
      console.info(kunnatVareissa);

      if (polygonSeries.current.data.length) {
        polygonSeries.current.data = {
          something: "Useless",
          maybe: {
            here: {
              values: kunnatVareissa
            }
          }
        };
      }
    }

    if (activePolygon.current) {
      labelSeries.current.disposeChildren();
      var label = labelSeries.current.mapImages.create();
      label.latitude = activePolygon.current.visualLatitude;
      label.longitude = activePolygon.current.visualLongitude;
      label.children.getIndex(0).text = "".concat(Math.round(valittujaKuntia / kuntiaYhteensa * 100), " %");
    }
  }, [cos, ids, maakuntaId, kuntiaPerMaakunta]);
  var filterCategories = useCallback(function (payload, valueObj) {// const changeObjectsAfterFiltering = map(component => {
    //   const loweredTitle = toLower(component.properties.title);
    //   const fullAnchor = `${anchor}.${component.fullAnchor}`;
    //   let changeObj = getChangeObjByAnchor(
    //     fullAnchor,
    //     filteredChangeObjects
    //   );
    //   if (!startsWith(toLower(valueObj.value), loweredTitle)) {
    //     if (!changeObj) {
    //       changeObj = { properties: {} };
    //     }
    //     changeObj.anchor = fullAnchor;
    //     changeObj.properties.isVisible = false;
    //   } else {
    //     if (changeObj && changeObj.properties.isVisible === false) {
    //       changeObj = dissocPath(["properties", "isVisible"], changeObj);
    //       changeObj = isEmpty(changeObj.properties) ? null : changeObj;
    //     }
    //   }
    //   return changeObj;
    // }, reducedStructure).filter(Boolean);
    // if (
    //   JSON.stringify(filteredChangeObjects) !==
    //   JSON.stringify(changeObjectsAfterFiltering)
    // ) {
    //   setFilteredChangeObjects(changeObjectsAfterFiltering);
    // } else {
    //   console.warn("No changes!");
    // }
    // return onChanges({ ...payload, changes: changeObjectsAfterFiltering });
  }, [anchor, filteredChangeObjects, onChanges]);
  var updateChangeObjects = useCallback(function (payload) {
    var nextChangeObjects = [];
    nextChangeObjects = assoc(maakuntaId, payload.changes, cos);

    if (!equals(cos, nextChangeObjects)) {
      setCos(nextChangeObjects);
    }
  }, [maakuntaId, cos]);
  var maakuntaChanges = cos[maakuntaId] || [];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
    payload: {},
    onChanges: filterCategories,
    isRequired: true,
    isValid: true,
    label: "Required",
    tooltip: {
      text: "This is info text"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border overflow-auto p-4"
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
    className: "w-1/2"
  }, maakuntaCategories.length > 0 ? /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: anchor,
    categories: maakuntaCategories,
    changes: maakuntaChanges,
    onUpdate: updateChangeObjects
  }) : null))));
});
export default CategoryFilter;