import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useMemo } from "react";
import { map, keys, compose, prop, includes, find, equals, addIndex, propEq, zipObj, filter, pathEq } from "ramda";
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
      setCos = _useState4[1]; // const valitutKunnatMaakunnittain = useMemo(() => {
  //   const maakuntaIds = map(prop("anchor"), categories);
  //   const valitutKunnat = map(category => {
  //     return {
  //       title: category.components[0].properties.title,
  //       kunnat: filter(kunta => {
  //         return kunta.properties.isChecked;
  //       }, category.categories[0].components)
  //     };
  //   }, categories);
  //   return zipObj(maakuntaIds, valitutKunnat);
  // }, [categories]);


  useEffect(function () {
    onChanges(cos);
  }, [onChanges, cos]);

  function renderToimintaalueList(maakunnat) {
    var existing = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return /*#__PURE__*/React.createElement("ul", {
      className: "flex flex-wrap ml-8"
    }, map(function (maakunta) {
      var valitutKunnat = filter(pathEq(["properties", "isChecked"], true), maakunta.categories[0].components);
      console.info(maakunta); // const category = find(propEq("anchor", maakuntaId), categories);
      // const maakuntaChangeObj = find(
      //   compose(includes(".A"), prop("anchor")),
      //   categories[maakuntaId]
      // );
      // const kunnatCount = categories[maakuntaId].length;
      // const category = find(propEq("anchor", maakuntaId), categories);
      // const kunnatAmount = category.categories[0].components.length;

      return /*#__PURE__*/React.createElement("li", {
        key: maakunta.anchor,
        className: "w-1/2 pt-4 pb-6 pr-6"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-baseline"
      }, /*#__PURE__*/React.createElement("h4", null, maakunta.components[0].properties.title), /*#__PURE__*/React.createElement("p", {
        className: "ml-2 text-xs"
      }, "(", Math.round(valitutKunnat.length / maakunta.categories[0].components.length * 100), "% kunnista)")), /*#__PURE__*/React.createElement("ul", {
        className: "mt-4"
      }, /*#__PURE__*/React.createElement("li", null, addIndex(map)(function (kunta, index) {
        return /*#__PURE__*/React.createElement("span", {
          key: "kunta-".concat(index)
        }, kunta.properties.title, valitutKunnat[index + 1] ? ", " : null);
      }, valitutKunnat).filter(Boolean))));
    }, maakunnat || []));
  }

  if (isEditViewActive) {
    return /*#__PURE__*/React.createElement(Modify, {
      anchor: anchor,
      categories: categories,
      onChanges: onChanges,
      onClose: function onClose(muutoksetMaakunnittain) {
        toggleEditView(false);
        setCos(muutoksetMaakunnittain);
      },
      changeObjectsByMaakunta: cos
    });
  } else {
    return /*#__PURE__*/React.createElement("div", {
      className: "p-4"
    }, /*#__PURE__*/React.createElement("h3", null, "Nykyinen toiminta-alue"), renderToimintaalueList(categories), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("h3", {
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