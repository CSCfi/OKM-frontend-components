import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import React, { useCallback } from "react";
import RadioButtonWithLabel from "../../../01-molecules/RadioButtonWithLabel";
import CheckboxWithLabel from "../../../01-molecules/CheckboxWithLabel";
import StatusTextRow from "../../../01-molecules/StatusTextRow";
import Autocomplete from "../../../02-organisms/Autocomplete";
import Difference from "../../../02-organisms/Difference";
import SimpleButton from "../../../00-atoms/SimpleButton";
import { heights } from "../../../../css/autocomplete";
import { flattenObj } from "../../../../utils/common";
import Datepicker from "../../../00-atoms/Datepicker";
import Dropdown from "../../../00-atoms/Dropdown";
import CheckIcon from "@material-ui/icons/Check";
import TextBox from "../../../00-atoms/TextBox";
import Input from "../../../00-atoms/Input";
import Attachments from "../../Attachments";
import * as R from "ramda";
import _ from "lodash";
/** @namespace components */

/**
 * @module 02-organisms
 */

var componentContainerBaseClasses = ["flex", "flex-wrap", "flex-col"];
var componentStyleMapping = {
  justification: {
    between: "justify-between",
    start: "justify-start"
  },
  verticalAlignment: {
    center: "items-center"
  }
};
var categoryStyleMapping = {
  indentations: {
    none: 0,
    extraSmall: 2,
    small: 4,
    medium: 6,
    large: 10
  },
  margins: {
    none: 0,
    extraSmall: 2,
    small: 4,
    medium: 6,
    large: 10
  }
};
var layoutStrategies = [{
  key: "default"
}, {
  key: "groups"
}];
var defaultComponentStyles = {
  justification: componentStyleMapping.justification.between,
  verticalAlignment: componentStyleMapping.verticalAlignment.center
};
var defaultCategoryStyles = {
  indentation: categoryStyleMapping.indentations.large,
  layoutStrategy: R.find(R.propEq("key", "default"), layoutStrategies),
  margins: {
    top: categoryStyleMapping.margins.extraSmall
  }
};
/**
 * Returns a change object by the given anchor.
 *
 * @param {string} anchor
 * @param {array} changes
 */

var getChangeObjByAnchor = function getChangeObjByAnchor(anchor, changes) {
  return R.find(R.propEq("anchor", anchor), changes) || {
    properties: {}
  };
};
/**
 * Combines the properties of the component with the properties of the
 * change object.
 * @param {object} changeObj
 * @param {object} component
 */


var getPropertiesObject = function getPropertiesObject() {
  var changeObj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    properties: {}
  };
  var component = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    properties: {}
  };
  return Object.assign({}, R.prop("properties", component) || {}, R.prop("properties", changeObj) || {});
};

