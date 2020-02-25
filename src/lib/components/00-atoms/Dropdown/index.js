import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

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

const Dropdown = React.memo(props => {
  const handleChanges = selectedOption => {
    props.onChanges(props.payload, { selectedOption });
  };

  return (
    <Select
      autosize={false}
      name={props.name}
      value={props.value}
      onChange={handleChanges}
      options={props.options}
      isDisabled={props.isDisabled}
      placeholder={props.placeholder}
      className={`${props.isTall ? "h-full" : ""} 
        `}
      styles={selectCustomStyles}
      variant="contained"
      height={props.height}
      width={props.width}
      autoWidth={!props.width}
      required={props.isRequired}
    />
  );
});

Dropdown.propTypes = {
  name: PropTypes.string,
  isDisabled: PropTypes.bool,
  onChanges: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.object,
  isTall: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  isRequired: PropTypes.bool
};

export default Dropdown;
