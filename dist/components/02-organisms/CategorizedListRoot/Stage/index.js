import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import { handleNodeMain, getReducedStructure, getTargetNode } from "../utils";
import * as R from "ramda";
import { cloneDeep } from "lodash";

function markRequiredFields(lomake) {
  var changeObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var rules = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var modifiedLomake = cloneDeep(lomake);
  R.forEach(function (rule) {
    var isRequired = rule.isRequired(modifiedLomake, changeObjects);
    modifiedLomake = rule.markRequiredFields(modifiedLomake, isRequired);
    var isValid = rule.isValid(modifiedLomake, changeObjects, isRequired)();
    modifiedLomake = rule.showErrors(modifiedLomake, isValid);
    console.info("Is valid: ", isValid);
  }, rules);
  return modifiedLomake;
}

var Stage = function Stage(props) {
  var _useState = useState(props.changes),
      _useState2 = _slicedToArray(_useState, 2),
      changes = _useState2[0],
      setChanges = _useState2[1];

  var _useState3 = useState(props.categories),
      _useState4 = _slicedToArray(_useState3, 2),
      lomake = _useState4[0],
      setLomake = _useState4[1];

  var _useState5 = useState(0),
      _useState6 = _slicedToArray(_useState5, 2),
      nodeIndex = _useState6[0],
      setNodeIndex = _useState6[1];

  var _useState7 = useState(),
      _useState8 = _slicedToArray(_useState7, 2),
      interval = _useState8[0],
      setInterval = _useState8[1];

  var handleUpdate = function handleUpdate(payload) {
    setChanges(payload.changes);
  };

  var reducedStructure = useMemo(function () {
    return getReducedStructure(props.categories);
  }, [props.categories]);
  var updateNodeIndex = useCallback(function (nodeIndex) {
    if (interval) {
      if (props.loopChanges[nodeIndex + 1]) {
        setNodeIndex(nodeIndex + 1);
      } else if (props.isLoopEnabled) {
        setNodeIndex(0);
      } else {
        console.info("Procedure ended.");
      }
    }
  }, [interval, props.isLoopEnabled, props.loopChanges]);
  var targetNode = useMemo(function () {
    var targetNode = null;

    if (interval) {
      var loopChange = R.view(R.lensIndex(nodeIndex))(props.loopChanges);
      targetNode = getTargetNode(loopChange, reducedStructure);
      console.group();
      console.info("Target node", targetNode);
      console.info("Reduced structure", reducedStructure);
      console.groupEnd();
    }

    return targetNode;
  }, [nodeIndex, interval, props.loopChanges, reducedStructure]);
  useEffect(function () {
    if (props.rules.length) {
      var updatedLomake = markRequiredFields(lomake, changes, props.rules);

      if (!R.equals(updatedLomake, lomake)) {
        setLomake(updatedLomake);
      }
    }
  }, [changes, lomake, props.rules]);
  useEffect(function () {
    if (reducedStructure && targetNode) {
      var nextChanges = handleNodeMain(targetNode, props.anchor, reducedStructure, changes);

      if (!R.equals(changes, nextChanges)) {
        console.info("setting changes...");
        setChanges(nextChanges);
      }
    }
  }, [changes, props.anchor, reducedStructure, targetNode]);
  useEffect(function () {
    setInterval(props.interval);
  }, [props.interval]);
  return React.createElement(React.Fragment, null, !!props.render ? props.render({
    anchor: props.anchor,
    categories: lomake,
    changes: changes,
    interval: R.isNil(interval) ? 2000 : interval,
    onUpdate: handleUpdate,
    updateNodeIndex: updateNodeIndex,
    nodeIndex: nodeIndex
  }) : null, React.createElement("div", {
    className: "p-20"
  }, React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setInterval(interval > 0 ? 0 : 1000);
    }
  }, interval > 0 ? "Stop" : "Play"), targetNode && targetNode.original ? React.createElement("div", null, "Target node:", React.createElement("span", {
    className: "font-bold"
  }, targetNode.original.fullAnchor), " ", React.createElement("br", null), React.createElement("span", {
    className: "pr-4"
  }, "Latest operations:"), React.createElement("code", null, JSON.stringify(targetNode.requestedChanges))) : null));
};

Stage.defaultProps = {
  isLoopEnabled: true,
  loopChanges: [],
  rules: []
};
export default Stage;