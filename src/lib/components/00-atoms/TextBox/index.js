import React, { useState, useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PropTypes from "prop-types";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty, propSatisfies } from "ramda";
import HelpIcon from "@material-ui/icons/Help";
import { withStyles } from "@material-ui/core";

import styles from "./textbox.module.css";

const textboxStyles = {
  root: {
    boxShadow: "none",
    border: "1px solid #C4C4C4"
  },
  requiredVisited: {
    boxShadow: "none",
    border: "1px solid orange"
  }
};

const TextBox = props => {
  const [isVisited, setIsVisited] = useState(false);
  const [value, setValue] = useState(null);
  const [handle, setHandle] = useState(null);
  const { classes } = props;

  const updateValue = e => {
    setValue(e.target.value);
    if (handle) {
      clearTimeout(handle);
    }
    setHandle(
      (v => {
        return setTimeout(() => {
          props.onChanges(props.payload, { value: v });
        }, props.delay);
      })(e.target.value)
    );
  };

  useEffect(() => {
    if (props.value !== value || !value) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <React.Fragment>
      {value !== null ? (
        <React.Fragment>
          {props.title && (
            <label className="text-bold text-base block my-2">
              {props.isRequired && (
                <span
                  className={`text-${
                    props.isValid ? "green" : "red"
                  }-500 text-2xl pr-4`}>
                  *
                </span>
              )}
              {props.title}
            </label>
          )}
          <div className="flex">
            <TextareaAutosize
              aria-label={props.ariaLabel}
              disabled={props.isDisabled || props.isReadOnly}
              id={props.id}
              placeholder={
                props.isDisabled || props.isReadOnly ? "" : props.placeholder
              }
              rows={props.isReadOnly ? 1 : props.rows}
              rowsMax={props.isReadOnly ? Infinity : props.rowsMax}
              className={`${props.isHidden ? "hidden" : ""} ${
                props.isReadOnly
                  ? "text-black"
                  : "border border-solid border-gray-500 rounded"
              } ${
                isVisited && props.isRequired && !value
                  ? classes.requiredVisited
                  : classes.root
              } w-full p-2 resize-none`}
              onChange={updateValue}
              value={value}
              inputprops={{
                readOnly: props.isReadOnly
              }}
              onFocus={() => setIsVisited(true)}
            />
            {!isEmpty(props.tooltip) && (
              <div className="ml-8">
                <Tooltip tooltip={props.tooltip.text} trigger="click">
                  <HelpIcon
                    classes={{
                      colorPrimary: styles.tooltipBg
                    }}
                    color="primary"
                  />
                </Tooltip>
              </div>
            )}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

TextBox.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  isDisabled: false,
  isHidden: false,
  payload: {},
  placeholder: "",
  isReadOnly: false,
  isRequired: false,
  isValid: true,
  rows: 2,
  rowsMax: 100,
  title: "",
  tooltip: {},
  isVisited: false
};

TextBox.propTypes = {
  ariaLabel: PropTypes.string,
  delay: PropTypes.number,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  /** Is called with the payload and the value. */
  onChanges: PropTypes.func.isRequired,
  /** Custom object defined by user. */
  payload: PropTypes.object,
  placeholder: PropTypes.string,
  isErroneous: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  isValid: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  title: PropTypes.string,
  tooltip: PropTypes.object,
  value: PropTypes.string,
  isVisited: PropTypes.bool
};

export default withStyles(textboxStyles)(TextBox);
