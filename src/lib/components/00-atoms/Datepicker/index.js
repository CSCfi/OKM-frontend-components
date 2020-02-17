import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

const styles = createStyles(theme => ({
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
}));

const materialTheme = createMuiTheme({
  palette: {
    primary: green
  }
});

class LocalizedUtils extends DateFnsUtils {
  getDatePickerHeaderText(date) {
    return format(date, "d. MMMM", { locale: this.locale });
  }
}

const Datepicker = props => {
  const { classes, messages, locale } = props;
  const [selectedDate, setSelectedDate] = useState(props.value);
  const [isVisited, setIsVisited] = useState(false);
  const localeMap = {
    en: enLocale,
    fi: fiLocale,
    sv: svLocale
  };

  const handleDateChange = date => {
    props.onChanges(props.payload, { value: date });
    setSelectedDate(date);
  };

  useEffect(() => {
    if (props.value !== selectedDate || !selectedDate) {
      setSelectedDate(props.value);
    }
  }, [props.value, selectedDate]);
  return (
    <ThemeProvider theme={materialTheme}>
      <MuiPickersUtilsProvider
        utils={LocalizedUtils}
        locale={localeMap[locale]}
        theme={materialTheme}>
        <DatePicker
          format="d.M.yyyy" // Always is Finnish format
          aria-label={props.ariaLabel}
          label={props.label}
          disabled={props.isDisabled || props.isReadonly}
          placeholder={props.placeholder}
          margin="dense"
          onChange={handleDateChange}
          error={props.error}
          style={props.fullWidth ? {} : { width: props.width }}
          fullWidth={props.fullWidth}
          InputProps={{
            className: classes.input
          }}
          value={selectedDate || null}
          inputVariant="outlined"
          showTodayButton={props.showTodayButton}
          okLabel={messages.ok}
          clearLabel={messages.clear}
          cancelLabel={messages.cancel}
          todayLabel={messages.today}
          clearable={props.clearable}
          maxDateMessage={messages.datemax}
          minDateMessage={messages.datemin}
          invalidDateMessage={messages.dateinvalid}
          minDate={props.minDate}
          maxDate={props.maxDate}
          disablePast={props.disablePast}
          disableFuture={props.disableFuture}
          className={`${props.isHidden ? "hidden" : ""} 
            ${
              isVisited && props.isRequired && !props.value
                ? classes.requiredVisited
                : classes.root
            } 
            p-2
        `}
          onFocus={() => setIsVisited(true)}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

Datepicker.defaultProps = {
  ariaLabel: "Datepicker",
  label: "",
  delay: 300,
  id: `datepicker-${Math.random()}`,
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

Datepicker.propTypes = {
  ariaLabel: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  /** Is called with the payload and the value. */
  onChanges: PropTypes.func,
  /** Custom object defined by user. */
  payload: PropTypes.object,
  placeholder: PropTypes.string,
  error: PropTypes.bool,
  width: PropTypes.string,
  fullWidth: PropTypes.bool,
  value: PropTypes.any,
  clearable: PropTypes.bool,
  showTodayButton: PropTypes.bool,
  disablePast: PropTypes.bool,
  disableFuture: PropTypes.bool,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  locale: PropTypes.string,
  messages: PropTypes.object.isRequired,
  isRequired: PropTypes.bool,
  isReadonly: PropTypes.bool
};

export default withStyles(styles)(Datepicker);
