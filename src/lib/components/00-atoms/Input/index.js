import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty } from "ramda";
import HelpIcon from "@material-ui/icons/Help";
import { FormHelperText } from "@material-ui/core";

import styles from "./input.module.css";

const inputStyles = {
  root: {
    height: "100%",
    "& .Mui-disabled": {
      color: "#333",
      paddingLeft: 0,
      paddingRight: 0
    },
    "& label.Mui-disabled": {
      transform: "translate(0, -6px) scale(0.75)"
    },
    "& input:disabled + fieldset": {
      borderColor: "transparent !important"
    }
  },
  requiredVisited: {
    "& input + fieldset ": {
      borderColor: "#E5C317",
      borderWidth: 2
    },
    "& label": {
      color: "#757600 !important"
    }
  }
};

const Input = props => {
  const [isVisited, setIsVisited] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { classes } = props;
  const [value, setValue] = useState(null);
  const [handle, setHandle] = useState(null);

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
      <div className="flex items-center">
        <TextField
          id={props.id}
          aria-label={props.ariaLabel}
          defaultValue={props.value}
          label={props.label}
          disabled={props.isDisabled || props.isReadOnly}
          inputprops={{
            readOnly: props.isReadOnly
          }}
          placeholder={
            props.isDisabled || props.isReadOnly ? "" : props.placeholder
          }
          rows={props.rows}
          margin={props.isDense ? "dense" : ""}
          rowsMax={props.rowsMax}
          onChange={updateValue}
          required={props.isRequired}
          error={
            props.error
              ? props.error
              : (props.isRequired && value && !props.isValid) ||
                (!props.isRequired && !props.isValid)
          }
          InputLabelProps={props.isReadOnly ? { shrink: true } : {}}
          variant="outlined"
          style={
            props.fullWidth
              ? { border: "none" }
              : { width: props.width, border: "none" }
          }
          fullWidth={props.fullWidth}
          type={props.type}
          onBlurCapture={
            !props.value ? () => setIsVisited(true) : () => setIsVisited(false)
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`${props.isHidden ? "hidden" : ""} 
          ${
            isVisited && props.isRequired && !value && !isFocused
              ? classes.requiredVisited
              : classes.root
          } 
        `}
        />
        {!props.readOnly && !isEmpty(props.tooltip) && (
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
      {props.requiredMessage && (
        <FormHelperText
          id="component-message-text"
          style={{
            marginTop: "0.1em",
            paddingLeft: "1.2em",
            marginBottom: "0.5em",
            color: "#757600"
          }}>
          {isVisited && !value && props.requiredMessage}
        </FormHelperText>
      )}
    </React.Fragment>
  );
};

Input.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  isDisabled: false,
  isHidden: false,
  isReadOnly: false,
  isRequired: false,
  isValid: true,
  payload: {},
  placeholder: "",
  rows: 1,
  rowsMax: 1,
  error: false,
  width: "20em",
  fullWidth: false,
  tooltip: {},
  type: "text",
  isVisited: false,
  isDense: true
};

Input.propTypes = {
  ariaLabel: PropTypes.string,
  delay: PropTypes.number,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  isRequired: PropTypes.bool,
  isValid: PropTypes.bool,
  label: PropTypes.string,
  /** Is called with the payload and the value. */
  onChanges: PropTypes.func,
  /** Custom object defined by user. */
  payload: PropTypes.object,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  error: PropTypes.bool,
  tooltip: PropTypes.object,
  width: PropTypes.string,
  fullWidth: PropTypes.bool,
  type: PropTypes.string,
  isVisited: PropTypes.bool,
  isDense: PropTypes.bool
};

export default withStyles(inputStyles)(Input);
