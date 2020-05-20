import { find, propEq, filter, assoc, dissoc, endsWith, compose, prop, append, map, concat } from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import mix from "./province-utils";
import { getAnchor as getKuntaAnchor } from "./kunta-utils";
import { getAdditionChangeObj as getMunicipalityAdditionChangeObj } from "./kunta-utils";
export function Province(province, baseAnchor) {
  var id = province.anchor;
  var code = province.components[0].properties.code;
  var title = province.components[0].properties.title;
  var kunnatAmount = province.categories[0].components.length;
  var polygonSeries = null;
  var polygon = null;
  var labelSeries = null;
  var kartta = null;
  var labelTemplate;

  function _getAnchor() {
    return "".concat(baseAnchor, ".").concat(id, ".").concat(province.components[0].anchor);
  }

  function _getActiveMunicipalities(changeObjects) {
    return filter(function (kunta) {
      var changeObj = find(compose(endsWith("kunnat.".concat(kunta.anchor)), prop("anchor")), changeObjects);
      return kunta.properties.isChecked && !changeObj || changeObj && changeObj.properties.isChecked;
    }, province.categories[0].components);
  }

  function _getAdditionChangeObj(isIndeterminate) {
    return {
      anchor: _getAnchor(baseAnchor),
      properties: {
        isChecked: true,
        isIndeterminate: isIndeterminate,
        metadata: {
          title: title,
          koodiarvo: code,
          provinceKey: id
        }
      }
    };
  }

  function _getMunicipalities() {
    return province.categories[0].components;
  }

  return {
    activateFully: function activateFully() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      // Activate province
      var provinceAnchor = _getAnchor();

      var provinceChangeObj = find(propEq("anchor", provinceAnchor), changeObjects);
      var provinceObj = province.components[0];

      var municipalities = _getMunicipalities(); // If change object is not valid it must be deleted.


      if (provinceChangeObj) {
        if (!provinceChangeObj.properties.isChecked || provinceChangeObj.properties.isIndeterminate) {
          changeObjects = filter(function (changeObj) {
            return changeObj.anchor !== provinceAnchor;
          }, changeObjects);

          if (!provinceObj.properties.isChecked || provinceObj.properties.isIndeterminate) {
            // New valid change object must be created.
            changeObjects = append(_getAdditionChangeObj(false), changeObjects);
          }
        }
      } // If there isn't change object
      else if (!provinceObj.properties.isChecked || provinceObj.properties.isIndeterminate) {
          // New valid change object must be created.
          changeObjects = append(_getAdditionChangeObj(false), changeObjects);
        } // Activate municipalities


      var municipalityChangeObjects = map(function (municipality) {
        if (!municipality.properties.isChecked) {
          return getMunicipalityAdditionChangeObj(baseAnchor, id, municipality.properties.title, municipality.anchor);
        }
      }, municipalities).filter(Boolean);
      return concat(municipalityChangeObjects, changeObjects);
    },
    areAllMunicipalitiesActive: function areAllMunicipalitiesActive() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var activeMunicipalities = arguments.length > 1 ? arguments[1] : undefined;
      return activeMunicipalities ? activeMunicipalities.length === _getMunicipalities().length : _getActiveMunicipalities(changeObjects).length === _getMunicipalities().length;
    },

    /**
     * Function updates the color and percentage of province.
     */
    colorize: function colorize() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!id || !polygonSeries) return false;
      var polygonSerie = find(propEq("id", id), polygonSeries.data);

      if (polygonSerie) {
        polygonSerie.fill = am4core.color("#ff0000");
      }

      var valitutKunnat = _getActiveMunicipalities(changeObjects);

      var percentage = valitutKunnat.length / kunnatAmount;

      if (kunnatAmount) {
        polygonSerie = assoc("value", percentage, polygonSerie);
      } else {
        polygonSerie = dissoc("value", polygonSerie);
      }

      if (polygon) {
        var fillColor = "#dadada"; // Ahvenanmaa must be hidden.

        if (id === "FI-01") {
          fillColor = "#ffffff";
        } else {
          if (percentage > 0 && percentage < 1) {
            fillColor = mix("#109F52", "#C8DCC3", 1 - percentage);
          } else if (percentage === 1) {
            fillColor = "#109F52";
          }

          labelSeries.disposeChildren();
          var label = labelSeries.mapImages.create();
          label.latitude = polygon.visualLatitude;
          label.longitude = polygon.visualLongitude;
          label.children.getIndex(0).text = "".concat(Math.round(percentage * 100), " %");
        }

        polygon.fill = am4core.color(fillColor);
      }
    },
    getActiveMunicipalities: function getActiveMunicipalities() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return _getActiveMunicipalities(changeObjects);
    },
    getAdditionChangeObj: function getAdditionChangeObj(isIndeterminate) {
      return _getAdditionChangeObj(isIndeterminate);
    },
    getAnchor: function getAnchor() {
      return _getAnchor();
    },
    getCode: function getCode() {
      return code;
    },
    getId: function getId() {
      return id;
    },
    getMunicipalities: function getMunicipalities() {
      return _getMunicipalities();
    },
    getRemovalChangeObj: function getRemovalChangeObj() {
      return {
        anchor: _getAnchor(),
        properties: {
          isChecked: false,
          isIndeterminate: false,
          metadata: {
            provinceKey: id
          }
        }
      };
    },
    getTitle: function getTitle() {
      return title;
    },
    initializedAs: function initializedAs() {
      return province;
    },
    isActive: function isActive() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var changeObj = find(propEq("anchor", _getAnchor()), changeObjects);
      return province.components[0].properties.isChecked && !changeObj || changeObj && changeObj.properties.isChecked;
    },
    isKuntaActive: function isKuntaActive(koodiarvo, baseAnchor) {
      var changeObjects = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      var anchor = getKuntaAnchor(baseAnchor, id, koodiarvo);
      var changeObj = find(propEq("anchor", anchor), changeObjects);
      var kunta = find(propEq("anchor", koodiarvo), province.categories[0].components);
      return kunta.properties.isChecked && !changeObj || changeObj && changeObj.properties.isChecked;
    },
    setMap: function setMap(map) {
      kartta = map; // Configure label series

      labelSeries = kartta.series.push(new am4maps.MapImageSeries());
      labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label);
      labelTemplate.horizontalCenter = "middle";
      labelTemplate.verticalCenter = "middle";
      labelTemplate.fontSize = 14;
      labelTemplate.interactionsEnabled = false;
      labelTemplate.nonScaling = true;
    },
    setPolygonSeries: function setPolygonSeries(_polygonSeries) {
      polygonSeries = _polygonSeries;
      polygon = polygonSeries.getPolygonById(id);
    }
  };
}