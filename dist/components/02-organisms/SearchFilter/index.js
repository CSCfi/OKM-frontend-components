import React from "react";
import Input from "../../00-atoms/Input";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
/**
 * SearchFilter wraps a TextBox, stripping away payload and propagating only
 * the unwrapped value to callback.
 * @param props
 * @returns {*}
 * @constructor
 */

var useStyles = makeStyles(function (theme) {
  return {
    root: {
      padding: "8px 12px",
      display: "flex",
      alignItems: "center",
      width: 400,
      border: "1px solid #CCCCCC",
      boxShadow: "none"
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    }
  };
});

var SearchFilter = function SearchFilter(props) {
  var classes = useStyles();

  var handleChanges = function handleChanges(_, changePayload) {
    props.onValueChanged(changePayload.value);
  };

  return React.createElement(Paper, {
    component: "form",
    className: classes.root
  }, React.createElement(InputBase, {
    className: classes.input,
    placeholder: props.placeholder,
    onChanges: handleChanges
  }), React.createElement(SearchIcon, {
    className: "ml-2"
  }));
};

export default SearchFilter;