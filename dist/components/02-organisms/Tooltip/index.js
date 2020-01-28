import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React from "react";
import TooltipTrigger from "react-popper-tooltip";
import "react-popper-tooltip/dist/styles.css";

var Tooltip = function Tooltip(_ref) {
  var children = _ref.children,
      _tooltip = _ref.tooltip,
      hideArrow = _ref.hideArrow,
      props = _objectWithoutProperties(_ref, ["children", "tooltip", "hideArrow"]);

  return React.createElement(TooltipTrigger, Object.assign({}, props, {
    tooltip: function tooltip(_ref2) {
      var arrowRef = _ref2.arrowRef,
          tooltipRef = _ref2.tooltipRef,
          getArrowProps = _ref2.getArrowProps,
          getTooltipProps = _ref2.getTooltipProps,
          placement = _ref2.placement;
      return React.createElement("div", getTooltipProps({
        ref: tooltipRef,
        className: "tooltip-container max-w-xxs"
      }), !hideArrow && React.createElement("div", getArrowProps({
        ref: arrowRef,
        className: "tooltip-arrow",
        "data-placement": placement
      })), _tooltip);
    }
  }), function (_ref3) {
    var getTriggerProps = _ref3.getTriggerProps,
        triggerRef = _ref3.triggerRef;
    return React.createElement("span", getTriggerProps({
      ref: triggerRef,
      className: "trigger"
    }), children);
  });
};

export default Tooltip;