import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
export var heights = {
  LONG: 'long',
  SHORT: 'short'
};
export var autocompleteShortStyles = {
  dropdownIndicator: function dropdownIndicator(base) {
    return _objectSpread({}, base, {
      padding: 4
    });
  },
  clearIndicator: function clearIndicator(base) {
    return _objectSpread({}, base, {
      padding: 4
    });
  },
  valueContainer: function valueContainer(base) {
    return _objectSpread({}, base);
  },
  input: function input(base) {
    return _objectSpread({}, base, {
      margin: 0,
      padding: 0
    });
  },
  control: function control(styles) {
    return _objectSpread({}, styles, {
      backgroundColor: "white",
      minHeight: 'fit-content'
    });
  }
};
export var autocompleteWidthStyles = {
  container: function container(base) {
    return _objectSpread({}, base, {
      width: 400
    });
  }
};