import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _createForOfIteratorHelper from "@babel/runtime/helpers/esm/createForOfIteratorHelper";
import moment from "moment";
import * as R from "ramda";
/**
 * Utility functions are listed here.
 * @namespace utils
 * */

/**
 * @module Utils/common
 */

/**
 * Returns a part of the given anchor by index.
 * @param {string} anchor
 * @param {number} index
 * @param {string} separator - Default value: .
 */

export function getAnchorPart(anchor, index) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
  return R.compose(R.view(R.lensIndex(index)), R.split(separator))(anchor);
}
/**
 * Returns the element with the given anchor from the array of elements
 * @param anchor
 * @param scanArray
 */

export var findAnchoredElement = function findAnchoredElement(anchor, scanArray) {
  return R.find(R.propEq("anchor", anchor), scanArray || []);
};
export var findAnchoredCategoryFromElement = function findAnchoredCategoryFromElement(anchor, elementObject) {
  return findAnchoredElement(anchor, elementObject.categories);
};
export var findAnchoredComponentFromElement = function findAnchoredComponentFromElement(anchor, elementObject) {
  return findAnchoredElement(anchor, elementObject.components);
};

var findAnchoredCategoryOrComponentFromElement = function findAnchoredCategoryOrComponentFromElement(anchor, elementObject) {
  var retval = findAnchoredCategoryFromElement(anchor, elementObject);
  if (!retval) retval = findAnchoredComponentFromElement(anchor, elementObject);
  return retval;
};
/**
 * Returns the element found from given anchor in a category hierarchy. We expect that the anchor is
 * a . delimited path with elementes being categories and optionally the last element being a component
 *
 * @param anchor The path for scanning the component from stateObject (e.g. vahimmaisopiskelijavuodet.A)
 * @param stateObject
 */


export var findAnchoredElementFromCategoryHierarchy = function findAnchoredElementFromCategoryHierarchy(anchor, rootObject) {
  if (!rootObject || !anchor || R.isEmpty(rootObject)) return undefined;
  var anchorParts = anchor.split(".");
  var currentElement = rootObject;

  var _iterator = _createForOfIteratorHelper(anchorParts),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var anchorPart = _step.value;
      currentElement = findAnchoredCategoryOrComponentFromElement(anchorPart, currentElement);

      if (!currentElement) {
        return undefined;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return currentElement;
};
export var removeAnchorPart = function removeAnchorPart(anchor, index) {
  var separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ".";
  return R.compose(R.join(separator), R.remove(index, 1), R.split(separator))(anchor);
};
export var replaceAnchorPartWith = function replaceAnchorPartWith(anchor, index, replaceWith) {
  return R.compose(R.join("."), R.update(index, replaceWith), R.split("."))(anchor);
};
export var curriedGetAnchorPartsByIndex = R.curry(function (objects, index) {
  return R.map(function (obj) {
    return getAnchorPart(R.prop("anchor", obj), index);
  })(objects);
});
export var getAnchorsStartingWith = function getAnchorsStartingWith(prefix, objects) {
  return R.filter(R.compose(R.startsWith(prefix), R.head, R.split("."), R.prop("anchor")))(objects);
};
export var flattenObj = function flattenObj(obj) {
  var go = function go(obj_) {
    return R.chain(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      if (R.type(v) === "Object" || R.type(v) === "Array") {
        return R.map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              k_ = _ref4[0],
              v_ = _ref4[1];

          return ["".concat(k, ".").concat(k_), v_];
        }, go(v));
      } else {
        return [[k, v]];
      }
    }, R.toPairs(obj_));
  };

  return R.fromPairs(go(obj));
};
/**
 * Function finds all the objects with given key from the given object.
 * @param {object} object - JavaScript object, can be deeply nested
 * @param {string} targetKey - Key to search for
 */

export function findObjectWithKey(object, targetKey) {
  function find(object, targetKey) {
    var keys = R.keys(object);

    if (keys.length > 0) {
      return R.map(function (key) {
        if (R.equals(key, targetKey)) {
          return object[key];
        } else if (R.is(Object, object[key])) {
          return findObjectWithKey(object[key], targetKey);
        }

        return false;
      }, keys);
    }

    return false;
  }

  return R.flatten(find(object, targetKey)).filter(Boolean);
}
/**
 * Open file using generated and hidden <a> element
 * @param obj containing properties filename and tiedosto or property url. Has optional parameter openInNewWindow
 */

export var downloadFileFn = function downloadFileFn(_ref5) {
  var filename = _ref5.filename,
      tiedosto = _ref5.tiedosto,
      url = _ref5.url,
      openInNewWindow = _ref5.openInNewWindow,
      apiBaseUrl = _ref5.apiBaseUrl;
  return function () {
    var a = document.createElement("a");
    a.setAttribute("type", "hidden");

    if (openInNewWindow) {
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferer");
    }

    document.body.appendChild(a); // Needed for Firefox

    if (tiedosto && tiedosto instanceof Blob) {
      var reader = new FileReader();
      reader.readAsDataURL(tiedosto);

      reader.onload = function () {
        a.href = reader.result;
        a.download = filename;
        a.click();
        a.remove();
      };
    } else if (url) {
      a.href = apiBaseUrl + url;
      a.click();
      a.remove();
    } else {
      console.warn("Cannot open file: No octet stream nor file url");
    }
  };
};
/**
 *
 * @param {object} a - Object to compare.
 * @param {object} b - Object to compare.
 * @param {array} path - Path to the property.
 */

export function sortObjectsByProperty(a, b, path) {
  if (!path) {
    throw new Error("No property path given.");
  }

  var aRaw = R.path(path, a);
  var bRaw = R.path(path, b);
  var aDate = moment(aRaw, "DD.MM.YYYY", true);
  var bDate = moment(bRaw, "DD.MM.YYYY", true);
  var aCompare = aDate.isValid() ? aDate.valueOf() : aRaw;
  var bCompare = bDate.isValid() ? bDate.valueOf() : bRaw;

  if (aCompare < bCompare) {
    return -1;
  } else if (aCompare > bCompare) {
    return 1;
  }

  return 0;
}