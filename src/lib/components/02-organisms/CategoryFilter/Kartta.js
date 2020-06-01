import React from "react";
import PropTypes from "prop-types";

const Kartta = ({ kartta }) => {
  return (
    <div
      id="finland_map"
      // ref={kartta}
      className="w-2/5"
      style={{ height: "500px" }}></div>
  );
};

Kartta.propTypes = {
  kartta: PropTypes.object
};

export default Kartta;
