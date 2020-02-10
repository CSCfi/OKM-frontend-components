import React from "react";
import Input from "../../00-atoms/Input";
import PropTypes from "prop-types";

/**
 * SearchFilter wraps a TextBox, stripping away payload and propagating only
 * the unwrapped value to callback.
 * @param props
 * @returns {*}
 * @constructor
 */
const SearchFilter = (props) => {
  const handleChanges = (_, changePayload) => {
    props.onValueChanged(changePayload.value);
  };

  return (
    <React.Fragment>
      <Input placeholder={props.placeholder} onChanges={handleChanges} />
    </React.Fragment>
  )
};

SearchFilter.propTypes = {
  onValueChanged: PropTypes.func,
  placeholder: PropTypes.string
};

export default SearchFilter;
