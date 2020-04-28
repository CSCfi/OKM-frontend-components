import React, { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { COLORS } from "../../../modules/styles";
import { FormHelperText, InputLabel } from "@material-ui/core";
import { equals } from "ramda";

import "./dropdown.css";

const selectCustomStyles = {
  control: provided => ({
    ...provided,
    height: "100%",
    minHeight: "34px",
    "* span": {
      backgroundColor: "transparent"
    },
    "div:first-of-type": {
      ":nth-of-type(2)": {
        padding: "6px"
      }
    },
    minWidth: "24em"
  }),
  indicatorsContainer: provided => ({
    ...provided,
    height: "100%",
    minHeight: "100%"
  })
};

const Dropdown = React.memo(
  props => {
    const [isVisited, setIsVisited] = useState(false);
    const [, setIsFocused] = useState(false);

    const handleChanges = selectedOption => {
      props.onChanges(props.payload, { selectedOption });
    };

    return (
      <React.Fragment>
        {props.label && (
          <InputLabel id="select-label">{props.label}</InputLabel>
        )}
        <Select
          aria-label={props.name}
          autosize={false}
          name={props.name}
          value={props.value}
          onChange={handleChanges}
          options={props.options}
          isDisabled={props.isDisabled}
          isClearable={props.isClearable}
          placeholder={props.placeholder}
          className={`${props.isTall ? "h-full" : ""} 
        `}
          styles={selectCustomStyles}
          variant="contained"
          height={props.height}
          width={props.width}
          autoWidth={!props.width}
          required={props.isRequired}
          onBlurCapture={
            !props.value ? () => setIsVisited(true) : () => setIsVisited(false)
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {props.showValidationErrors && props.requiredMessage && (
          <FormHelperText
            id="component-message-text"
            style={{
              marginTop: "0.1em",
              paddingLeft: "1.2em",
              marginBottom: "0.5em",
              color: COLORS.OIVA_ORANGE_TEXT
            }}>
            {isVisited && !props.value && props.requiredMessage}
          </FormHelperText>
        )}
      </React.Fragment>
    );
  },
  (prevProps, nextProps) => {
    const isSameFunction =
      "" + prevProps.onChanges === "" + nextProps.onChanges;
    return (
      isSameFunction &&
      equals(prevProps.isDisabled, nextProps.isDisabled) &&
      equals(prevProps.value, nextProps.value) &&
      equals(prevProps.isRequired, nextProps.isRequired)
    );
  }
);

Dropdown.propTypes = {
  name: PropTypes.string,
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  onChanges: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  isTall: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  isRequired: PropTypes.bool,
  requiredMessage: PropTypes.string,
  showValidationErrors: PropTypes.bool,
  label: PropTypes.string
};

export default Dropdown;
