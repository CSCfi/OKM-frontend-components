import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import Checkbox from "@material-ui/core/Checkbox";
import green from "@material-ui/core/colors/green";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as R from "ramda";
import { isEqual } from "lodash";
import Check from "@material-ui/icons/CheckBoxOutlined";
/**
 * @module Components/01-molecules
 */

/**
 * Label and checkbox united.
 * @example
 * const size = 12
 * const text = 'I am documented!'
 * return (
 *   <Documented size={size} text={text} />
 * )
 */

var CheckboxWithLabel = React.memo(function (_ref) {
  var children = _ref.children,
      isChecked = _ref.isChecked,
      isDisabled = _ref.isDisabled,
      isIndeterminate = _ref.isIndeterminate,
      isReadOnly = _ref.isReadOnly,
      labelStyles = _ref.labelStyles,
      onChanges = _ref.onChanges,
      payload = _ref.payload;
  var styles = makeStyles({
    root: {
      color: green[600],
      "&$checked": {
        color: green[500]
      }
    },
    label: labelStyles,
    checked: {} // This object must be empty for checked color to work.

  })();
  var handleChanges = useCallback(function () {
    onChanges(payload, {
      isChecked: !isChecked
    });
  }, [isChecked, onChanges, payload]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !isReadOnly ? /*#__PURE__*/React.createElement(FormGroup, {
    row: true
  }, /*#__PURE__*/React.createElement(FormControlLabel, {
    classes: {
      label: styles.label
    },
    disabled: isDisabled,
    control: /*#__PURE__*/React.createElement(Checkbox, {
      checked: isChecked,
      indeterminate: isChecked && isIndeterminate,
      value: "1",
      onChange: handleChanges,
      readOnly: isReadOnly,
      classes: {
        checked: styles.checked,
        root: styles.root
      }
    }),
    label: children
  })) : isChecked && /*#__PURE__*/React.createElement("div", {
    className: "flex flex-row text-base mb-2"
  }, /*#__PURE__*/React.createElement(Check, null), /*#__PURE__*/React.createElement("span", {
    className: "my-auto"
  }, children)));
}, function (prevState, currentState) {
  return JSON.stringify(prevState.payload) === JSON.stringify(currentState.payload) && R.equals(prevState.isChecked, currentState.isChecked) && R.equals(prevState.isIndeterminate, currentState.isIndeterminate) && R.equals(prevState.isDisabled, currentState.isDisabled);
});
CheckboxWithLabel.defaultProps = {
  isChecked: false,
  isDisabled: false,
  isIndeterminate: false,
  isReadOnly: false,
  payload: {}
};
export default CheckboxWithLabel;