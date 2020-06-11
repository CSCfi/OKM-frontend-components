import { map, mapObjIndexed, forEachObjIndexed } from "ramda";

function Country(provinces) {
  return {
    /**
     * Activates Finland's provinces and their municipalities.
     */
    activate: function activate(changeObjectsByProvince) {
      return map(function (province) {
        return province.activateFully(changeObjectsByProvince[province.getId()]);
      }, provinces);
    },

    /**
     * Updates map colors.
     */
    colorize: function colorize() {
      var changeObjectsByProvince = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      forEachObjIndexed(function (province) {
        province.colorize(changeObjectsByProvince[province.getId()]);
      }, provinces);
    },

    /**
     * Deactivates Finland's provinces and their municipalities.
     */
    deactivate: function deactivate(changeObjectsByProvince) {
      return map(function (province) {
        return province.deactivate(changeObjectsByProvince[province.getId()]);
      }, provinces);
    },

    /**
     * Returns true if the whole country is deactivate.
     */
    getPercentages: function getPercentages() {
      var changeObjectsByProvince = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var percentages = mapObjIndexed(function (province) {
        return province.getPercentageOfActiveMunicipalities(changeObjectsByProvince[province.getId()]);
      }, provinces);
      return percentages;
    }
  };
}

export default Country;