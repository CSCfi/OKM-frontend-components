import React, { useState, useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PropTypes from "prop-types";
import Tooltip from "../../02-organisms/Tooltip";
import { isEmpty } from "ramda";
import HelpIcon from "@material-ui/icons/Help";
import { withStyles } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import { FormHelperText } from "@material-ui/core";

import styles from "./textbox.module.css";

const textboxStyles = {
  root: {
    boxShadow: "none",
    border: "1px solid #C4C4C4",
    margin: "1px 0",
    padding: "0.5em 1em",
    "&:disabled": {
      borderColor: "transparent !important",
      paddingLeft: 0,
      paddingRight: 0,
      "& label": {
        margin: "2em"
      }
    }
  },
  requiredVisited: {
    padding: "0.5em 1em",
    boxShadow: "none",
    border: "2px solid #E5C317",
    "& label": {
      color: "#757600 !important"
    }
  },
  cssLabel: {
    top: "1em",
    position: "relative"
  },
  inputLabelShrink: {},
  inputLabelReadonly: {
    marginLeft: "-0.9em"
  }
};

const TextBox = props => {
  const [isVisited, setIsVisited] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
          <div>
            {props.title && (
              <InputLabel
                disabled={props.isDisabled || props.isReadOnly}
                htmlFor="props.id"
                shrink={(isFocused || value) && true}
                variant="outlined"
                classes={{
                  root: classes.cssLabel,
                  shrink: classes.inputLabelShrink,
                  disabled: classes.inputLabelReadonly
                }}>
                <span style={{ padding: "0 0.3em", background: "white" }}>
                  {props.title}
                  {props.isRequired && "*"}
                </span>
              </InputLabel>
            )}
            <TextareaAutosize
              aria-label={props.ariaLabel}
              disabled={props.isDisabled || props.isReadOnly}
              id={props.id}
              placeholder={
                props.isDisabled || props.isReadOnly ? "" : props.placeholder
              }
              rows={props.isReadOnly ? 1 : props.rows}
              rowsMax={props.isReadOnly ? Infinity : props.rowsMax}
              className={`${props.isHidden ? "hidden" : "rounded"} ${
                props.isReadOnly
                  ? "text-black"
                  : "border border-solid border-gray-500"
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
              onBlurCapture={() => setIsVisited(true)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              label={props.label}
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
            {props.requiredMessage && (
              <FormHelperText
                id="component-message-text"
                style={{
                  paddingLeft: "0.5em",
                  marginBottom: "0.5em",
                  color: "#757600"
                }}>
                {isVisited && !value && props.requiredMessage}
              </FormHelperText>
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
  onChanges: PropTypes.func,
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
  isVisited: PropTypes.bool,
  label: PropTypes.string,
  requiredMessage: PropTypes.string
};

export default withStyles(textboxStyles)(TextBox);
