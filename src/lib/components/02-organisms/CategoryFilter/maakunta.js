import { find, propEq, filter, assoc, dissoc } from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import mix from "./maakunta-utils";

export function Maakunta(id, kartta, category, polygonSeries) {
  const kunnatAmount = category.categories[0].components.length;
  const polygon = polygonSeries.getPolygonById(id);
  // Configure label series
  const labelSeries = kartta.series.push(new am4maps.MapImageSeries());
  const labelTemplate = labelSeries.mapImages.template.createChild(
    am4core.Label
  );
  labelTemplate.horizontalCenter = "middle";
  labelTemplate.verticalCenter = "middle";
  labelTemplate.fontSize = 16;
  labelTemplate.interactionsEnabled = false;
  labelTemplate.nonScaling = true;
  return {
    /**
     * Function updates the color and percentage of maakunta.
     */
    colorize: (changeObjects = []) => {
      if (!id || !polygonSeries) return false;
      let polygonSerie = find(propEq("id", id), polygonSeries.data);
      if (polygonSerie) {
        polygonSerie.fill = am4core.color("#ff0000");
      }
      const valittujaKuntia = Math.max(
        filter(changeObj => {
          return changeObj.properties.isChecked;
        }, changeObjects).length - 1, // Maakunta excluded
        0
      );
      const percentage = valittujaKuntia / kunnatAmount;
      if (kunnatAmount) {
        polygonSerie = assoc(
          "value",
          valittujaKuntia / kunnatAmount,
          polygonSerie
        );
      } else {
        polygonSerie = dissoc("value", polygonSerie);
      }
      if (polygon) {
        let fillColor = "#dadada";
        if (percentage > 0 && percentage < 1) {
          fillColor = mix("#109F52", "#BCE4CF", 1 - percentage);
        } else if (percentage === 1) {
          fillColor = "#109F52";
        }
        polygon.fill = am4core.color(fillColor);
        labelSeries.disposeChildren();
        const label = labelSeries.mapImages.create();
        label.latitude = polygon.visualLatitude;
        label.longitude = polygon.visualLongitude;
        label.children.getIndex(0).text = `${Math.round(
          (valittujaKuntia / kunnatAmount) * 100
        )} %`;
      }
    }
  };
}
