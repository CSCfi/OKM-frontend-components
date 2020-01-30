import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import StepLabel from "@material-ui/core/StepLabel";
import green from "@material-ui/core/colors/green";
import Completed from "@material-ui/icons/CheckCircleRounded";
import Incomplete from "@material-ui/icons/ErrorOutlined";
import Normal from "@material-ui/icons/Lens";

import * as R from "ramda";

/**
 * @module Components/01-molecules
 */

/**
 * Stepper with states, links
 * @example
 * const size = 12
 * const text = 'I am documented!'
 * return (
 *   <Documented size={size} text={text} />
 * )
 */

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

const getSteps = () => {
  return ["Select campaign settings", "Create an ad group", "Create an ad"];
};

const getStepContent = step => {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    default:
      return "Unknown step";
  }
};

const iconStyles = makeStyles({
  root: {
    display: "flex",
    height: 22,
    alignItems: "center",
    color: "#a2a4a3"
  },
  active: {
    color: "#1c804c"
  },
  completed: {
    color: "#1c804c",
    zIndex: 1,
    fontSize: 24
  },
  error: {
    color: "#e5c317",
    zIndex: 1,
    fontSize: 24
  }
});

function StepIcons(props) {
  // const classes = iconStyles();
  // return <Incomplete className={classes.incomplete} />;
  const classes = iconStyles();
  const { active, completed, error, icon } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.error]: error
      })}>
      {error ? (
        <Incomplete className={classes.error} />
      ) : completed ? (
        <Completed className={classes.completed} />
      ) : (
        <div style={{ marginRight: "1.5em", marginTop: "-24px" }}>
          <Normal style={{ position: "absolute" }} />
          <span
            style={{
              position: "absolute",
              marginLeft: "7px",
              marginTop: "1px",
              color: "#fff",
              font: "1.1rem Inconsolata, monospace"
            }}>
            {icon}
          </span>
        </div>
      )}
    </div>
  );
}

const StepperNavigation = React.memo(props => {
  const classes = useStyles();
  const [completed, setCompleted] = React.useState({});
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const isStepFailed = step => {
    return step === 1;
  };

  const isStepCompleted = step => {
    return step === 0;
  };

  const handleStep = step => () => {
    setActiveStep(step);
  };

  return (
    <div className={classes.root}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => {
          const labelProps = {};

          if (isStepFailed(index)) {
            labelProps.error = true;
          }
          if (isStepFailed(index)) {
            labelProps.error = true;
          }
          if (isStepCompleted(index)) {
            labelProps.completed = true;
          }

          return (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                completed={completed[index]}>
                <StepLabel StepIconComponent={StepIcons} {...labelProps}>
                  {label}
                </StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
});

StepperNavigation.defaultProps = {
  isChecked: false,
  isDisabled: false,
  isReadOnly: false,
  payload: {}
};

StepperNavigation.propTypes = {
  isChecked: PropTypes.bool,
  isDisabled: PropTypes.bool,
  /**
   * Will be called after checking or unchecking the checkbox.
   */
  onChanges: PropTypes.func.isRequired,
  /**
   * A parameter of the onChanges function.
   */
  labelStyles: PropTypes.object,
  payload: PropTypes.object,
  isReadOnly: PropTypes.bool
};

export default StepperNavigation;
