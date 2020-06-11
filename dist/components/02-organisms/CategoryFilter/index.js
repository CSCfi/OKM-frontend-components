import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useMemo, useEffect } from "react";
import { map, prop, addIndex, zipObj, equals, values, flatten } from "ramda";
import Modify from "./Modify";
import SimpleButton from "../../00-atoms/SimpleButton";
import { Province } from "./province";
import Country from "./country";

var CategoryFilter = function CategoryFilter(_ref) {
  var _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? "no-anchor-defined" : _ref$anchor,
      _ref$changeObjectsByP = _ref.changeObjectsByProvince,
      changeObjectsByProvince = _ref$changeObjectsByP === void 0 ? {} : _ref$changeObjectsByP,
      _ref$isEditViewActive = _ref.isEditViewActive,
      isEditViewActive = _ref$isEditViewActive === void 0 ? false : _ref$isEditViewActive,
      _ref$localizations = _ref.localizations,
      localizations = _ref$localizations === void 0 ? {} : _ref$localizations,
      _ref$municipalities = _ref.municipalities,
      municipalities = _ref$municipalities === void 0 ? [] : _ref$municipalities,
      onChanges = _ref.onChanges,
      toggleEditView = _ref.toggleEditView,
      _ref$provinces = _ref.provinces,
      provinces = _ref$provinces === void 0 ? [] : _ref$provinces,
      _ref$provincesWithout = _ref.provincesWithoutMunicipalities,
      provincesWithoutMunicipalities = _ref$provincesWithout === void 0 ? [] : _ref$provincesWithout,
      _ref$quickFilterChang = _ref.quickFilterChangeObjects,
      quickFilterChangeObjects = _ref$quickFilterChang === void 0 ? [] : _ref$quickFilterChang;

  var _useState = useState(changeObjectsByProvince),
      _useState2 = _slicedToArray(_useState, 2),
      changeObjects = _useState2[0],
      setChangeObjects = _useState2[1];

  var _useState3 = useState(quickFilterChangeObjects),
      _useState4 = _slicedToArray(_useState3, 2),
      quickFilterChanges = _useState4[0],
      setQuickFilterChanges = _useState4[1];

  useEffect(function () {
    setChangeObjects(changeObjectsByProvince);
  }, [changeObjectsByProvince]);
  var provinceInstances = useMemo(function () {
    var provinceIds = map(prop("anchor"), provinces);
    var instances = map(function (province) {
      return new Province(province, anchor);
    }, provinces);
    return zipObj(provinceIds, instances);
  }, [anchor, provinces]);
  var country = useMemo(function () {
    return new Country(provinceInstances);
  }, [provinceInstances]);
  /**
   * Renders a list of active provinces and municipalities.
   * @param {array} provinces - List of all provinces in Finland except Åland.
   * @param {object} changeObjects - Change objects of all provinces by province's anchor.
   */

  function renderToimintaalueList(provinces) {
    var changeObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var isEverythingActive = true;
    var zeroPercentages = [];
    var markup = map(function (province) {
      var provinceInstance = provinceInstances[province.anchor];
      var isProvinceActive = provinceInstance.isActive(changeObjects[province.anchor]);
      var activeMunicipalities = provinceInstance.getActiveMunicipalities(changeObjects[province.anchor]);
      var percentage = Math.round(activeMunicipalities.length / province.categories[0].components.length * 100);

      if (percentage < 100) {
        isEverythingActive = false;
      }

      if (percentage === 0) {
        zeroPercentages.push(province.components[0].properties.title);
      }

      if (isProvinceActive) {
        return /*#__PURE__*/React.createElement("li", {
          key: province.anchor,
          className: "w-1/2 pt-4 pb-6 pr-6"
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex items-baseline"
        }, /*#__PURE__*/React.createElement("h4", null, province.components[0].properties.title), /*#__PURE__*/React.createElement("p", {
          className: "ml-2 text-xs"
        }, "(", percentage, "% ", localizations.ofMunicipalities, ")")), percentage < 100 ? /*#__PURE__*/React.createElement("ul", {
          className: "ml-4 mt-4"
        }, /*#__PURE__*/React.createElement("li", null, addIndex(map)(function (kunta, index) {
          return /*#__PURE__*/React.createElement("span", {
            key: "kunta-".concat(index)
          }, kunta.getTitle(), activeMunicipalities[index + 1] ? ", " : null);
        }, activeMunicipalities).filter(Boolean))) : null);
      }

      return null;
    }, provinces || []).filter(Boolean);

    if (isEverythingActive) {
      return /*#__PURE__*/React.createElement("p", {
        className: "pt-4 pb-8"
      }, localizations.wholeCountryWithoutAhvenanmaa);
    } else if (zeroPercentages.length === provinces.length) {
      return /*#__PURE__*/React.createElement("p", {
        className: "pt-4 pb-8"
      }, localizations.areaOfActionIsUndefined);
    } else {
      return /*#__PURE__*/React.createElement("ul", {
        className: "flex flex-wrap ml-8"
      }, markup);
    }
  }

  if (isEditViewActive) {
    return /*#__PURE__*/React.createElement(Modify, {
      provinceInstances: provinceInstances,
      anchor: anchor,
      categories: provinces,
      country: country,
      municipalities: municipalities,
      localizations: localizations,
      provincesWithoutMunicipalities: provincesWithoutMunicipalities,
      onClose: function onClose(quickFilterChanges, changesByProvince) {
        toggleEditView(false);
        setChangeObjects(changesByProvince);
        setQuickFilterChanges(quickFilterChanges);

        if (changesByProvince) {
          onChanges({
            changesByProvince: changesByProvince,
            quickFilterChanges: quickFilterChanges
          });
        } else if (!equals(changeObjects, changeObjectsByProvince)) {
          onChanges({
            changeObjectsByProvince: changeObjectsByProvince,
            quickFilterChanges: quickFilterChanges
          });
        }
      },
      changeObjectsByProvince: changeObjects,
      quickFilterChangeObjects: quickFilterChanges
    });
  } else {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
      className: "mb-4"
    }, localizations.currentAreaOfAction), renderToimintaalueList(provinces), flatten(values(changeObjects)).length > 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h3", {
      className: "mt-8 mb-4"
    }, localizations.newAreaOfAction), renderToimintaalueList(provinces, changeObjects)), /*#__PURE__*/React.createElement("div", {
      className: "pt-6"
    }, /*#__PURE__*/React.createElement(SimpleButton, {
      variant: "outlined",
      onClick: function onClick() {
        return toggleEditView(true);
      },
      text: "Muokkaa toiminta-aluetta"
    })));
  }
};

export default CategoryFilter;