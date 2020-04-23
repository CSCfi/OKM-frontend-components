import React, { useMemo } from "react";
import * as R from "ramda";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
var ActionList = React.memo(function (props) {
  var removalCallback = props.removalCallback;
  var handleRemoval = useMemo(function () {
    return function (item) {
      if (removalCallback) {
        return removalCallback(props.payload, {
          item: item,
          remove: true
        });
      } else {
        console.error("ActionList: removal callback function is missing.");
      }

      return false;
    };
  }, [props.payload, removalCallback]);
  var items = useMemo(function () {
    return R.addIndex(R.map)(function (item, index) {
      return /*#__PURE__*/React.createElement(ListItem, {
        key: "action-list-item-".concat(index)
      }, /*#__PURE__*/React.createElement(ListItemText, {
        primary: item.title,
        secondary: item.secondaryText ? item.secondaryText : null
      }), item.availableActions && R.includes("remove", item.availableActions) ? /*#__PURE__*/React.createElement(ListItemSecondaryAction, null, /*#__PURE__*/React.createElement(IconButton, {
        edge: "end",
        "aria-label": "delete",
        onClick: function onClick() {
          return handleRemoval(item);
        }
      }, /*#__PURE__*/React.createElement(HighlightOffIcon, null))) : null);
    }, props.items);
  }, [handleRemoval, props.items]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, props.title && /*#__PURE__*/React.createElement("h4", {
    className: "pt-4"
  }, props.title), props.info && /*#__PURE__*/React.createElement("p", {
    className: "pt-4"
  }, props.info), /*#__PURE__*/React.createElement(List, {
    dense: true
  }, items));
});
ActionList.defaultProps = {
  items: []
};
export default ActionList;