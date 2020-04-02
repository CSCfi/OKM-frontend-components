import React from "react";
import { COLORS } from "../../../modules/styles";
/**
 * Components
 * @namespace components
 * @property {module:00-atoms}
 */

/**
 * @module 00-atoms
 * @instance
 * */

/**
 * The component is able to show the number of changes. If there aren't any changes it renders nothing.
 */

var NumberOfChanges = function NumberOfChanges(props) {
  return React.createElement(React.Fragment, null, props.changes && props.changes.length ? React.createElement("div", {
    id: props.id
  }, React.createElement("span", {
    className: "pr-1"
  }, "Muutokset:"), React.createElement("span", {
    id: "".concat(props.id, ".number-of-changes"),
    color: COLORS.OIVA_PURPLE
  }, props.changes.length)) : null);
};

NumberOfChanges.defaultProps = {
  changes: []
};
export default NumberOfChanges;