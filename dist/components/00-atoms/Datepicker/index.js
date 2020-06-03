import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _createSuper from "@babel/runtime/helpers/esm/createSuper";
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { createStyles } from "@material-ui/styles";
import { FormHelperText } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import fiLocale from "date-fns/locale/fi";
import svLocale from "date-fns/locale/sv";
import enLocale from "date-fns/locale/en-GB";
import format from "date-fns/format";
import { COLORS } from "../../../modules/styles";
import { equals } from "ramda";
var styles = createStyles(function (theme) {
  return {
    root: {
      "& input:focus + fieldset": {
        borderColor: "green !important"
      },
      "& .Mui-disabled": {
        color: COLORS.OIVA_TEXT,
        marginTop: "0.6em",
        padding: 0
      },
      "& label.Mui-disabled": {
        transform: "translate(0, -0.8em) scale(0.75)"
      },
      "& input:disabled + fieldset": {
        borderColor: "transparent !important"
      },
      "& label": {
        color: COLORS.OIVA_TEXT + " !important"
      }
    },
    requiredVisited: {
      "& input + fieldset ": {
        borderColor: COLORS.OIVA_ORANGE,
        borderWidth: 2
      },
      "& input:focus + fieldset": {
        borderColor: "green !important"
      },
      "& label": {
        color: COLORS.OIVA_ORANGE_TEXT + " !important"
      }
    },
    dense: {
      marginTop: theme.spacing(2)
    }
  };
});

var LocalizedUtils = /*#__PURE__*/function (_DateFnsUtils) {
  _inherits(LocalizedUtils, _DateFnsUtils);

  var _super = _createSuper(LocalizedUtils);

  function LocalizedUtils() {
    _classCallCheck(this, LocalizedUtils);

    return _super.apply(this, arguments);
  }

  _createClass(LocalizedUtils, [{
    key: "getDatePickerHeaderText",
    value: function getDatePickerHeaderText(date) {
      return format(date, "d. MMMM", {
        locale: this.locale
      });
    }
  }]);

  return LocalizedUtils;
}(DateFnsUtils);

var Datepicker = React.memo(function (props) {
  var classes = props.classes,
      messages = props.messages,
      locale = props.locale;

  var _useState = useState(props.value),
      _useState2 = _slicedToArray(_useState, 2),
      selectedDate = _useState2[0],
      setSelectedDate = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isVisited = _useState4[0],
      setIsVisited = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isFocused = _useState6[0],
      setIsFocused = _useState6[1];

  var localeMap = {
    en: enLocale,
    fi: fiLocale,
    sv: svLocale
  };

  var handleDateChange = function handleDateChange(date) {
    props.onChanges(props.payload, {
      value: date
    });
    setSelectedDate(date);
  };

  useEffect(function () {
    if (props.value !== selectedDate || !selectedDate) {
      setSelectedDate(props.value);
    }
  }, [props.value, selectedDate]);
  return /*#__PURE__*/React.createElement(MuiPickersUtilsProvider, {
    utils: LocalizedUtils,
    locale: localeMap[locale]
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-col",
    style: !props.width && props.fullWidth ? {
      display: "flex"
    } : {}
  }, /*#__PURE__*/React.createElement(DatePicker, {
    format: "d.M.yyyy" // Always is Finnish format
    ,
    "aria-label": props.ariaLabel,
    label: props.label,
    disabled: props.isDisabled || props.isReadonly,
    placeholder: props.isDisabled || props.isReadOnly || props.label ? "" : props.placeholder,
    margin: "dense",
    onChange: handleDateChange,
    error: props.error,
    invalidLabel: props.invalidLabel,
    required: props.isRequired,
    width: props.width,
    style: props.width ? {
      width: props.width
    } : {},
    fullWidth: props.width ? false : props.fullWidth,
    InputProps: {
      className: classes.input
    },
    value: selectedDate || null,
    inputVariant: "outlined",
    showTodayButton: props.showTodayButton,
    okLabel: messages.ok,
    clearLabel: messages.clear,
    cancelLabel: messages.cancel,
    todayLabel: messages.today,
    clearable: props.clearable,
    maxDateMessage: messages.datemax,
    minDateMessage: messages.datemin,
    invalidDateMessage: messages.dateinvalid,
    minDate: props.minDate,
    maxDate: props.maxDate,
    disablePast: props.disablePast,
    disableFuture: props.disableFuture,
    className: "".concat(props.isHidden ? "hidden" : "", " \n            ").concat((isVisited || props.showValidationErrors) && props.isRequired && !props.value && !isFocused ? classes.requiredVisited : classes.root, " \n        "),
    onBlurCapture: function onBlurCapture() {
      return !selectedDate ? setIsVisited(true) : setIsVisited(false);
    },
    onFocus: function onFocus() {
      return setIsFocused(true);
    },
    onBlur: function onBlur() {
      return setIsFocused(false);
    }
  }), props.showValidationErrors && props.requiredMessage && /*#__PURE__*/React.createElement(FormHelperText, {
    id: "component-message-text",
    style: {
      marginTop: "0.1em",
      paddingLeft: "1.2em",
      marginBottom: "0.5em",
      color: COLORS.OIVA_ORANGE_TEXT
    }
  }, isVisited && !selectedDate && props.requiredMessage)));
}, function (cp, np) {
  // cp = current props, np = next props
  return equals(cp.payload, np.payload) && equals(cp.value, np.value);
});
Datepicker.defaultProps = {
  ariaLabel: "Datepicker",
  label: null,
  delay: 300,
  id: "datepicker-".concat(Math.random()),
  isDisabled: false,
  isHidden: false,
  payload: {},
  error: false,
  width: "",
  fullWidth: true,
  clearable: true,
  showTodayButton: true,
  disablePast: false,
  disableFuture: false
};
export default withStyles(styles)(Datepicker);