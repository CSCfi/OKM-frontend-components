import React from "react";
import Chip from "@material-ui/core/Chip"; // https://material-ui.com/components/chips/

var Pill = function Pill(props) {
  return /*#__PURE__*/React.createElement(Chip, props);
};

Pill.defaultProps = {
  variant: "outlined"
};
export default Pill;