import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import fiLocale from "date-fns/locale/fi";
import svLocale from "date-fns/locale/sv";
import enLocale from "date-fns/locale/en-GB";
import format from "date-fns/format";
var styles = createStyles(function (theme) {
  return {
    dense: {
      marginTop: theme.spacing(2)
    }
  };
});
var materialTheme = createMuiTheme({
  palette: {
    primary: green
  }
});

var LocalizedUtils =
/*#__PURE__*/
function (_DateFnsUtils) {
  _inherits(LocalizedUtils, _DateFnsUtils);

  function LocalizedUtils() {
    _classCallCheck(this, LocalizedUtils);

    return _possibleConstructorReturn(this, _getPrototypeOf(LocalizedUtils).apply(this, arguments));
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

var Datepicker = function Datepicker(props) {
  var classes = props.classes;

  var _useState = useState(props.value),
      _useState2 = _slicedToArray(_useState, 2),
      selectedDate = _useState2[0],
      setSelectedDate = _useState2[1];

  var localeMap = {
    en: enLocale,
    fi: fiLocale,
    sv: svLocale
  };
  var locale = props.intl.locale;

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
  return React.createElement(ThemeProvider, {
    theme: materialTheme
  }, React.createElement(MuiPickersUtilsProvider, {
    utils: LocalizedUtils,
    locale: localeMap[locale],
    theme: materialTheme
  }, React.createElement(DatePicker, {
    format: "d.M.yyyy" // Always is Finnish format
    ,
    "aria-label": props.ariaLabel,
    label: props.label,
    disabled: props.isDisabled,
    placeholder: props.placeholder,
    margin: "dense",
    className: "".concat(props.isHidden ? "hidden" : "", " p-2"),
    onChange: handleDateChange,
    error: props.error,
    style: props.fullWidth ? {} : {
      width: props.width
    },
    fullWidth: props.fullWidth,
    InputProps: {
      className: classes.input
    },
    value: selectedDate || null,
    inputVariant: "outlined",
    showTodayButton: props.showTodayButton,
    okLabel: props.okLabel,
    clearLabel: props.clearLabel,
    cancelLabel: props.cancelLabel,
    todayLabel: props.todayLabel,
    clearable: props.clearable,
    maxDateMessage: props.maxDateMessage,
    minDateMessage: props.minDateMessage,
    invalidDateMessage: props.invalidDateMessage,
    minDate: props.minDate,
    maxDate: props.maxDate,
    disablePast: props.disablePast,
    disableFuture: props.disableFuture
  })));
};

Datepicker.defaultProps = {
  ariaLabel: "Datepicker",
  label: "",
  delay: 300,
  id: "datepicker-".concat(Math.random()),
  isDisabled: false,
  isHidden: false,
  payload: {},
  error: false,
  width: "12em",
  fullWidth: false,
  clearable: true,
  showTodayButton: true,
  disablePast: false,
  disableFuture: false
};
export default withStyles(styles)(DatePicker);