import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useMemo } from "react";
import { map, prop, equals, addIndex, zipObj } from "ramda";
import Modify from "./Modify";
import SimpleButton from "../../00-atoms/SimpleButton";
import { Province } from "./province";

var CategoryFilter = function CategoryFilter(_ref) {
  var _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? "no-anchor-defined" : _ref$anchor,
      _ref$changeObjectsByP = _ref.changeObjectsByProvince,
      changeObjectsByProvince = _ref$changeObjectsByP === void 0 ? {} : _ref$changeObjectsByP,
      _ref$municipalities = _ref.municipalities,
      municipalities = _ref$municipalities === void 0 ? [] : _ref$municipalities,
      onChanges = _ref.onChanges,
      _ref$provinces = _ref.provinces,
      provinces = _ref$provinces === void 0 ? [] : _ref$provinces,
      _ref$provincesWithout = _ref.provincesWithoutMunicipalities,
      provincesWithoutMunicipalities = _ref$provincesWithout === void 0 ? [] : _ref$provincesWithout;

  var _useState = useState(true),
      _useState2 = _slicedToArray(_useState, 2),
      isEditViewActive = _useState2[0],
      toggleEditView = _useState2[1];

  var _useState3 = useState(changeObjectsByProvince),
      _useState4 = _slicedToArray(_useState3, 2),
      cos = _useState4[0],
      setCos = _useState4[1];

  var provinceInstances = useMemo(function () {
    var provinceIds = map(prop("anchor"), provinces);
    var instances = map(function (province) {
      return new Province(province, anchor);
    }, provinces);
    return zipObj(provinceIds, instances);
  }, [anchor, provinces]);
  useEffect(function () {
    onChanges(cos);
  }, [onChanges, cos]);
  /**
   * Renders a list of active provinces and municipalities.
   * @param {array} provinces - List of all provinces in Finland except Åland.
   * @param {object} changeObjects - Change objects of all provinces by province's anchor.
   */

  function renderToimintaalueList(provinces) {
    var changeObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return /*#__PURE__*/React.createElement("ul", {
      className: "flex flex-wrap ml-8"
    }, provinces.length ? map(function (province) {
      var provinceInstance = provinceInstances[province.anchor];
      var isProvinceActive = provinceInstance.isActive(anchor, changeObjects[province.anchor]);

      if (isProvinceActive) {
        var activeMunicipalities = provinceInstance.getActiveMunicipalities(changeObjects[province.anchor]);
        return /*#__PURE__*/React.createElement("li", {
          key: province.anchor,
          className: "w-1/2 pt-4 pb-6 pr-6"
        }, /*#__PURE__*/React.createElement("div", {
          className: "flex items-baseline"
        }, /*#__PURE__*/React.createElement("h4", null, province.components[0].properties.title), /*#__PURE__*/React.createElement("p", {
          className: "ml-2 text-xs"
        }, "(", Math.round(activeMunicipalities.length / province.categories[0].components.length * 100), "% kunnista)")), /*#__PURE__*/React.createElement("ul", {
          className: "mt-4"
        }, /*#__PURE__*/React.createElement("li", null, addIndex(map)(function (kunta, index) {
          return /*#__PURE__*/React.createElement("span", {
            key: "kunta-".concat(index)
          }, kunta.properties.title, activeMunicipalities[index + 1] ? ", " : null);
        }, activeMunicipalities).filter(Boolean))));
      }

      return null;
    }, provinces || []).filter(Boolean) : /*#__PURE__*/React.createElement("div", {
      className: "py-8"
    }, "-"));
  }

  if (isEditViewActive) {
    return /*#__PURE__*/React.createElement(Modify, {
      provinceInstances: provinceInstances,
      anchor: anchor,
      categories: provinces,
      municipalities: municipalities,
      provincesWithoutMunicipalities: provincesWithoutMunicipalities,
      onChanges: onChanges,
      onClose: function onClose(muutoksetMaakunnittain) {
        toggleEditView(false);
        setCos(muutoksetMaakunnittain);
      },
      changeObjectsByProvince: cos
    });
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "p-4"
    }, /*#__PURE__*/React.createElement("h3", null, "Nykyinen toiminta-alue"), renderToimintaalueList(provinces), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h3", {
      className: "mt-4"
    }, "Uusi toiminta-alue"), !equals(cos, changeObjectsByProvince) ? renderToimintaalueList(provinces, cos) : /*#__PURE__*/React.createElement("p", {
      className: "pl-8 pt-4"
    }, "Sama kuin nykyinen toiminta-alue."), /*#__PURE__*/React.createElement("div", {
      className: "float-right pt-6"
    }, /*#__PURE__*/React.createElement(SimpleButton, {
      onClick: function onClick() {
        return toggleEditView(true);
      },
      text: "Muokkaa toiminta-aluetta"
    })));
  }
};

export default CategoryFilter;