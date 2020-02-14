import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import PropTypes from "prop-types";
import chroma from "chroma-js";
import { heights, autocompleteShortStyles } from "../../../css/autocomplete";
import SearchIcon from "@material-ui/icons/Search";

const Autocomplete = React.memo(props => {
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);
  const [isOptionsShown, setIsOptionsShown] = useState(false);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const orderOptions = values => {
    return values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed));
  };

  const optionStyles = {
    ...(props.height === heights.SHORT ? autocompleteShortStyles : null),

    control:
      props.height === heights.SHORT
        ? autocompleteShortStyles.control
        : styles => ({
            ...styles,
            backgroundColor: "white"
          }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma("#c3dafe");
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
          ? data.color
          : isFocused
          ? color.css()
          : null,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.color,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor:
            !isDisabled && (isSelected ? data.color : color.css())
        }
      };
    },
    indicatorSeparator: styles => ({ display: "none" }),
    menu: styles => ({ ...styles, zIndex: 999 }),
    multiValue: styles => {
      const color = chroma("#c3dafe");
      return {
        ...styles,
        backgroundColor: color.css()
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: data.color
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: data.color,
      ":hover": {
        backgroundColor: data.color,
        color: "#666666"
      }
    })
  };

  const handleSelectChange = (value, { action, removedValue }) => {
    switch (action) {
      case "remove-value":
      case "pop-value":
        if (removedValue && removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = options.filter(v => v.isFixed);
        break;
      default:
        break;
    }
    props.callback(props.payload, {
      value: Array.isArray(value) ? orderOptions(value) : value
    });
  };

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  const searchFilter = (option, searchText) => {
    return option.data.label.toLowerCase().includes(searchText.toLowerCase());
  };

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <SearchIcon />
      </components.DropdownIndicator>
    );
  };

  const onInputChange = value => {
    if (value.length >= props.minChars) {
      setIsOptionsShown(true);
    } else {
      setIsOptionsShown(false);
    }
  };

  return (
    <React.Fragment>
      {props.title && (
        <label className="block py-2">
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
      <Select
        autosize={props.autosize}
        name={props.name}
        isMulti={props.isMulti}
        value={value}
        onChange={handleSelectChange}
        placeholder={props.placeholder}
        inputProps={{
          id: "select-multiple"
        }}
        options={isOptionsShown ? options : []}
        getOptionLabel={option => `${option.label}`}
        getOptionValue={option => `${option.value}`}
        isSearchable={true}
        searchFilter={searchFilter}
        styles={optionStyles}
        components={props.isFilter && { DropdownIndicator }}
        hideSelectedOptions={props.isFilter}
        onInputChange={onInputChange}
        menuIsOpen={isOptionsShown}
        width={props.width}
      />
    </React.Fragment>
  );
});

Autocomplete.defaultProps = {
  isMulti: true,
  isRequired: false,
  isValid: true,
  placeholder: "Valitse...",
  value: [],
  isFilter: false,
  minChars: 3,
  width: "100%",
  autoSize: false
};

Autocomplete.propTypes = {
  isMulti: PropTypes.bool,
  isRequired: PropTypes.bool,
  isValid: PropTypes.bool,
  name: PropTypes.string,
  callback: PropTypes.func,
  options: PropTypes.array,
  payload: PropTypes.object,
  placeholder: PropTypes.string,
  value: PropTypes.array,
  height: PropTypes.string,
  title: PropTypes.string,
  isFilter: PropTypes.bool,
  minChars: PropTypes.number,
  width: PropTypes.string,
  autosize: PropTypes.bool
};

export default Autocomplete;
