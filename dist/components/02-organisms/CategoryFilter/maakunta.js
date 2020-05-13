import { find, propEq, filter, assoc, dissoc } from "ramda";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import mix from "./maakunta-utils";
export function Maakunta(id, kartta, category, polygonSeries) {
  var kunnatAmount = category.categories[0].components.length;
  var polygon = polygonSeries.getPolygonById(id); // Configure label series

  var labelSeries = kartta.series.push(new am4maps.MapImageSeries());
  var labelTemplate = labelSeries.mapImages.template.createChild(am4core.Label);
  labelTemplate.horizontalCenter = "middle";
  labelTemplate.verticalCenter = "middle";
  labelTemplate.fontSize = 16;
  labelTemplate.interactionsEnabled = false;
  labelTemplate.nonScaling = true;
  return {
    /**
     * Function updates the color and percentage of maakunta.
     */
    colorize: function colorize() {
      var changeObjects = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      if (!id || !polygonSeries) return false;
      var polygonSerie = find(propEq("id", id), polygonSeries.data);

      if (polygonSerie) {
        polygonSerie.fill = am4core.color("#ff0000");
      }

      var valittujaKuntia = Math.max(filter(function (changeObj) {
        return changeObj.properties.isChecked;
      }, changeObjects).length - 1, // Maakunta excluded
      0);
      var percentage = valittujaKuntia / kunnatAmount;

      if (kunnatAmount) {
        polygonSerie = assoc("value", valittujaKuntia / kunnatAmount, polygonSerie);
      } else {
        polygonSerie = dissoc("value", polygonSerie);
      }

      if (polygon) {
        var fillColor = "#dadada";

        if (percentage > 0 && percentage < 1) {
          fillColor = mix("#109F52", "#BCE4CF", 1 - percentage);
        } else if (percentage === 1) {
          fillColor = "#109F52";
        }

        polygon.fill = am4core.color(fillColor);
        labelSeries.disposeChildren();
        var label = labelSeries.mapImages.create();
        label.latitude = polygon.visualLatitude;
        label.longitude = polygon.visualLongitude;
        label.children.getIndex(0).text = "".concat(Math.round(valittujaKuntia / kunnatAmount * 100), " %");
      }
    }
  };
}