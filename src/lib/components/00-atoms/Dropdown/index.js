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
      ":nth-child(2)": {
        padding: "6px"
      }
    },
    minWidth: "200px"
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

  console.log(props.isTall);
  return (
    <Select
      autosize={false}
      name={props.name}
      value={props.value}
      onChange={handleChanges}
      options={props.options}
      isDisabled={props.isDisabled}
      placeholder={props.placeholder}
      className={`${props.isTall > 0 ? "h-full" : ""} 
        `}
      styles={selectCustomStyles}
      variant="contained"
      height={props.height}
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
  height: PropTypes.string
};

export default Dropdown;
