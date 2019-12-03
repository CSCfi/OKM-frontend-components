import React from "react";
import '../../../css/tailwind.css';

var RadioButton = function RadioButton(props) {
  return React.createElement("input", {
    type: "radio",
    name: props.name,
    checked: props.isChecked,
    onChange: props.onChanges
  });
};

export default RadioButton;