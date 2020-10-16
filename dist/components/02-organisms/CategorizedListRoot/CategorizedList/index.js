import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import React, { useCallback } from "react";
import RadioButtonWithLabel from "../../../01-molecules/RadioButtonWithLabel";
import CheckboxWithLabel from "../../../01-molecules/CheckboxWithLabel";
import StatusTextRow from "../../../01-molecules/StatusTextRow";
import Autocomplete from "../../../02-organisms/Autocomplete";
import Multiselect from "../../../02-organisms/Multiselect";
import Difference from "../../../02-organisms/Difference";
import SimpleButton from "../../../00-atoms/SimpleButton";
import { heights } from "../../../../css/autocomplete";
import { flattenObj } from "../../../../utils/common";
import Datepicker from "../../../00-atoms/Datepicker";
import Dropdown from "../../../00-atoms/Dropdown";
import AlertMessage from "../../../00-atoms/Alert";
import TextBox from "../../../00-atoms/TextBox";
import Input from "../../../00-atoms/Input";
import Attachments from "../../Attachments";
import * as R from "ramda";
import { map } from "lodash";
import CategoryFilter from "../../CategoryFilter";
import FileUpload from "../../FileUpload";
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
/**
 * With a layout strategy you can influence to paddings and margins
 * of a CategorizedList. Default setting sets use evenly spacing and
 * "groups" tries to separate category paths / threes from each other.
 */

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

  /**
   * Default layout strategy is set here. You can change the strategy by
   * giving the category a layout property with desired strategy.
   * E.g. layout: { strategy: { key: "groups" }}
   **/
  layoutStrategy: R.find(R.propEq("key", "default"), layoutStrategies),
  margins: {
    top: categoryStyleMapping.margins.extraSmall
  }
};
/**
 * Returns a change object by the given anchor.
 * @param {string} anchor - Identifies the change object that is being searched for.
 * @param {array} changes - Array of change objects.
 * @returns {object} - Change object.
 */

var getChangeObjByAnchor = function getChangeObjByAnchor(anchor, changes) {
  return R.find(R.propEq("anchor", anchor), changes) || {
    properties: {}
  };
};
/**
 * Combines the properties of the component with the properties of the
 * change object.
 * @param {object} changeObj - Change object.
 * @param {object} component - Node / component of a form.
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
/**
 * CategorizedList loops through the form structure and handles everything in it.
 * It has a render function where it creates - if needed - more CategorizedLists.
 * The end result is group of DOM elements. The group will be returned to the
 * CategorizedListRoot component and it will pass it forward to the component
 * that uses the CategorizedListRoot. When user makes changes on to the form the
 * form structure will be gone through again and so the form will be updated.
 */


