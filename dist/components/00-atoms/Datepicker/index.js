import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { createStyles } from "@material-ui/styles";
import green from "@material-ui/core/colors/green";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import DateFnsUtils from "@date-io/date-fns";
import fiLocale from "date-fns/locale/fi";
import svLocale from "date-fns/locale/sv";
import enLocale from "date-fns/locale/en-GB";
import format from "date-fns/format";
var styles = createStyles(function (theme) {
  return {
    root: {
      "& .Mui-disabled": {
        color: "#333",
        padding: 0
      },
      "& label.Mui-disabled": {
        transform: "translate(0, -6px) scale(0.75)"
      },
      "& input:disabled + fieldset": {
        borderColor: "transparent !important"
      }
    },
    requiredVisited: {
      "& input + fieldset ": {
        borderColor: "#E5C317"
      }
    },
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
    disabled: props.isDisabled || props.isReadonly,
    placeholder: props.placeholder,
    margin: "dense",
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
    className: "".concat(props.isHidden ? "hidden" : "", " \n            ").concat(isVisited && props.isRequired && !props.value ? classes.requiredVisited : classes.root, " \n            p-2\n        "),
    onFocus: function onFocus() {
      return setIsVisited(true);
    }
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
export default withStyles(styles)(Datepicker);