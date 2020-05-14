import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useMemo } from "react";
import { map, keys, compose, prop, includes, find, equals, addIndex, propEq, zipObj, filter } from "ramda";
import Modify from "./Modify";
import SimpleButton from "../../00-atoms/SimpleButton";

var CategoryFilter = function CategoryFilter(_ref) {
  var _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? "no-anchor-defined" : _ref$anchor,
      _ref$categories = _ref.categories,
      categories = _ref$categories === void 0 ? [] : _ref$categories,
      _ref$changeObjectsByM = _ref.changeObjectsByMaakunta,
      changeObjectsByMaakunta = _ref$changeObjectsByM === void 0 ? {} : _ref$changeObjectsByM,
      onChanges = _ref.onChanges;

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isEditViewActive = _useState2[0],
      toggleEditView = _useState2[1];

  var _useState3 = useState(changeObjectsByMaakunta),
      _useState4 = _slicedToArray(_useState3, 2),
      cos = _useState4[0],
      setCos = _useState4[1];

  var valitutKunnatMaakunnittain = useMemo(function () {
    var maakuntaIds = map(prop("anchor"), categories);
    var valitutKunnat = map(function (category) {
      return filter(function (kunta) {
        return kunta.properties.isChecked;
      }, category.categories[0].components);
    }, categories);
    console.info(valitutKunnat, maakuntaIds);
    return zipObj(maakuntaIds, valitutKunnat);
  }, [categories]);
  useEffect(function () {
    onChanges(cos);
  }, [onChanges, cos]);

  function renderToimintaalueList(categories) {
    var existing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return /*#__PURE__*/React.createElement("ul", {
      className: "flex flex-wrap ml-8"
    }, map(function (maakuntaId) {
      console.info(maakuntaId); // const category = find(propEq("anchor", maakuntaId), categories);
      // const valitutKunnat = filter(kunta => {
      //   return kunta.properties.isChecked;
      // }, categories[maakuntaId].categories[0].components);

      var maakuntaChangeObj = find(compose(includes(".A"), prop("anchor")), categories[maakuntaId]);
      var kunnatCount = categories[maakuntaId].length;
      var category = find(propEq("anchor", maakuntaId), categories);
      var kunnatAmount = category.categories[0].components.length;
      return /*#__PURE__*/React.createElement("li", {
        key: maakuntaId,
        className: "w-1/2 pt-4 pb-6 pr-6"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-baseline"
      }, /*#__PURE__*/React.createElement("h4", null, maakuntaChangeObj.properties.metadata.title), /*#__PURE__*/React.createElement("p", {
        className: "ml-2 text-xs"
      }, "(", Math.round((kunnatCount - 1) / kunnatAmount * 100), "% kunnista)")), /*#__PURE__*/React.createElement("ul", {
        className: "mt-4"
      }, /*#__PURE__*/React.createElement("li", null, addIndex(map)(function (changeObj, index) {
        return includes(".kunnat", changeObj.anchor) ? /*#__PURE__*/React.createElement("span", {
          key: "kuntamuutos-".concat(index)
        }, changeObj.properties.metadata.title, index < kunnatCount - 1 ? ", " : null) : null;
      }, categories[maakuntaId]).filter(Boolean))));
    }, keys(categories) || []));
  }

  if (isEditViewActive) {
    return /*#__PURE__*/React.createElement(Modify, {
      anchor: anchor,
      categories: categories,
      onChanges: onChanges,
      onClose: function onClose(muutoksetMaakunnittain) {
        toggleEditView(false);
        console.info(muutoksetMaakunnittain);
        setCos(muutoksetMaakunnittain);
      },
      changeObjectsByMaakunta: cos
    });
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "p-4"
    }, /*#__PURE__*/React.createElement("h3", null, "Nykyinen toiminta-alue"), console.info(valitutKunnatMaakunnittain), renderToimintaalueList(valitutKunnatMaakunnittain), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h3", {
      className: "mt-4"
    }, "Uusi toiminta-alue"), !equals(cos, changeObjectsByMaakunta) ? renderToimintaalueList(cos, false) : /*#__PURE__*/React.createElement("p", {
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