import {
  find,
  propEq,
  filter,
  assoc,
  dissoc,
  endsWith,
  compose,
  prop,
  append,
  map,
  concat
} from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import mix from "./province-utils";
import {
  getAnchor as getKuntaAnchor,
  getRemovalChangeObj
} from "./kunta-utils";
import { getAdditionChangeObj as getMunicipalityAdditionChangeObj } from "./kunta-utils";

export function Province(province, baseAnchor) {
  const id = province.anchor;
  const code = province.components[0].properties.code;
  const title = province.components[0].properties.title;
  const kunnatAmount = province.categories[0].components.length;
  let polygonSeries = null;
  let polygon = null;
  let labelSeries = null;
  let kartta = null;
  let labelTemplate;

  function getAnchor() {
    return `${baseAnchor}.${id}.${province.components[0].anchor}`;
  }

  function getActiveMunicipalities(changeObjects) {
    return filter(kunta => {
      const changeObj = find(
        compose(endsWith(`kunnat.${kunta.anchor}`), prop("anchor")),
        changeObjects
      );
      return (
        (kunta.properties.isChecked && !changeObj) ||
        (changeObj && changeObj.properties.isChecked)
      );
    }, province.categories[0].components);
  }

  function getAdditionChangeObj(isIndeterminate) {
    return {
      anchor: getAnchor(baseAnchor),
      properties: {
        isChecked: true,
        isIndeterminate,
        metadata: {
          title,
          koodiarvo: code,
          provinceKey: id
        }
      }
    };
  }

  function getMunicipalities() {
    return province.categories[0].components;
  }

  return {
    activateFully: (changeObjects = []) => {
      // Activate province
      const provinceAnchor = getAnchor();
      const provinceChangeObj = find(
        propEq("anchor", provinceAnchor),
        changeObjects
      );
      const provinceObj = province.components[0];
      const municipalities = getMunicipalities();

      // If change object is not valid it must be deleted.
      if (provinceChangeObj) {
        if (
          !provinceChangeObj.properties.isChecked ||
          provinceChangeObj.properties.isIndeterminate
        ) {
          changeObjects = filter(changeObj => {
            return changeObj.anchor !== provinceAnchor;
          }, changeObjects);

          if (
            !provinceObj.properties.isChecked ||
            provinceObj.properties.isIndeterminate
          ) {
            // New valid change object must be created.
            changeObjects = append(getAdditionChangeObj(false), changeObjects);
          }
        }
      }
      // If there isn't change object
      else if (
        !provinceObj.properties.isChecked ||
        provinceObj.properties.isIndeterminate
      ) {
        // New valid change object must be created.
        changeObjects = append(getAdditionChangeObj(false), changeObjects);
      }

      // Activate municipalities
      const municipalityChangeObjects = map(municipality => {
        if (!municipality.properties.isChecked) {
          return getMunicipalityAdditionChangeObj(
            baseAnchor,
            id,
            municipality.properties.title,
            municipality.anchor
          );
        }
      }, municipalities).filter(Boolean);
      return concat(municipalityChangeObjects, changeObjects);
    },
    areAllMunicipalitiesActive: (changeObjects = [], activeMunicipalities) => {
      return activeMunicipalities
        ? activeMunicipalities.length === getMunicipalities().length
        : getActiveMunicipalities(changeObjects).length ===
            getMunicipalities().length;
    },
    /**
     * Function updates the color and percentage of province.
     */
    colorize: (changeObjects = []) => {
      if (!id || !polygonSeries) return false;
      let polygonSerie = find(propEq("id", id), polygonSeries.data);
      if (polygonSerie) {
        polygonSerie.fill = am4core.color("#ff0000");
      }
      const valitutKunnat = getActiveMunicipalities(changeObjects);

      const percentage = valitutKunnat.length / kunnatAmount;
      if (kunnatAmount) {
        polygonSerie = assoc("value", percentage, polygonSerie);
      } else {
        polygonSerie = dissoc("value", polygonSerie);
      }
      if (polygon) {
        let fillColor = "#dadada";
        // Ahvenanmaa must be hidden.
        if (id === "FI-01") {
          fillColor = "#ffffff";
        } else {
          if (percentage > 0 && percentage < 1) {
            fillColor = mix("#109F52", "#C8DCC3", 1 - percentage);
          } else if (percentage === 1) {
            fillColor = "#109F52";
          }
          labelSeries.disposeChildren();
          const label = labelSeries.mapImages.create();
          label.latitude = polygon.visualLatitude;
          label.longitude = polygon.visualLongitude;
          label.children.getIndex(0).text = `${Math.round(percentage * 100)} %`;
        }
        polygon.fill = am4core.color(fillColor);
      }
    },
    getActiveMunicipalities: (changeObjects = []) => {
      return getActiveMunicipalities(changeObjects);
    },
    getAdditionChangeObj: isIndeterminate => {
      return getAdditionChangeObj(isIndeterminate);
    },
    getAnchor: () => {
      return getAnchor();
    },
    getCode: () => {
      return code;
    },
    getId: () => {
      return id;
    },
    getMunicipalities: () => {
      return getMunicipalities();
    },
    getRemovalChangeObj: () => {
      return {
        anchor: getAnchor(),
        properties: {
          isChecked: false,
          isIndeterminate: false,
          metadata: {
            provinceKey: id
          }
        }
      };
    },
    getRemovalChangeObjForMunicipality: koodiarvo => {
      return getRemovalChangeObj(baseAnchor, id, koodiarvo);
    },
    getTitle: () => {
      return title;
    },
    initializedAs: () => {
      return province;
    },
    isActive: (changeObjects = []) => {
      const changeObj = find(propEq("anchor", getAnchor()), changeObjects);
      return (
        (province.components[0].properties.isChecked && !changeObj) ||
        (changeObj && changeObj.properties.isChecked)
      );
    },
    isKuntaActive: (koodiarvo, changeObjects = []) => {
      const anchor = getKuntaAnchor(baseAnchor, id, koodiarvo);
      const changeObj = find(propEq("anchor", anchor), changeObjects);
      const kunta = find(
        propEq("anchor", koodiarvo),
        province.categories[0].components
      );
      return (
        (kunta.properties.isChecked && !changeObj) ||
        (changeObj && changeObj.properties.isChecked)
      );
    },
    setMap: map => {
      kartta = map;
      // Configure label series
      labelSeries = kartta.series.push(new am4maps.MapImageSeries());
      labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label);
      labelTemplate.horizontalCenter = "middle";
      labelTemplate.verticalCenter = "middle";
      labelTemplate.fontSize = 14;
      labelTemplate.interactionsEnabled = false;
      labelTemplate.nonScaling = true;
    },
    setPolygonSeries: _polygonSeries => {
      polygonSeries = _polygonSeries;
      polygon = polygonSeries.getPolygonById(id);
    }
  };
}
