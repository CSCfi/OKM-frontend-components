import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState } from "react";
import CategorizedListRoot from "../CategorizedListRoot";
import Input from "../../00-atoms/Input";
import { getReducedStructure, getChangeObjByAnchor } from "../CategorizedListRoot/utils";
import { dissocPath, equals, isEmpty, map, startsWith, toLower } from "ramda";
import { Tabs, Tab } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
var OivaTab = withStyles(function (theme) {
  return {
    root: {
      minWidth: 0,
      textTransform: "none",
      color: "#333 !important",
      fontWeight: theme.typography.fontWeightRegular,
      fontSize: theme.typography.pxToRem(15),
      padding: 0,
      marginRight: "2rem",
      marginLeft: "0.3em",
      marginTop: "0.3em",
      "&:focus": {
        outline: "0.2rem solid #d1d1d1"
      }
    }
  };
})(function (props) {
  return /*#__PURE__*/React.createElement(Tab, props);
});
var OivaTabs = withStyles(function () {
  return {
    root: {},
    indicator: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: "transparent",
      height: "0.3rem !important",
      "& > div": {
        width: "100%",
        backgroundColor: "#4C7A61"
      }
    }
  };
})(function (props) {
  return /*#__PURE__*/React.createElement(Tabs, Object.assign({}, props, {
    TabIndicatorProps: {
      children: /*#__PURE__*/React.createElement("div", null)
    }
  }));
});
var CategoryFilter = React.memo(function (_ref) {
  var _ref$anchor = _ref.anchor,
      anchor = _ref$anchor === void 0 ? "no-anchor-defined" : _ref$anchor,
      _ref$categories = _ref.categories,
      categories = _ref$categories === void 0 ? [] : _ref$categories,
      changeObjects = _ref.changeObjects,
      onChanges = _ref.onChanges;

  var _useState = useState("hakutulokset"),
      _useState2 = _slicedToArray(_useState, 2),
      selectedTab = _useState2[0],
      setSelectedTab = _useState2[1];

  var reducedStructure = useMemo(function () {
    return getReducedStructure(categories);
  }, [categories]);

  var _useState3 = useState(changeObjects),
      _useState4 = _slicedToArray(_useState3, 2),
      filteredChangeObjects = _useState4[0],
      setFilteredChangeObjects = _useState4[1];

  var filterCategories = useCallback(function (payload, valueObj) {
    var changeObjectsAfterFiltering = map(function (component) {
      var loweredTitle = toLower(component.properties.title);
      var fullAnchor = "".concat(anchor, ".").concat(component.fullAnchor);
      var changeObj = getChangeObjByAnchor(fullAnchor, filteredChangeObjects);

      if (!startsWith(toLower(valueObj.value), loweredTitle)) {
        if (!changeObj) {
          changeObj = {
            properties: {}
          };
        }

        changeObj.anchor = fullAnchor;
        changeObj.properties.isVisible = false;
      } else {
        if (changeObj && changeObj.properties.isVisible === false) {
          changeObj = dissocPath(["properties", "isVisible"], changeObj);
          changeObj = isEmpty(changeObj.properties) ? null : changeObj;
        }
      }

      return changeObj;
    }, reducedStructure).filter(Boolean);

    if (JSON.stringify(filteredChangeObjects) !== JSON.stringify(changeObjectsAfterFiltering)) {
      setFilteredChangeObjects(changeObjectsAfterFiltering);
    } else {
      console.warn("No changes!");
    }

    return onChanges(_objectSpread({}, payload, {
      changes: changeObjectsAfterFiltering
    }));
  }, [anchor, filteredChangeObjects, onChanges, reducedStructure]);
  var updateChangeObjects = useCallback(function (payload) {
    console.info(payload, filteredChangeObjects);

    if (!equals(filteredChangeObjects, payload.changes)) {
      setFilteredChangeObjects(payload.changes);
    }
  }, [filteredChangeObjects]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Input, {
    payload: {
      categories: categories
    },
    onChanges: filterCategories,
    isRequired: true,
    isValid: true,
    label: "Required",
    tooltip: {
      text: "This is info text"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "bg-white border overflow-auto p-4",
    style: {
      height: "50em"
    }
  }, /*#__PURE__*/React.createElement(OivaTabs, {
    value: selectedTab,
    className: "fixed z-10 border bg-white",
    indicatorColor: "primary",
    textColor: "primary",
    onChange: function onChange(e, val) {
      setSelectedTab(val);
    }
  }, /*#__PURE__*/React.createElement(OivaTab, {
    label: "Hakutulokset",
    "aria-label": "Hakutulokset",
    value: "hakutulokset"
  }), /*#__PURE__*/React.createElement(OivaTab, {
    label: "Valitut",
    "aria-label": "valitut",
    value: "valitut"
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(selectedTab !== "hakutulokset" ? "hidden" : "", " mt-12 p-4")
  }, /*#__PURE__*/React.createElement(CategorizedListRoot, {
    anchor: anchor,
    categories: categories,
    changes: filteredChangeObjects,
    onUpdate: updateChangeObjects
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(selectedTab !== "valitut" ? "hidden" : "", " mt-16 p-4")
  }, /*#__PURE__*/React.createElement("h2", null, "Toiminta-alue jatkossa:"))));
});
export default CategoryFilter;