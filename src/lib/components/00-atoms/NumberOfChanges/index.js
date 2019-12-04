import React from "react";
import PropTypes from "prop-types";

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
const NumberOfChanges = props => {
  return (
    <React.Fragment>
      {props.changes && props.changes.length ? (
        <div id={props.id}>
          <span className="pr-1">Muutokset:</span>
          <span id={`${props.id}.number-of-changes`} color={props.color}>
            {props.changes.length}
          </span>
        </div>
      ) : null}
    </React.Fragment>
  );
};

NumberOfChanges.defaultProps = {
  changes: []
};

NumberOfChanges.propTypes = {
  /**
   * Array of any sort of values.
   */
  changes: PropTypes.array.isRequired,
  id: PropTypes.string,
  color: PropTypes.string
};

export default NumberOfChanges;
