import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect, useCallback } from "react";
import { Button, Select, MenuItem, FormControl } from "@material-ui/core";
/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var intervalOptions = [500, 1000, 2000, 3000, 4000, 5000, 10000];
var timeoutHandle = null;
var Stage = React.memo(function (props) {
  var originalInterval = props.interval;

  var _useState = useState(originalInterval || 3000),
      _useState2 = _slicedToArray(_useState, 2),
      interval = _useState2[0],
      setInterval = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isPlaying = _useState4[0],
      setIsPlaying = _useState4[1];

  var _useState5 = useState(props.changes),
      _useState6 = _slicedToArray(_useState5, 2),
      changes = _useState6[0],
      setChanges = _useState6[1];

  var originalChanges = props.changes;

  var handleUpdate = function handleUpdate(payload) {
    setChanges(payload.changes);
  };

  function getElementToClick(elementsToClick) {
    var randomElementIndex = getRandomInt(0, elementsToClick.length - 1);
    var randomElement = elementsToClick[randomElementIndex];
    return {
      randomElement: randomElement,
      randomElementIndex: randomElementIndex
    };
  }

  var runTest = useCallback(function () {
    var elementsToClick = document.querySelectorAll('input[type="checkbox"], input[type="radio"]:not([checked])');

    if (isPlaying) {
      var _getElementToClick = getElementToClick(elementsToClick),
          randomElement = _getElementToClick.randomElement,
          randomElementIndex = _getElementToClick.randomElementIndex;

      if (randomElement) {
        randomElement.parentNode.style["background-color"] = "#000000";
        randomElement.parentNode.style["border"] = "1px dashed red";

        if (elementsToClick && randomElementIndex > -1) {
          timeoutHandle = setTimeout(function () {
            randomElement.parentNode.style["background-color"] = "initial";
            randomElement.parentNode.style["border"] = "initial";
            elementsToClick[randomElementIndex].click();
          }, interval);
        }
      }
    } else {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
        setChanges(originalChanges);
        elementsToClick.forEach(function (randomInput) {
          randomInput.parentNode.style["background-color"] = "initial";
          randomInput.parentNode.style["border"] = "initial";
        });
      }
    }
  }, [interval, isPlaying, originalChanges]);
  useEffect(function () {
    runTest();
  }, [changes, isPlaying, originalChanges, runTest]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, !!props.render ? props.render({
    anchor: props.anchor,
    categories: props.categories,
    changes: changes,
    onUpdate: handleUpdate
  }) : null, /*#__PURE__*/React.createElement("div", {
    className: "p-16"
  }, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("p", {
    className: "pt-8 pb-8"
  }, "Test run simulates click events. Next click is marked with black background and red dashed border. By folowing the test you can ensure that the category structure above responses to clicks correctly."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("label", {
    className: "flex items-center mr-12"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block mr-4"
  }, "Interval between clicks:"), /*#__PURE__*/React.createElement(FormControl, null, /*#__PURE__*/React.createElement(Select, {
    labelId: "test-run-interval",
    value: interval,
    autoWidth: true,
    onChange: function onChange(e) {
      setIsPlaying(false);
      setInterval(parseInt(e.target.value));
      setTimeout(function () {
        setIsPlaying(true);
      });
    }
  }, intervalOptions.map(function (_interval) {
    return /*#__PURE__*/React.createElement(MenuItem, {
      key: _interval,
      value: _interval
    }, _interval / 1000, " s");
  }), originalInterval && /*#__PURE__*/React.createElement(MenuItem, {
    value: originalInterval
  }, "User defined = ", originalInterval / 1000, " s")))), /*#__PURE__*/React.createElement(Button, {
    variant: "contained",
    color: "primary" // disabled={!isPlaying && !isNaN(timeoutHandle)}
    ,
    onClick: function onClick() {
      setIsPlaying(function (prevState) {
        return !prevState;
      });
    }
  }, isPlaying ? "Stop test run" : "Start test run"))));
});
export default Stage;