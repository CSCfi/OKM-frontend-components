import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty } from "ramda";
import HelpIcon from "@material-ui/icons/Help";

import styles from "./input.module.css";

const inputStyles = {
  root: {},
  requiredVisited: {
    "& input:invalid + fieldset ": {
      borderColor: "orange"
    }
  }
};

const Input = props => {
  const [isVisited, setIsVisited] = useState(false);
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
        margin="dense"
        rowsMax={props.rowsMax}
        onChange={updateValue}
        required={props.isRequired}
        isValid={props.isValid}
        error={props.error}
        InputLabelProps={props.isReadOnly ? { shrink: true } : {}}
        variant="outlined"
        style={
          props.fullWidth
            ? { border: "none" }
            : { width: props.width, border: "none" }
        }
        fullWidth={props.fullWidth}
        type={props.type}
        onFocus={() => setIsVisited(true)}
        className={`${props.isHidden ? "hidden" : ""} ${
          isVisited & props.isRequired ? classes.requiredVisited : classes.root
        }
        `}
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
  isVisited: false
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
  onChanges: PropTypes.func.isRequired,
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
  isVisited: PropTypes.bool
};

export default withStyles(inputStyles)(Input);
