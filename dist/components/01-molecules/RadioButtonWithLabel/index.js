import React from "react";
import Radio from "@material-ui/core/Radio";
import { makeStyles } from "@material-ui/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Check from "@material-ui/icons/CheckBoxOutlined";
import { equals } from "ramda";
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
    return /*#__PURE__*/React.createElement(Radio, Object.assign({
      color: "default"
    }, props));
  });

  var handleChanges = function handleChanges() {
    props.onChanges(props.payload, {
      isChecked: !props.isChecked
    });
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, !props.isReadOnly ? /*#__PURE__*/React.createElement(FormGroup, {
    row: true
  }, /*#__PURE__*/React.createElement(FormControlLabel, {
    classes: {
      label: styles.label
    },
    disabled: props.isDisabled,
    control: /*#__PURE__*/React.createElement(GreenRadio, {
      id: props.payload.anchor,
      "data-anchor": props.payload.anchor,
      checked: props.isChecked,
      value: props.value,
      onChange: handleChanges
    }),
    label: props.children
  })) : props.isChecked && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row text-base mb-2"
  }, /*#__PURE__*/React.createElement(Check, null), /*#__PURE__*/React.createElement("span", {
    className: "my-auto"
  }, props.children)));
}, function (prevProps, nextProps) {
  var isSameFunction = "" + prevProps.onChanges === "" + nextProps.onChanges;
  return isSameFunction && equals(prevProps.isChecked, nextProps.isChecked);
});
export default RadioButtonWithLabel;