var CategorizedList = function CategorizedList(props) {
  var onChangesUpdate = props.onChangesUpdate,
      showValidationErrors = props.showValidationErrors;
  /**
   * Click of the SimpleButton is handled here.
   * @param {object} - Object that includes some properties.
   * @param {object} changeProps - Changed properties with their forthcoming states.
   */

  var handleButtonClick = function handleButtonClick(payload, changeProps) {
    /**
     * SimpleButton component is part of the payload. It's onClick method
     * will be called. If you like to find the onClick method browse the
     * current form structure.
     **/
    payload.component.onClick(payload, changeProps);
  };
  /**
   * This is the most common handling function for the components
   * in CategorizedList's scope. Please note that metadata of
   * change objects will be attached to them in this function.
   * The idea behind the code is to call onChangeUpdate callback
   * function with a change object related to the component that
   * user has interacted with.
   */


  var handleChanges = useCallback(function (payload, changeProps) {
    var changeObj = {
      anchor: "".concat(R.compose(R.join("."), R.tail(), R.split("."))(payload.anchor), ".").concat(payload.component.anchor),
      properties: R.reject(R.isNil)(_objectSpread({}, changeProps, {
        metadata: R.path(["component", "properties", "forChangeObject"], payload)
      }))
    };
    return onChangesUpdate(changeObj);
  }, [onChangesUpdate]);
  /**
   * Rendering starts here.
   */

  return /*#__PURE__*/React.createElement("div", {
    "data-anchor": props.anchor
  },
  /**
  * Categories will be looped here.
  */
  map(props.categories, function (category, i) {
    if (category.isVisible === false) {
      return null;
    }
    /**
     * Category can have a title. !props.showCategoryTitles means
     * that the title won't be shown in UI. You can see the whole
     * visibility rule under this code comment.
     */


    var isCategoryTitleVisible = props.showCategoryTitles && !!(category.code || category.title); // Anchor identifies a change object.

    var anchor = "".concat(props.anchor, ".").concat(category.anchor);
    /**
     * R = Ramda library (https://ramdajs.com/docs/). Dot is the
     * default separator of an anchor chain.
     **/

    var splittedAnchor = R.split(".", anchor);
    /**
     * props.changes includes all the changes of current form. The
     * unrelevant ones will be filtered out and the relevant ones
     * will be stored into categoryChanges variable.
     */

    var categoryChanges = R.filter(R.compose(R.equals(splittedAnchor), R.slice(0, splittedAnchor.length), R.split("."), R.prop("anchor")), props.changes); // Category related layout styles.

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
    }; // Component related layout styles.

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
    /**
     * A single category can have multiple components. The title section
     * of the category will be rendered first and the components will be
     * looped through after it.
     **/

    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: R.join(" ", categoryClasses),
      "data-level": props.level,
      id: anchor
    }, isCategoryTitleVisible && /*#__PURE__*/React.createElement("div", {
      className: categoryTitleClasses
    }, /*#__PURE__*/React.createElement("h4", null, category.code && /*#__PURE__*/React.createElement("span", {
      className: "mr-4"
    }, category.code), /*#__PURE__*/React.createElement("span", null, category.title), !category.isReadOnly && category.isRequired && /*#__PURE__*/React.createElement("span", {
      className: "pr-4"
    }, "*"))), /*#__PURE__*/React.createElement("div", {
      className: R.join(" ", componentContainerClasses)
    }, map(category.components, function (component, ii) {
      var fullAnchor = "".concat(anchor, ".").concat(component.anchor);
      var fullPath = props.rootPath.concat([i, "components", ii]);
      var changeObj = getChangeObjByAnchor(fullAnchor, props.changes);
      var parentComponent = props.parent && props.parent.category.components ? props.parent.category.components[0] : null;
      var parentChangeObj = parentComponent ? getChangeObjByAnchor("".concat(props.parent.anchor, ".").concat(parentComponent.anchor), props.changes) : {};
      /**
       * Override component properties with the change object properties
       * to display the state after changes.
       */

      var propsObj = getPropertiesObject(changeObj, component); // isAddition and isRemoved exist for styling purposes.

      var isAddition = !!changeObj.properties.isChecked;
      var isRemoved = R.has("isChecked")(changeObj.properties) && !changeObj.properties.isChecked;
      var labelStyles = Object.assign({}, isAddition ? (propsObj.labelStyles || {}).addition : {}, isRemoved ? (propsObj.labelStyles || {}).removal : {}, (propsObj.labelStyles || {}).custom || {});
      var styleClasses = component.styleClasses || [];
      var title = propsObj.title + (props.debug ? props.rootPath.concat([i, "components", ii]) : "");

      if (propsObj.isVisible === false) {
        return null;
      }
      /**
       * Component is defined in a form structure. There can be
       * different sort of components and their all need the
       * proper parameters. If you must add more components on
       * the following list please define how the component's
       * callback functions should be handled. And remember to
       * import the component in the beginning of this file.
       **/


      return /*#__PURE__*/React.createElement(React.Fragment, {
        key: "item-".concat(ii)
      }, component.name === "CheckboxWithLabel" && /*#__PURE__*/React.createElement("div", {
        className: component.styleClasses
      }, /*#__PURE__*/React.createElement(CheckboxWithLabel, {
        id: fullAnchor,
        name: component.name,
        isChecked: propsObj.isChecked,
        isDisabled: propsObj.isDisabled,
        isIndeterminate: propsObj.isIndeterminate,
        isReadOnly: propsObj.isReadOnly,
        onChanges: handleChanges,
        payload: {
          anchor: anchor,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath
        },
        labelStyles: labelStyles
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex"
      }, /*#__PURE__*/React.createElement("span", {
        className: "leading-none"
      }, propsObj.code), /*#__PURE__*/React.createElement("p", {
        className: "ml-4 leading-none"
      }, title)))), component.name === "RadioButtonWithLabel" && /*#__PURE__*/React.createElement("div", {
        className: "flex-2"
      }, /*#__PURE__*/React.createElement(RadioButtonWithLabel, {
        id: fullAnchor,
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
          rootPath: props.rootPath
        },
        labelStyles: labelStyles,
        value: propsObj.value,
        className: "flex-row"
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex"
      }, /*#__PURE__*/React.createElement("span", {
        className: "leading-none"
      }, propsObj.code), /*#__PURE__*/React.createElement("p", {
        className: "ml-4 leading-none"
      }, title)))), component.name === "Dropdown" ? function (category) {
        var previousSibling = category.components[ii - 1] || {};
        var isPreviousSiblingCheckedByDefault = !!(previousSibling.properties || {}).isChecked;
        var previousSiblingFullAnchor = "".concat(anchor, ".").concat(previousSibling.anchor);
        var change = getChangeObjByAnchor(previousSiblingFullAnchor, props.changes);
        var isDisabled = (previousSibling.name === "CheckboxWithLabel" || previousSibling.name === "RadioButtonWithLabel") && !(isPreviousSiblingCheckedByDefault || change.properties.isChecked);
        return /*#__PURE__*/React.createElement("div", {
          className: component.styleClasses || "px-2 mb-1"
        }, /*#__PURE__*/React.createElement(Dropdown, {
          id: fullAnchor,
          onChanges: handleChanges,
          options: propsObj.options,
          fullWidth: true,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath
          },
          placeholder: propsObj.placeholder,
          value: propsObj.selectedOption,
          isDisabled: isDisabled,
          showValidationErrors: showValidationErrors,
          requiredMessage: propsObj.requiredMessage
        }));
      }(category) : null, component.name === "TextBox" ? function () {
        var isDisabled = parentComponent && R.includes(parentComponent.name, ["CheckboxWithLabel", "RadioButtonWithLabel"]) && (!parentComponent.properties.isChecked && R.isEmpty(parentChangeObj.properties) || parentChangeObj.properties.isChecked === false);
        return /*#__PURE__*/React.createElement(TextBox, {
          id: fullAnchor,
          isDisabled: isDisabled,
          isErroneous: propsObj.isErroneous,
          isHidden: isDisabled,
          isReadOnly: propsObj.isReadOnly,
          isRemovable: propsObj.isRemovable,
          isRequired: propsObj.isRequired,
          isValid: propsObj.isValid,
          onChanges: handleChanges,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath
          },
          placeholder: propsObj.placeholder,
          title: propsObj.title,
          tooltip: propsObj.tooltip,
          value: propsObj.value,
          showValidationErrors: showValidationErrors,
          requiredMessage: propsObj.requiredMessage
        });
      }() : null, component.name === "Input" ? function (category) {
        var parentComponent = null;
        var isDisabled = false;

        if (props.parent && props.parent.category.components) {
          parentComponent = props.parent.category.components[0];
          var parentChange = getChangeObjByAnchor("".concat(props.parent.anchor, ".").concat(parentComponent.anchor), props.changes);
          isDisabled = R.includes(parentComponent.name, ["CheckboxWithLabel", "RadioButtonWithLabel"]) && (!parentComponent.properties.isChecked && R.isEmpty(parentChange.properties) || !parentChange.properties.isChecked);
        }

        return /*#__PURE__*/React.createElement("div", {
          className: component.styleClasses
        }, /*#__PURE__*/React.createElement(Input, {
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
            rootPath: props.rootPath
          },
          error: propsObj.error,
          fullWidth: propsObj.fullWidth,
          width: propsObj.width,
          placeholder: propsObj.placeholder,
          tooltip: propsObj.tooltip,
          type: propsObj.type,
          value: propsObj.value,
          showValidationErrors: showValidationErrors,
          requiredMessage: propsObj.requiredMessage
        }));
      }(category) : null, component.name === "Attachments" ? function (category) {
        var previousSibling = category.components[ii - 1] || {};
        var isPreviousSiblingCheckedByDefault = !!(previousSibling.properties || {}).isChecked;
        var previousSiblingFullAnchor = "".concat(anchor, ".").concat(previousSibling.anchor);
        var change = getChangeObjByAnchor(previousSiblingFullAnchor, props.changes);
        var isDisabled = (previousSibling.name === "CheckboxWithLabel" || previousSibling.name === "RadioButtonWithLabel") && !(isPreviousSiblingCheckedByDefault || change.properties.isChecked);
        var attachments = propsObj.attachments || [];
        return /*#__PURE__*/React.createElement("div", {
          className: component.styleClasses
        }, /*#__PURE__*/React.createElement(Attachments, {
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
            attachments: attachments
          },
          messages: component.messages,
          placement: props.placement,
          isReadOnly: propsObj.isReadOnly,
          isRequired: propsObj.isRequired,
          requiredMessage: propsObj.requiredMessage,
          showValidationErrors: showValidationErrors
        }));
      }(category) : null, component.name === "StatusTextRow" ? function () {
        return /*#__PURE__*/React.createElement("div", {
          className: "flex-2"
        }, /*#__PURE__*/React.createElement(StatusTextRow, {
          code: propsObj.code,
          labelStyles: labelStyles,
          styleClasses: styleClasses,
          layout: component.layout,
          statusText: propsObj.statusText,
          statusTextStyleClasses: propsObj.statusTextStyleClasses,
          isHidden: propsObj.isHidden,
          isReadOnly: propsObj.isReadOnly,
          isRequired: propsObj.isRequired,
          isValid: propsObj.isValid,
          title: propsObj.title
        }));
      }(category) : null, component.name === "Alert" ? function () {
        var hasCheckableParent = parentComponent && R.includes(parentComponent.name, ["CheckboxWithLabel", "RadioButtonWithLabel"]);
        var isHiddenByParentComponent = hasCheckableParent && (!parentComponent.properties.isChecked && R.isEmpty(parentChangeObj.properties) || parentChangeObj.properties.isChecked === false);
        var isVisible = hasCheckableParent ? !isHiddenByParentComponent : props.isVisible;
        return /*#__PURE__*/React.createElement("div", {
          className: "flex-1 mb-2 ".concat(component.styleClasses)
        }, /*#__PURE__*/React.createElement(AlertMessage, {
          id: fullAnchor,
          ariaLabel: propsObj.ariaLabel,
          type: propsObj.type,
          title: propsObj.title,
          message: propsObj.message,
          isVisible: isVisible,
          link: propsObj.link,
          linkUrl: propsObj.linkUrl,
          linkText: propsObj.linkText,
          handleLinkClick: propsObj.handleLinkClick,
          onChanges: handleChanges,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath
          }
        }));
      }(category) : null, component.name === "FileUpload" ? function () {
        return /*#__PURE__*/React.createElement("div", {
          className: "flex-2"
        }, /*#__PURE__*/React.createElement(FileUpload, {
          acceptedTypes: props.acceptedTypes,
          isReadOnly: propsObj.isReadOnly,
          maxSize: propsObj.maxSize,
          messages: component.messages,
          minSize: propsObj.minSize,
          onChanges: handleChanges,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath
          },
          uploadedFiles: propsObj.uploadedFiles
        }));
      }(category) : null, component.name === "Multiselect" ? function (category) {
        var previousSibling = category.components[ii - 1] || {};
        var isPreviousSiblingCheckedByDefault = !!(previousSibling.properties || {}).isChecked;
        var previousSiblingFullAnchor = "".concat(anchor, ".").concat(previousSibling.anchor);
        var change = getChangeObjByAnchor(previousSiblingFullAnchor, props.changes);
        var isDisabled = (previousSibling.name === "CheckboxWithLabel" || previousSibling.name === "RadioButtonWithLabel") && !(isPreviousSiblingCheckedByDefault || change.properties.isChecked);
        return /*#__PURE__*/React.createElement("div", {
          className: "flex-1 ".concat(component.styleClasses)
        }, /*#__PURE__*/React.createElement(Multiselect, {
          ariaLabel: propsObj.ariaLabel,
          callback: handleChanges,
          id: fullAnchor,
          isDisabled: isDisabled,
          isMulti: propsObj.isMulti,
          isRequired: propsObj.isRequired,
          isReadOnly: propsObj.isReadOnly,
          isValid: propsObj.isValid,
          options: propsObj.options,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath
          },
          placeholder: propsObj.placeholder,
          value: R.flatten([propsObj.value]),
          height: heights.SHORT,
          width: propsObj.width,
          autoSize: propsObj.autoSize,
          title: propsObj.title
        }));
      }(category) : null, component.name === "Autocomplete" ? function (category) {
        var previousSibling = category.components[ii - 1] || {};
        var isPreviousSiblingCheckedByDefault = !!(previousSibling.properties || {}).isChecked;
        var previousSiblingFullAnchor = "".concat(anchor, ".").concat(previousSibling.anchor);
        var change = getChangeObjByAnchor(previousSiblingFullAnchor, props.changes);
        var isDisabled = (previousSibling.name === "CheckboxWithLabel" || previousSibling.name === "RadioButtonWithLabel") && !(isPreviousSiblingCheckedByDefault || change.properties.isChecked);
        return /*#__PURE__*/React.createElement("div", {
          className: "flex-1 ".concat(component.styleClasses)
        }, /*#__PURE__*/React.createElement(Autocomplete, {
          callback: handleChanges,
          id: fullAnchor,
          isMulti: propsObj.isMulti,
          isRequired: propsObj.isRequired,
          isReadOnly: propsObj.isReadOnly,
          isValid: propsObj.isValid,
          options: propsObj.options,
          payload: {
            anchor: anchor,
            categories: category.categories,
            component: component,
            fullPath: fullPath,
            parent: props.parent,
            rootPath: props.rootPath
          },
          placeholder: propsObj.placeholder,
          value: R.flatten([propsObj.value]),
          isDisabled: isDisabled,
          height: heights.SHORT,
          short: component.short,
          title: propsObj.title
        }));
      }(category) : null, component.name === "Difference" && /*#__PURE__*/React.createElement("div", {
        className: "flex-2"
      }, /*#__PURE__*/React.createElement(Difference, {
        applyForValue: propsObj.applyForValue,
        initialValue: propsObj.initialValue,
        onChanges: handleChanges,
        payload: {
          anchor: anchor,
          categories: category.categories,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath
        },
        titles: propsObj.titles
      })), component.name === "SimpleButton" && /*#__PURE__*/React.createElement("div", {
        className: "".concat(component.styleClasses, " flex-2")
      }, /*#__PURE__*/React.createElement(SimpleButton, {
        isReadOnly: propsObj.isReadOnly,
        text: propsObj.text,
        variant: propsObj.variant,
        icon: propsObj.icon,
        iconFontSize: propsObj.iconFontSize,
        onClick: handleButtonClick,
        payload: {
          anchor: anchor,
          categories: category.categories,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath
        }
      })), component.name === "Datepicker" && /*#__PURE__*/React.createElement("div", {
        className: "".concat(component.styleClasses, " flex-2")
      }, /*#__PURE__*/React.createElement(Datepicker, {
        label: propsObj.label,
        variant: propsObj.variant,
        onChanges: handleChanges,
        value: propsObj.value,
        isDisabled: propsObj.isDisabled,
        isHidden: propsObj.isHidden,
        isRequired: propsObj.isRequired,
        clearable: propsObj.clearable,
        showTodayButton: propsObj.showTodayButton,
        error: propsObj.error,
        placeholder: propsObj.placeholder,
        fullWidth: propsObj.fullWidth,
        width: propsObj.width,
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
          rootPath: props.rootPath
        },
        isReadOnly: propsObj.isReadOnly,
        requiredMessage: propsObj.requiredMessage,
        showValidationErrors: showValidationErrors
      })), component.name === "CategoryFilter" && /*#__PURE__*/React.createElement("div", {
        className: "".concat(component.styleClasses, " flex-2")
      }, /*#__PURE__*/React.createElement(CategoryFilter, {
        anchor: propsObj.anchor,
        changeObjectsByProvince: propsObj.changeObjectsByProvince,
        isEditViewActive: propsObj.isEditViewActive,
        localizations: propsObj.localizations,
        municipalities: propsObj.municipalities,
        provinces: propsObj.provinces,
        provincesWithoutMunicipalities: propsObj.provincesWithoutMunicipalities,
        showCategoryTitles: propsObj.showCategoryTitles,
        toggleEditView: propsObj.toggleEditView,
        onChanges: propsObj.onChanges,
        payload: {
          anchor: anchor,
          categories: category.categories,
          component: component,
          fullPath: fullPath,
          parent: props.parent,
          rootPath: props.rootPath
        }
      })));
    })),
    /**
    * Important! If the current category has child categories
    * new instance of the CategorizedList component will be created.
    * The structure can therefore have multiple levels.
    * Please read the wiki dokument about the CategorizedList for
    * more information.
    **/
    category.categories && /*#__PURE__*/React.createElement(CategorizedList, {
      anchor: anchor,
      categories: category.categories,
      changes: categoryChanges,
      debug: props.debug,
      id: "".concat(props.id, "-").concat(category.code),
      level: props.level + 1,
      parent: {
        anchor: anchor,
        category: category,
        parent: props.parent,
        rootPath: props.rootPath
      },
      parentRootPath: props.rootPath,
      rootPath: props.rootPath.concat([i, "categories"]),
      runRootOperations: props.runRootOperations,
      showCategoryTitles: props.showCategoryTitles,
      onChangesUpdate: props.onChangesUpdate,
      showValidationErrors: showValidationErrors,
      requiredMessage: props.requiredMessage
    }));
  }).filter(Boolean));
};

CategorizedList.defaultProps = {
  level: 0
};
CategorizedList.displayName = "CategorizedList222";
export default CategorizedList;