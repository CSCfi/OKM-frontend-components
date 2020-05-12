import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState, useEffect, useRef } from "react";
import CategorizedListRoot from "../CategorizedListRoot";
import Input from "../../00-atoms/Input";
import { getReducedStructure, getChangeObjByAnchor } from "../CategorizedListRoot/utils";
import { assoc, dissocPath, equals, filter, find, includes, isEmpty, map // prop,
, propEq, startsWith, toLower } from "ramda"; // import { Tabs, Tab } from "@material-ui/core";
// import { withStyles } from "@material-ui/styles";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_finland from "@amcharts/amcharts4-geodata/finlandHigh";
import am4geodata_lang_FI from "@amcharts/amcharts4-geodata/lang/FI"; // const OivaTab = withStyles(theme => ({
//   root: {
//     minWidth: 0,
//     textTransform: "none",
//     color: "#333 !important",
//     fontWeight: theme.typography.fontWeightRegular,
//     fontSize: theme.typography.pxToRem(15),
//     padding: 0,
//     marginRight: "2rem",
//     marginLeft: "0.3em",
//     marginTop: "0.3em",
//     "&:focus": {
//       outline: "0.2rem solid #d1d1d1"
//     }
//   }
// }))(props => <Tab {...props} />);
// const OivaTabs = withStyles(() => ({
//   root: {},
//   indicator: {
//     display: "flex",
//     justifyContent: "center",
//     backgroundColor: "transparent",
//     height: "0.3rem !important",
//     "& > div": {
//       width: "100%",
//       backgroundColor: "#4C7A61"
//     }
//   }
// }))(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

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

  var maakuntaCategories = useMemo(function () {
    var result = find(propEq("formId", maakuntaId), categories);
    console.info(maakuntaId, result);
    return [result].filter(Boolean);
  }, [categories, maakuntaId]);
  var ids = useMemo(function () {
    return map(function (category) {
      return {
        id: category.formId,
        title: category.components[0].properties.title
      };
    }, categories);
  }, [categories]);
  var testi = useRef(null);
  var reducedStructure = useMemo(function () {
    return getReducedStructure(categories);
  }, [categories]);

  var _useState3 = useState(changeObjects),
      _useState4 = _slicedToArray(_useState3, 2),
      filteredChangeObjects = _useState4[0],
      setFilteredChangeObjects = _useState4[1];

  var labelSeries = useRef(null);
  var polygonSeries = useRef(null);
  var kartta = useRef(null);
  useEffect(function () {
    kartta.current = am4core.create("finland_map", am4maps.MapChart);
    kartta.current.geodata = am4geodata_finland; // Set projection

    kartta.current.projection = new am4maps.projections.Miller();
    kartta.current.geodataNames = am4geodata_lang_FI; // Create map polygon series

    polygonSeries.current = kartta.current.series.push(new am4maps.MapPolygonSeries()); // Make map load polygon (like country names) data from GeoJSON

    polygonSeries.current.useGeodata = true; // Add heat rule

    polygonSeries.current.heatRules.push({
      property: "fill",
      target: polygonSeries.current.mapPolygons.template,
      min: am4core.color("#E7E7B9"),
      max: am4core.color("#109F52")
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

    polygonTemplate.events.on("hit", function (ev) {
      // ev.target.series.chart.zoomToMapObject(ev.target);
      console.log(ev.target.dataItem.dataContext);
      setMaakuntaId(ev.target.dataItem.dataContext.id);
    }); // Configure label series

    labelSeries.current = kartta.current.series.push(new am4maps.MapImageSeries());
    var labelTemplate = labelSeries.current.mapImages.template.createChild(am4core.Label);
    labelTemplate.horizontalCenter = "middle";
    labelTemplate.verticalCenter = "middle";
    labelTemplate.fontSize = 12;
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

    polygonSeries.current.events.on("hit", function (e) {
      console.info(e.target);
    }); // Create hover state and set alternative fill color

    var hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");
    return function cancel() {
      kartta.current.dispose();
    };
  }, [ids]);
  useEffect(function () {
    var polygonSerie = find(propEq("id", maakuntaId), polygonSeries.current.data);
    var valittujaKuntia = filter(function (changeObj) {
      var isRelevant = includes(".".concat(maakuntaId, "."), changeObj.anchor);
      return isRelevant;
    }, filteredChangeObjects);

    if (valittujaKuntia.length > 0) {
      polygonSerie = assoc("value", valittujaKuntia.length, polygonSerie);
    }

    var kunnatVareissa = map(function (kunta) {
      return kunta.id === polygonSerie.id ? polygonSerie : kunta;
    }, polygonSeries.current.data);

    if (polygonSeries.current.data.length) {
      polygonSeries.current.data = {
        something: "Useless",
        maybe: {
          here: {
            values: kunnatVareissa
          }
        }
      };
    } // for (var i = 0; i < ids.length; i++) {
    //   console.info(polygonSeries);
    //   var polygon = polygonSeries.current.getPolygonById(ids[i]);
    //   if (polygon) {
    //     console.info(polygon);
    //     var label = labelSeries.current.mapImages.create();
    //     label.latitude = polygon.visualLatitude;
    //     label.longitude = polygon.visualLongitude;
    //     label.children.getIndex(0).text = filteredChangeObjects.length;
    //   }
    // }

  }, [filteredChangeObjects, ids, maakuntaId, reducedStructure]);

  var _useState5 = useState("hakutulokset"),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedTab = _useState6[0],
      setSelectedTab = _useState6[1];

  var filterCategories = useCallback(function (payload, valueObj) {
    var changeObjectsAfterFiltering = map(function (component) {
      var loweredTitle = toLower(component.properties.title);
      var fullAnchor = "".concat(anchor, ".").concat(component.fullAnchor);
      var changeObj = getChangeObjByAnchor(fullAnchor, filteredChangeObjects);

      if (!startsWith(toLower(valueObj.value), loweredTitle)) {
        if (!changeObj) {
          changeObj = {
            properties: {}
          };
        }

        changeObj.anchor = fullAnchor;
        changeObj.properties.isVisible = false;
      } else {
        if (changeObj && changeObj.properties.isVisible === false) {
          changeObj = dissocPath(["properties", "isVisible"], changeObj);
          changeObj = isEmpty(changeObj.properties) ? null : changeObj;
        }
      }

      return changeObj;
    }, reducedStructure).filter(Boolean);

    if (JSON.stringify(filteredChangeObjects) !== JSON.stringify(changeObjectsAfterFiltering)) {
      setFilteredChangeObjects(changeObjectsAfterFiltering);
    } else {
      console.warn("No changes!");
    }

    return onChanges(_objectSpread(_objectSpread({}, payload), {}, {
      changes: changeObjectsAfterFiltering
    }));
  }, [anchor, filteredChangeObjects, onChanges, reducedStructure]);
  var updateChangeObjects = useCallback(function (payload) {
    console.info(payload, filteredChangeObjects, maakuntaCategories, testi.current);

    if (!equals(filteredChangeObjects, payload.changes)) {
      setFilteredChangeObjects(payload.changes);
    }
  }, [filteredChangeObjects, maakuntaCategories]);
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
    className: "".concat(selectedTab !== "hakutulokset" ? "hidden" : "", " mt-12 p-4 flex")
  }, /*#__PURE__*/React.createElement("div", {
    id: "finland_map",
    className: "flex-1",
    style: {
      height: "700px"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "w-1/2"
  }, maakuntaCategories.length > 0 ? /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: anchor,
    categories: maakuntaCategories,
    changes: filteredChangeObjects,
    onUpdate: updateChangeObjects
  }) : null)), /*#__PURE__*/React.createElement("div", {
    className: "".concat(selectedTab !== "valitut" ? "hidden" : "", " mt-16 p-4")
  }, /*#__PURE__*/React.createElement("h2", null, "Toiminta-alue jatkossa:"))));
});
export default CategoryFilter;