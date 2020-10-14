import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { FaPlus } from "react-icons/fa";

const defaultProps = {
  isReadOnly: false,
  payload: {},
  text: "[text is missing]",
  variant: "contained",
  color: "primary",
  size: "large",
  disabled: false,
  icon: null,
  iconFontSize: 18,
};

const styles = createStyles(theme => ({
  root: {
    height: "3rem",
    fontWeight: "600",
    fontSize: "0.9375rem",
    borderRadius: 0,
    borderColor: "#d1d1d1",
    "&:focus": {
      outline: "0.2rem solid #d1d1d1"
    }
  }
}));

const SimpleButton = ({
  isReadOnly = defaultProps.isReadOnly,
  onClick,
  payload = defaultProps.payload,
  text = defaultProps.text,
  variant = defaultProps.variant,
  color = defaultProps.color,
  ariaLabel,
  size = defaultProps.size,
  classes,
  disabled = defaultProps.disabled,
  icon = defaultProps.icon,
  iconFontSize = defaultProps.iconFontSize,
}) => {
  const handleClick = event => {
    onClick(payload, {}, event);
  };

  return (
    <React.Fragment>
      {!isReadOnly && (
        <Button
          size={size}
          onClick={handleClick}
          variant={variant}
          color={color}
          disableElevation
          disableRipple
          disabled={disabled}
          aria-label={ariaLabel}
          className={classes.root}>
          {icon === "FaPlus" && (
            <span style={{ width: 15 }}>
              <FaPlus style={{ fontSize: iconFontSize }}/>
            </span>)}
          {text}
        </Button>
      )}
    </React.Fragment>
  );
};

SimpleButton.propTypes = {
  ariaLabel: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  payload: PropTypes.object,
  text: PropTypes.string,
  variant: PropTypes.string,
  icon: PropTypes.string,
  iconFontSize: PropTypes.string,
};

export default withStyles(styles)(SimpleButton);
