import React from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const defaultProps = {
  isReadOnly: false,
  payload: {},
  text: "[text is missing]",
  variant: "contained",
  color: "primary"
};

const styles = createStyles(theme => ({
  root: {}
}));

const SimpleButton = ({
  isReadOnly = defaultProps.isReadOnly,
  onClick,
  payload = defaultProps.payload,
  text = defaultProps.text,
  variant = defaultProps.variant,
  color = defaultProps.color
}) => {
  const handleClick = () => {
    onClick(payload);
  };

  return (
    <React.Fragment>
      {!isReadOnly ? (
        <Button onClick={handleClick} variant={variant} color={color}>
          {text}
        </Button>
      ) : null}
    </React.Fragment>
  );
};

SimpleButton.propTypes = {
  isReadOnly: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  payload: PropTypes.object,
  variant: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string
};

export default withStyles(styles)(SimpleButton);
