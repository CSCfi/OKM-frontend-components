import { find, propEq, filter, assoc, dissoc, endsWith, compose, prop, append, map, concat, flatten, mapObjIndexed, equals, values, includes, forEach } from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import mix from "./province-utils";
import { getRemovalChangeObj } from "./kunta-utils";
import { getAdditionChangeObj as getMunicipalityAdditionChangeObj } from "./kunta-utils";
import Municipality from "./municipality";
export function Province(province, baseAnchor) {
  var id = province.anchor;
  var code = province.components[0].properties.code;
  var title = province.components[0].properties.title;
  var kunnatAmount = province.categories[0].components.length;
  var municipalityInstances = {};
  forEach(function (municipality) {
    var instance = new Municipality(baseAnchor, municipality);
    municipalityInstances[instance.getKoodiarvo()] = instance;
  }, province.categories[0].components);
  var polygonSeries = null;
  var polygon = null;
  var labelSeries = null;
  var kartta = null;
  var labelTemplate;

  function _getAnchor() {
    return "".concat(baseAnchor, ".").concat(id, ".").concat(province.components[0].anchor);
  }

  function _getActiveMunicipalities() {
    var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return filter(function (municipality) {
      return municipality.isActive(changeObjects);
    }, values(municipalityInstances));
  }

  function _getAdditionChangeObj(isIndeterminate) {
    return {
      anchor: _getAnchor(),
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

  function _getChangeObject() {
    var currentChangeObjProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var targetProperties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var originalProperties = province.components[0].properties;
    var isOriginalOK = !includes(false, values(mapObjIndexed(function (value, key) {
      return equals(originalProperties[key], value) ? true : false;
    }, targetProperties)));
    var isCurrentChangeObjOK = !includes(false, values(mapObjIndexed(function (value, key) {
      return equals(currentChangeObjProps[key], value) ? true : false;
    }, targetProperties)));

    if (isOriginalOK) {
      return null;
    } else {
      var anchor = _getAnchor();

      if (isCurrentChangeObjOK) {
        return {
          anchor: anchor,
          properties: currentChangeObjProps
        };
      } else {
        var changeObj = {
          anchor: anchor,
          properties: Object.assign({}, currentChangeObjProps, targetProperties, {
            metadata: {
              title: title,
              koodiarvo: code,
              provinceKey: id
            }
          })
        };
        return changeObj;
      }
    }
  }

  function _getMunicipalities() {
    return province.categories[0].components;
  }

  function _getRemovalChangeObj() {
    return {
      anchor: _getAnchor(),
      properties: {
        isChecked: false,
        isIndeterminate: false,
        metadata: {
          title: title,
          koodiarvo: code,
          provinceKey: id
        }
      }
    };
  }

  function _isActive() {
    var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var changeObj = find(propEq("anchor", _getAnchor()), changeObjects);
    return province.components[0].properties.isChecked && !changeObj || changeObj && changeObj.properties.isChecked;
  }

  function isIndeterminate() {
    var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var changeObj = find(propEq("anchor", _getAnchor()), changeObjects);
    return province.components[0].properties.isIndeterminate && !changeObj || changeObj && changeObj.properties.isIndeterminate;
  }

  function _isMunicipalityActive(koodiarvo) {
    var changeObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var instance = koodiarvo ? municipalityInstances[koodiarvo] : null;

    if (!instance) {
      console.warn("Couldn't find the municipality instance by koodiarvo", koodiarvo, municipalityInstances);
    }

    return instance ? instance.isActive(changeObjects) : false;
  }

  return {
    activateFully: function activateFully() {
      // Activate province
      var isActiveByDefault = _isActive();

      var isIndeterminateByDefault = isIndeterminate();
      var provinceChangeObj = null;

      if (!isActiveByDefault || isIndeterminateByDefault) {
        provinceChangeObj = _getAdditionChangeObj(false);
      } // Activate municipalities


      var municipalityChangeObjects = map(function (municipality) {
        if (!municipality.properties.isChecked) {
          return !_isMunicipalityActive(municipality.anchor) ? getMunicipalityAdditionChangeObj(baseAnchor, id, municipality.properties.title, municipality.anchor) : null;
        }
      }, _getMunicipalities()).filter(Boolean);
      return concat([provinceChangeObj], municipalityChangeObjects).filter(Boolean);
    },
    activateMunicipality: function activateMunicipality(koodiarvo) {
      var changeObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var municipality = municipalityInstances[koodiarvo];
      var nextChangeObjects = changeObjects;

      if (!municipality) {
        console.warn("Couldn't find a municipality with koodiarvo", koodiarvo);
      } else {
        nextChangeObjects = filter(function (changeObj) {
          return changeObj.anchor !== municipality.getAnchor();
        }, changeObjects);

        var _changeObj = find(propEq("anchor", municipality.getAnchor()), changeObjects) || {};

        var nextChangeObj = municipality.getChangeObject(_changeObj.properties, {
          isChecked: true
        });

        if (nextChangeObj) {
          nextChangeObjects = append(nextChangeObj, nextChangeObjects);
        }
      }
      /**
       * The province might not be active. Let's get a change object for it.
       */


      var activeMunicipalities = _getActiveMunicipalities(nextChangeObjects);

      var changeObj = find(propEq("anchor", _getAnchor()), changeObjects) || {};
      nextChangeObjects = filter(function (changeObj) {
        return changeObj.anchor !== _getAnchor();
      }, nextChangeObjects);

      var nextProvinceChangeObj = _getChangeObject(changeObj.properties, {
        isChecked: true,
        isIndeterminate: activeMunicipalities.length !== _getMunicipalities().length
      });

      console.info(nextProvinceChangeObj);

      if (nextProvinceChangeObj) {
        nextChangeObjects = append(nextProvinceChangeObj, nextChangeObjects);
      }

      return nextChangeObjects;
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

      var valitutKunnat = _getActiveMunicipalities(changeObjects) || [];
      var percentage = valitutKunnat.length / kunnatAmount * 100;

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
          if (percentage > 0 && percentage < 100) {
            fillColor = mix("#109F52", "#C8DCC3", 1 - percentage / 100);
          } else if (percentage === 100) {
            fillColor = "#109F52";
          }

          if (labelSeries) {
            labelSeries.disposeChildren();

            try {
              var label = labelSeries.mapImages.create();
              label.latitude = polygon.visualLatitude;
              label.longitude = polygon.visualLongitude;
              label.children.getIndex(0).text = "".concat(Math.round(percentage), " %");
            } catch (err) {
              console.warn(err);
            }
          }
        }

        polygon.fill = am4core.color(fillColor);
      }

      return percentage;
    },
    deactivate: function deactivate() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var changeObjectsForMunicipalities = values(mapObjIndexed(function (municipality) {
        var changeObj = find(propEq("anchor", municipality.getAnchor()), changeObjects);
        return municipality.getChangeObject(changeObj ? changeObj.properties : {}, {
          isChecked: false
        });
      }, municipalityInstances)).filter(Boolean);
      var generatedProvinceChangeObject = _isActive() ? _getRemovalChangeObj() : null;
      return flatten([changeObjectsForMunicipalities, generatedProvinceChangeObject].filter(Boolean));
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
    getChangeObject: function getChangeObject(properties, targetProperties) {
      return _getChangeObject(properties, targetProperties);
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
    getPercentageOfActiveMunicipalities: function getPercentageOfActiveMunicipalities() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return _getActiveMunicipalities(changeObjects).length / _getMunicipalities().length * 100;
    },
    getRemovalChangeObj: function getRemovalChangeObj() {
      return _getRemovalChangeObj();
    },
    getRemovalChangeObjForMunicipality: function getRemovalChangeObjForMunicipality(koodiarvo, title) {
      return getRemovalChangeObj(baseAnchor, id, koodiarvo, title);
    },
    getTitle: function getTitle() {
      return title;
    },
    initializedAs: function initializedAs() {
      return province;
    },
    isActive: function isActive() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      return _isActive(changeObjects);
    },

    /**
     * Function finds out if the province and its all municipalities are
     * active.
     */
    isFullyDeactive: function isFullyDeactive() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var deactiveMunicipalities = filter(function (municipality) {
        return municipality.isDeactive(changeObjects);
      }, municipalityInstances);
      return deactiveMunicipalities.length === _getMunicipalities().length;
    },
    isMunicipalityActive: function isMunicipalityActive(koodiarvo) {
      var changeObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return _isMunicipalityActive(koodiarvo, changeObjects);
    },
    removeMunicipality: function removeMunicipality(koodiarvo) {
      var changeObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var municipality = municipalityInstances[koodiarvo];
      var nextChangeObjects = changeObjects;

      if (!municipality) {
        console.warn("Couldn't find a municipality with koodiarvo", koodiarvo);
      } else {
        var anchor = municipality.getAnchor();
        nextChangeObjects = filter(function (changeObj) {
          return changeObj.anchor !== anchor;
        }, changeObjects);
        var changeObj = find(propEq("anchor", anchor), changeObjects) || {};
        var nextChangeObj = municipality.getChangeObject(changeObj.properties, {
          isChecked: false
        });
        nextChangeObjects = append(nextChangeObj, nextChangeObjects).filter(Boolean);
      }
      /**
       * If all the municipalities will be deactive we need to deactivate the
       * province too.
       */


      var activeMunicipalities = _getActiveMunicipalities(nextChangeObjects);

      if (!activeMunicipalities.length) {
        var _anchor = _getAnchor();

        var _changeObj2 = find(propEq("anchor", _anchor), changeObjects) || {};

        var provinceChangeObj = _getChangeObject(_changeObj2.properties, {
          isChecked: false,
          isIndeterminate: false
        });

        if (provinceChangeObj) {
          nextChangeObjects = append(provinceChangeObj, nextChangeObjects).filter(Boolean);
        } else {
          nextChangeObjects = filter(function (changeObj) {
            return changeObj.anchor !== _anchor;
          }, nextChangeObjects);
        }
      }

      return nextChangeObjects;
    },
    setMap: function setMap(map) {
      kartta = map; // Configure label series

      labelSeries = kartta.series ? kartta.series.push(new am4maps.MapImageSeries()) : null;
      labelTemplate = labelSeries ? labelSeries.mapImages.template.createChild(am4core.Label) : null;

      if (labelTemplate) {
        labelTemplate.horizontalCenter = "middle";
        labelTemplate.verticalCenter = "middle";
        labelTemplate.fontSize = 14;
        labelTemplate.interactionsEnabled = false;
        labelTemplate.nonScaling = true;
      }
    },
    setPolygonSeries: function setPolygonSeries(_polygonSeries) {
      polygonSeries = _polygonSeries;
      polygon = polygonSeries ? polygonSeries.getPolygonById(id) : null;
    }
  };
}