var CategorizedList = React.memo(function (props) {
  var onChangesUpdate = props.onChangesUpdate,
      removeChangeObject = props.removeChangeObject;

  var handleButtonClick = function handleButtonClick(payload, changeProps) {
    payload.component.onClick(payload, changeProps);
  };

  var handleChanges = useCallback(function (payload, changeProps) {
    return onChangesUpdate({
      anchor: "".concat(R.compose(R.join("."), R.tail(), R.split("."))(payload.anchor), ".").concat(payload.component.anchor),
      properties: _objectSpread({}, changeProps, {
        metadata: R.path(["component", "properties", "forChangeObject"], payload)
      })
    });
  }, [onChangesUpdate]);
  return React.createElement("div", {
    "data-anchor": props.anchor
  }, _.map(props.categories, function (category, i) {
    if (category.isVisible === false) {
      return null;
    }

    var isCategoryTitleVisible = props.showCategoryTitles && !!(category.code || category.title);
    var anchor = "".concat(props.anchor, ".").concat(category.anchor);
    var splittedAnchor = R.split(".", anchor);
    var categoryChanges = R.filter(R.compose(R.equals(splittedAnchor), R.slice(0, splittedAnchor.length), R.split("."), R.prop("anchor")), props.changes); // Category related layout styles

    var _ref = category.layout || {},
        components = _ref.components,
        indentation = _ref.indentation,
        strategy = _ref.strategy,
        margins = _ref.margins;

    var topMarginInteger = margins && margins.top && !R.isNil(categoryStyleMapping.margins[margins.top]) ? categoryStyleMapping.margins[margins.top] : defaultCategoryStyles.margins.top;
    var layoutStrategyMapping = {
      margins: {
        top: {
          default: Number(!!i) * topMarginInteger,
          groups: Number(!!i) * Math.max(10 - 2 * props.level, 0) + topMarginInteger
        }
      }
    };
    var categoryLayout = {
      margins: {
        top: layoutStrategyMapping.margins.top[strategy ? strategy.key : defaultCategoryStyles.layoutStrategy.key]
      }
    };
    var categoryStyles = {
      classes: {
        indentation: "pl-".concat(!R.isNil(categoryStyleMapping.indentations[indentation]) ? categoryStyleMapping.indentations[indentation] : // Number(!!props.level) returns 0 when props.level is 0 otherwise 1
        Number(!!props.level) * defaultCategoryStyles.indentation),
        margins: {
          top: "pt-".concat(categoryLayout.margins.top)
        }
      }
    }; // Component related layout styles

    var _ref2 = R.path(["layout", "components"], category) || {},
        justification = _ref2.justification;

    var componentStyles = {
      classes: {
        justification: justification && !R.isNil(componentStyleMapping.justification[justification]) ? componentStyleMapping.justification[justification] : defaultComponentStyles.justification,
        verticalAlignment: componentStyleMapping.verticalAlignment[category.alignComponents] || defaultComponentStyles.verticalAlignment
      }
    };
    var componentContainerClasses = R.concat(componentContainerBaseClasses, R.values(R.mapObjIndexed(function (styleClass) {
      return styleClass;
    }, componentStyles.classes)));

    if (components && components.vertical) {
      componentContainerClasses = R.append("items-baseline", componentContainerClasses);
    } else {
      componentContainerClasses = R.append("sm:flex-row", componentContainerClasses);
    }

    var categoryTitleClasses = R.join(" ", ["py-".concat(topMarginInteger), i === 0 ? "" : "mt-".concat(2 * topMarginInteger)]);
    var categoryClasses = R.values(flattenObj(categoryStyles.classes));
    return React.createElement("div", {
      key: i,
      className: R.join(" ", categoryClasses),
      "data-level": props.level
    }, isCategoryTitleVisible && React.createElement("div", {
      className: categoryTitleClasses
    }, React.createElement("h4", null, category.code && React.createElement("span", {
      className: "mr-4"
    }, category.code), React.createElement("span", null, category.title), !category.isReadonly && category.isRequired && React.createElement("span", {
      className: "pr-4"
    }, "*"))), React.createElement("div", {
      className: R.join(" ", componentContainerClasses)
    }, _.map(category.components, function (component, ii) {
      var fullAnchor = "".concat(anchor, ".").concat(component.anchor);
      var fullPath = props.rootPath.concat([i, "components", ii]);
      var idSuffix = "".concat(i, "-").concat(ii);
      var changeObj = getChangeObjByAnchor(fullAnchor, props.changes);
      var parentComponent = props.parent && props.parent.category.components ? props.parent.category.components[0] : null;
      var parentChangeObj = parentComponent ? getChangeObjByAnchor("".concat(props.parent.anchor, ".").concat(parentComponent.anchor), props.changes) : {};
      var parentPropsObj = getPropertiesObject(parentChangeObj, parentComponent);
      var propsObj = getPropertiesObject(changeObj, component);
      var isAddition = !!changeObj.properties.isChecked;
      var isRemoved = R.has("isChecked")(changeObj.properties) && !changeObj.properties.isChecked;
      var labelStyles = Object.assign({}, isAddition ? (propsObj.labelStyles || {}).addition : {}, isRemoved ? (propsObj.labelStyles || {}).removal : {}, (propsObj.labelStyles || {}).custom || {});
      var styleClasses = component.styleClasses || [];
      var title = propsObj.title + (props.debug ? props.rootPath.concat([i, "components", ii]) : "");
      return React.createElement(React.Fragment, {
        key: "item-".concat(ii)
      }, component.name === "CheckboxWithLabel" && React.createElement("div", {
        className: component.styleClasses
      }, React.createElement(CheckboxWithLabel, {
        id: "checkbox-with-label-".concat(idSuffix),
        name: component.name,
        isChecked: propsObj.isChecked,
        isDisabled: propsObj.isDisabled,
        isReadOnly: propsObj.isReadOnly,
        onChanges: handleChanges,
        payload: {
          anchor: anchor,
          categories: category.categories,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath,
          siblings: props.categories
        },
        labelStyles: labelStyles
      }, React.createElement("div", {
        className: "flex"
      }, React.createElement("span", {
        className: "leading-none"
      }, propsObj.code), React.createElement("p", {
        className: "ml-4 leading-none"
      }, title)))), component.name === "RadioButtonWithLabel" && React.createElement("div", {
        className: "flex-2"
      }, React.createElement(RadioButtonWithLabel, {
        id: "radio-button-with-label-".concat(idSuffix),
        name: propsObj.name,
        isChecked: propsObj.isChecked,
        isReadOnly: propsObj.isReadOnly,
        onChanges: handleChanges,
        payload: {
          anchor: anchor,
          categories: category.categories,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath,
          siblings: props.categories
        },
        labelStyles: labelStyles,
        value: propsObj.value,
        className: "flex-row"
      }, React.createElement("div", {
        className: "flex"
      }, React.createElement("span", {
        className: "leading-none"
      }, propsObj.code), React.createElement("p", {
        className: "ml-4 leading-none"
      }, title)))), component.name === "Dropdown" ? function (category) {
        var previousSibling = category.components[ii - 1] || {};
        var isPreviousSiblingCheckedByDefault = !!(previousSibling.properties || {}).isChecked;
        var previousSiblingFullAnchor = "".concat(anchor, ".").concat(previousSibling.anchor);
        var change = getChangeObjByAnchor(previousSiblingFullAnchor, props.changes);
        var isDisabled = (previousSibling.name === "CheckboxWithLabel" || previousSibling.name === "RadioButtonWithLabel") && !(isPreviousSiblingCheckedByDefault || change.properties.isChecked);
        return React.createElement("div", {
          className: "px-2 mb-1"
        }, React.createElement(Dropdown, {
          id: "dropdown-".concat(idSuffix),
          onChanges: handleChanges,
          options: propsObj.options,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath,
            siblings: props.categories
          },
          value: propsObj.selectedOption,
          isDisabled: isDisabled,
          showValidationErrors: propsObj.showValidationErrors,
          requiredMessage: propsObj.requiredMessage
        }));
      }(category) : null, component.name === "TextBox" ? function () {
        var isDisabled = parentComponent && R.includes(parentComponent.name, ["CheckboxWithLabel", "RadioButtonWithLabel"]) && (!parentComponent.properties.isChecked && R.isEmpty(parentChangeObj.properties) || !parentChangeObj.properties.isChecked);
        var value = R.path(["properties", "value"], changeObj);

        if (parentComponent && (parentComponent.name === "CheckboxWithLabel" || parentComponent.name === "RadioButtonWithLabel") && !R.equals(parentPropsObj.isChecked, true) && !R.isNil(value) && !R.isEmpty(value)) {
          // If parent checkbox is unchecked the change object of
          // the current textbox will be removed
          removeChangeObject("".concat(anchor, ".").concat(component.anchor));
        }

        return React.createElement(TextBox, {
          id: fullAnchor,
          isDisabled: isDisabled,
          isErroneous: propsObj.isErroneous,
          isHidden: isDisabled,
          isReadOnly: propsObj.isReadOnly,
          isRequired: propsObj.isRequired,
          isValid: propsObj.isValid,
          onChanges: handleChanges,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath,
            siblings: props.categories
          },
          placeholder: propsObj.placeholder,
          title: propsObj.title,
          tooltip: propsObj.tooltip,
          value: value,
          showValidationErrors: propsObj.showValidationErrors,
          requiredMessage: propsObj.requiredMessage
        });
      }() : null, component.name === "Input" ? function (category) {
        var change = getChangeObjByAnchor(fullAnchor, props.changes);
        var parentComponent = null;
        var isDisabled = false;

        if (props.parent && props.parent.category.components) {
          parentComponent = props.parent.category.components[0];
          var parentChange = getChangeObjByAnchor("".concat(props.parent.anchor, ".").concat(parentComponent.anchor), props.changes);
          isDisabled = R.includes(parentComponent.name, ["CheckboxWithLabel", "RadioButtonWithLabel"]) && (!parentComponent.properties.isChecked && R.isEmpty(parentChange.properties) || !parentChange.properties.isChecked);
        }

        var value = change ? change.properties.value : propsObj.defaultValue;
        return React.createElement("div", {
          className: component.styleClasses
        }, React.createElement(Input, {
          id: fullAnchor,
          isDisabled: isDisabled,
          isHidden: isDisabled,
          isReadOnly: propsObj.isReadOnly,
          isRequired: propsObj.isRequired,
          isValid: propsObj.isValid,
          label: propsObj.label,
          onChanges: handleChanges,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath,
            siblings: props.categories
          },
          error: propsObj.error,
          fullWidth: propsObj.fullWidth,
          placeholder: propsObj.placeholder,
          tooltip: propsObj.tooltip,
          type: propsObj.type,
          value: value,
          width: propsObj.width,
          showValidationErrors: propsObj.showValidationErrors,
          requiredMessage: propsObj.requiredMessage
        }));
      }(category) : null, component.name === "Attachments" ? function (category) {
        var previousSibling = category.components[ii - 1] || {};
        var isPreviousSiblingCheckedByDefault = !!(previousSibling.properties || {}).isChecked;
        var previousSiblingFullAnchor = "".concat(anchor, ".").concat(previousSibling.anchor);
        var change = getChangeObjByAnchor(previousSiblingFullAnchor, props.changes);
        var isDisabled = (previousSibling.name === "CheckboxWithLabel" || previousSibling.name === "RadioButtonWithLabel") && !(isPreviousSiblingCheckedByDefault || change.properties.isChecked);
        var attachments = propsObj.attachments || [];
        return React.createElement("div", {
          className: component.styleClasses
        }, React.createElement(Attachments, {
          id: fullAnchor,
          isDisabled: isDisabled,
          onUpdate: handleChanges,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath,
            siblings: props.categories,
            attachments: attachments
          },
          messages: component.messages,
          placement: props.placement,
          isReadOnly: propsObj.isReadOnly,
          requiredMessage: propsObj.requiredMessage,
          showValidationErrors: propsObj.showValidationErrors
        }));
      }(category) : null, component.name === "StatusTextRow" ? function (category) {
        var codeMarkup = propsObj.code ? React.createElement("span", {
          className: "pr-4"
        }, propsObj.code) : null;
        return React.createElement("div", {
          className: "flex-2"
        }, React.createElement(StatusTextRow, {
          labelStyles: labelStyles,
          styleClasses: styleClasses,
          layout: component.layout,
          statusText: propsObj.statusText,
          statusTextStyleClasses: propsObj.statusTextStyleClasses,
          isHidden: propsObj.isHidden,
          isReadOnly: propsObj.isReadOnly,
          isRequired: propsObj.isRequired,
          isValid: propsObj.isValid
        }, React.createElement("div", {
          className: "flex"
        }, React.createElement("div", {
          className: "flex-1"
        }, codeMarkup, React.createElement("span", null, title)))));
      }(category) : null, component.name === "Autocomplete" ? function (category) {
        var previousSibling = category.components[ii - 1] || {};
        var isPreviousSiblingCheckedByDefault = !!(previousSibling.properties || {}).isChecked;
        var previousSiblingFullAnchor = "".concat(anchor, ".").concat(previousSibling.anchor);
        var change = getChangeObjByAnchor(previousSiblingFullAnchor, props.changes);
        var isDisabled = (previousSibling.name === "CheckboxWithLabel" || previousSibling.name === "RadioButtonWithLabel") && !(isPreviousSiblingCheckedByDefault || change.properties.isChecked);
        return React.createElement("div", {
          className: "flex-1 ".concat(component.styleClasses)
        }, React.createElement(Autocomplete, {
          callback: handleChanges,
          id: "autocomplete-".concat(idSuffix),
          isMulti: propsObj.isMulti,
          isRequired: propsObj.isRequired,
          isValid: propsObj.isValid,
          options: propsObj.options,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath,
            siblings: props.categories
          },
          placeholder: propsObj.placeholder,
          value: R.flatten([propsObj.value]),
          isDisabled: isDisabled,
          height: heights.SHORT,
          title: propsObj.title
        }));
      }(category) : null, component.name === "Difference" && React.createElement("div", {
        className: "flex-2"
      }, React.createElement(Difference, {
        applyForValue: propsObj.applyForValue,
        initialValue: propsObj.initialValue,
        onChanges: handleChanges,
        payload: {
          anchor: anchor,
          categories: category.categories,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath,
          siblings: props.categories
        },
        titles: propsObj.titles
      })), component.name === "SimpleButton" && React.createElement("div", {
        className: "".concat(component.styleClasses, " flex-2")
      }, React.createElement(SimpleButton, {
        isReadOnly: propsObj.isReadOnly,
        text: propsObj.text,
        variant: propsObj.variant,
        onClick: handleButtonClick,
        payload: {
          anchor: anchor,
          categories: category.categories,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath,
          siblings: props.categories
        }
      })), component.name === "Datepicker" && React.createElement("div", {
        className: "".concat(component.styleClasses, " flex-2")
      }, React.createElement(Datepicker, {
        text: propsObj.text,
        variant: propsObj.variant,
        onChanges: handleChanges,
        value: propsObj.value,
        isDisabled: propsObj.isDisabled,
        isHidden: propsObj.isHidden,
        clearable: propsObj.clearable,
        showTodayButton: propsObj.showTodayButton,
        error: propsObj.error,
        placeholder: propsObj.placeholder,
        fullWidth: propsObj.fullWidth,
        minDate: propsObj.minDate,
        maxDate: propsObj.maxDate,
        disablePast: propsObj.disablePast,
        disableFuture: propsObj.disableFuture,
        locale: propsObj.locale,
        messages: propsObj.localizations,
        payload: {
          anchor: anchor,
          categories: category.categories,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath,
          siblings: props.categories
        },
        requiredMessage: propsObj.requiredMessage,
        showValidationErrors: propsObj.showValidationErrors
      })));
    })), category.categories && React.createElement(CategorizedList, {
      anchor: anchor,
      categories: category.categories,
      changes: categoryChanges,
      debug: props.debug,
      getAllChanges: props.getAllChanges,
      id: "".concat(props.id, "-").concat(category.code),
      level: props.level + 1,
      parent: {
        anchor: anchor,
        category: category,
        parent: props.parent,
        rootPath: props.rootPath,
        siblings: props.categories
      },
      parentRootPath: props.rootPath,
      rootPath: props.rootPath.concat([i, "categories"]),
      runRootOperations: props.runRootOperations,
      showCategoryTitles: props.showCategoryTitles,
      onChangesUpdate: props.onChangesUpdate,
      removeChangeObject: props.removeChangeObject
    }));
  }).filter(Boolean));
}, function (prevState, nextState) {
  return R.equals(prevState.categories, nextState.categories) && R.equals(prevState.changes, nextState.changes);
});
CategorizedList.defaultProps = {
  level: 0
};
export default CategorizedList;