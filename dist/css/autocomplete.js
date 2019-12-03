import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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