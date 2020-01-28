import React from "react";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Check from "@material-ui/icons/CheckBoxOutlined";
var RadioButtonWithLabel = React.memo(function (props) {
  var styles = makeStyles({
    label: props.labelStyles
  })();
  var GreenRadio = withStyles({
    root: {
      color: green[400],
      "&$checked": {
        color: green[600]
      }
    },
    checked: {}
  })(function (props) {
    return React.createElement(Radio, Object.assign({
      color: "default"
    }, props));
  });

  var handleChanges = function handleChanges() {
    props.onChanges(props.payload, {
      isChecked: !props.isChecked
    });
  };

  return React.createElement(React.Fragment, null, !props.isReadOnly ? React.createElement(FormGroup, {
    row: true
  }, React.createElement(FormControlLabel, {
    id: "label-".concat(props.payload.anchor),
    htmlFor: props.payload.anchor,
    classes: {
      label: styles.label
    },
    disabled: props.isDisabled,
    control: React.createElement(GreenRadio, {
      id: props.payload.anchor,
      "data-anchor": props.payload.anchor,
      checked: props.isChecked,
      value: props.value,
      onChange: handleChanges
    }),
    label: props.children
  })) : props.isChecked && React.createElement("div", {
    className: "flex flex-row text-base mb-2"
  }, React.createElement(Check, null), React.createElement("span", {
    className: "my-auto"
  }, props.children)));
});
export default RadioButtonWithLabel;