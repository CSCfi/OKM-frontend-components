import React from "react";
import TextBox from "../../00-atoms/TextBox";

/**
 * SearchFilter wraps a TextBox, stripping away payload and propagating only
 * the unwrapped value to callback.
 * @param props
 * @returns {*}
 * @constructor
 */
var SearchFilter = function SearchFilter(props) {
  var handleChanges = function handleChanges(_, changePayload) {
    props.onValueChanged(changePayload.value);
  };

  return React.createElement(React.Fragment, null, React.createElement(TextBox, {
    placeholder: props.placeholder,
    onChanges: handleChanges
  }));
};

export default SearchFilter;