import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1em;\n  padding: 0.2em 0.4em;\n  width: 100%;\n  margin: 0.5em 0;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  border: 1px solid #aaa;\n  border-radius: 0.2em;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  font-size: 1em;\n  display: flex;\n  justify-content: stretch;\n  align-items: center;\n  width: 100%;\n  padding: 2px;\n  button {\n    background-color: transparent;\n    border: 0;\n    height: 2em;\n    width: 2em;\n    cursor: cursor;\n    &:hover {\n      color: ", ";\n      background-color: ", ";\n      ", "\n      cursor: pointer;\n    }\n  }\n  svg {\n    margin: auto;\n  }\n  input {\n    width: auto;\n    height: 2em;\n    flex: 1;\n    margin: 0 0.1em 0 0.1em;\n    padding: 0 0.2em 0 0.5em;\n  }\n  .name {\n    flex: 1;\n    margin-left: 0.2em;\n  }\n  .type {\n    min-width: 3em;\n    text-align: right;\n  }\n  .size {\n    min-width: 5em;\n    text-align: right;\n  }\n  &:hover {\n    background-color: ", ";\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 20px;\n  position: relative;\n  margin: 0.6em 0.3em 0 0.9em;\n\n  label {\n    width: 1.3em;\n    height: 1.3em;\n    cursor: pointer;\n    position: absolute;\n    top: 0;\n    left: 0;\n    background: white;\n    border-radius: 0;\n    border: 1px solid ", ";\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    &:hover {\n      &:after {\n        border-color: ", ";\n        opacity: 0.5;\n      }\n    }\n  }\n  input[type=\"checkbox\"] {\n    visibility: hidden;\n\n    &:checked + label {\n      color: ", ";\n      &:hover {\n        &:after {\n          background: rgba(90, 138, 112, 0);\n        }\n      }\n    }\n\n    &:checked + label:after {\n      opacity: 1;\n    }\n\n    &:checked + label:hover {\n      &:after {\n        border-color: white;\n        opacity: 1;\n      }\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin-bottom: 8px;\n  min-height: 20px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Attachment from "../Attachment/index";
import { FaRegFile, FaFile, FaTimes, FaLock, FaDownload } from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogTitle from "../DialogTitle";
import { downloadFileFn } from "./utils";
import { FormHelperText } from "@material-ui/core";
import Incomplete from "@material-ui/icons/ErrorOutlined";
import { COLORS } from "./styles";
import * as R from "ramda";
var Error = styled.div(_templateObject(), COLORS.OIVA_RED);
var Checkbox = styled.div(_templateObject2(), COLORS.OIVA_GREEN, COLORS.OIVA_GREEN, COLORS.OIVA_GREEN);
var LiiteListItem = styled.div(_templateObject3(), function (props) {
  return props.disabled ? COLORS.WHITE : props.bgColor ? props.bgColor : COLORS.WHITE;
}, function (props) {
  return props.disabled ? COLORS.LIGHT_GRAY : props.textColor ? props.textColor : COLORS.OIVA_GREEN;
}, function (props) {
  return props.disabled ? "cursor: not-allowed;" : null;
}, COLORS.OIVA_TABLE_HOVER_COLOR);
export var Input = styled.input(_templateObject4());
var Attachments = React.memo(function (props) {
  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      selectedAttachment = _useState2[0],
      setSelectedAttachment = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      attachments = _useState4[0],
      setAttachments = _useState4[1]; // const [fileAdded, setFileAdded] = useState(false);


  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      fileError = _useState6[0],
      setFileError = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isNameModalOpen = _useState8[0],
      setIsNameModalOpen = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      nameMissing = _useState10[0],
      setNameMissing = _useState10[1];

  var openNameModal = function openNameModal() {
    setNameMissing(false);
    setIsNameModalOpen(true);
  };

  var closeNameModal = function closeNameModal() {
    setIsNameModalOpen(false);
  };

  if (props.payload && props.payload.attachments) {
    useEffect(function () {
      setAttachments(props.payload.attachments);
    }, [props.payload.attachments]);
  } // Adds attachment into attachment list


  var addAttachment = function addAttachment() {
    if (selectedAttachment.nimi) {
      setNameMissing(false);
      closeNameModal(); // Find correct attachment and set name

      props.payload.attachments.map(function (liite, idx) {
        if (selectedAttachment.tiedostoId && liite.tiedostoId === selectedAttachment.tiedostoId || selectedAttachment.uuid && liite.uuid === selectedAttachment.uuid) {
          var atts = props.payload.attachments;
          atts[idx].nimi = selectedAttachment.nimi;
          setAttachments(atts);
          props.onUpdate(props.payload, {
            attachments: atts
          });
        }

        return null;
      });
    } else setNameMissing(true);
  };

  var setAttachment = function setAttachment(e) {
    setFileError(false); // setFileAdded("");

    if (e.target.files.length === 0) return;
    console.log("File selected");
    var type = e.target.files[0].name.split(".").pop().toLowerCase(); // Rajoitetaan max kooksi 25MB ja vain pdf, word, excel, jpeg ja gif on sallittuja

    if (e.target.files[0].size <= 26214400 && ["pdf", "doc", "txt", "docx", "xls", "xlsx", "xlsm", "jpg", "jpeg", "jpe", "jfif", "gif"].includes(type)) {
      var liite = {};
      liite.tiedostoId = Math.random() + "-" + e.target.files[0].name;
      liite.filename = e.target.files[0].name;
      liite.kieli = "fi";
      liite.tyyppi = type;
      liite.nimi = e.target.files[0].name.split(".")[0].toLowerCase();
      liite.tiedosto = new Blob([e.target.files[0]]);
      liite.koko = e.target.files[0].size;
      liite.removed = false;
      liite.salainen = false;
      liite.paikka = props.placement;
      liite.new = true;
      var atts = props.payload.attachments;
      atts.push(liite);
      setAttachments(atts);
      setSelectedAttachment(liite);
      openNameModal();
    } else return setFileError(true);
  };

  var cancelAttachment = function cancelAttachment() {
    closeNameModal();
    var atts = attachments.pop(); // take last out

    setAttachments(atts);
  };

  var removeAttachment = function removeAttachment(e, tiedostoId, uuid) {
    e.preventDefault();
    setFileError(false);
    attachments.map(function (liite, idx) {
      if (tiedostoId && liite.tiedostoId === tiedostoId || uuid && liite.uuid === uuid) {
        var atts = _toConsumableArray(props.payload.attachments);

        atts[idx].removed = true;
        setAttachments(atts);
        props.onUpdate(props.payload, {
          attachments: atts
        });
        return true;
      } else return false;
    });
  }; // Sen name of attachment


  var setAttachmentName = function setAttachmentName(e, tiedostoId, uuid) {
    e.preventDefault();
    setFileError(false); // setFileAdded("");

    attachments.map(function (liite, idx) {
      if (tiedostoId && liite.tiedostoId === tiedostoId || uuid && liite.uuid === uuid) {
        var atts = props.payload.attachments;
        atts[idx].nimi = e.target.value;
        setAttachments(atts);
        props.onUpdate(props.payload, {
          attachments: atts
        });
        return true;
      } else return false;
    });
  }; // set if attachment is secret


  var setAttachmentVisibility = function setAttachmentVisibility(e, tiedostoId, uuid) {
    e.preventDefault();
    setFileError(false); // setFileAdded("");

    attachments.map(function (liite, idx) {
      if (tiedostoId && liite.tiedostoId === tiedostoId || uuid && liite.uuid === uuid) {
        var atts = _toConsumableArray(attachments);

        atts[idx].salainen = e.target.checked;
        setAttachments(atts);
        props.onUpdate(props.payload, {
          attachments: atts
        });
        return true;
      } else return false;
    });
  }; // Checks if file limits are met


  var bytesToSize = function bytesToSize(bytes) {
    if (!bytes || bytes === 0) return "";
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    var i = parseInt(Math.floor(Math.log(Math.abs(bytes)) / Math.log(1024)), 10);
    if (i === 0) return "(".concat(bytes, " ").concat(sizes[i], "))");else return "".concat((bytes / Math.pow(1024, i)).toFixed(1), " ").concat(sizes[i]);
  };

  var addLiiteUrl = function addLiiteUrl(file) {
    return file.uuid ? Object.assign({}, file, {
      url: "/liitteet/".concat(file.uuid, "/raw")
    }) : file;
  }; // Lists all attachments


  var LiiteList = function LiiteList() {
    if (attachments && attachments.length > 0) return attachments.map(function (liite) {
      if ((liite.tiedostoId || liite.uuid) && !liite.removed && (!props.placement || liite.paikka === props.placement)) {
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: props.id + liite.tiedostoId ? liite.tiedostoId : liite.uuid
        }, /*#__PURE__*/React.createElement(LiiteListItem, null, liite.new ? /*#__PURE__*/React.createElement(FaFile, null) : /*#__PURE__*/React.createElement(FaRegFile, null), /*#__PURE__*/React.createElement("input", {
          onBlur: function onBlur(e) {
            setAttachmentName(e, liite.tiedostoId, liite.uuid);
          },
          defaultValue: liite.nimi,
          onKeyPress: function onKeyPress(e) {
            if (e.key === "Enter") {
              setAttachmentName(e, liite.tiedostoId, liite.uuid);
            }
          }
        }), /*#__PURE__*/React.createElement("span", {
          className: "type"
        }, liite.tyyppi), /*#__PURE__*/React.createElement("span", {
          className: "size"
        }, bytesToSize(liite.koko)), /*#__PURE__*/React.createElement("button", {
          title: props.messages.attachmentDownload,
          onClick: downloadFileFn(addLiiteUrl(liite)),
          className: "ml-2"
        }, /*#__PURE__*/React.createElement(FaDownload, null)), /*#__PURE__*/React.createElement(Checkbox, {
          title: liite.salainen ? props.messages.attachmentSecretUnselect : props.messages.attachmentSecretSelect
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          checked: liite.salainen,
          onChange: function onChange(e) {
            return setAttachmentVisibility(e, liite.tiedostoId, liite.uuid);
          },
          id: liite.tiedostoId ? "c" + liite.tiedostoId : "c" + liite.uuid
        }), /*#__PURE__*/React.createElement("label", {
          htmlFor: liite.tiedostoId ? "c" + liite.tiedostoId : "c" + liite.uuid
        }, liite.salainen && /*#__PURE__*/React.createElement(FaLock, null))), /*#__PURE__*/React.createElement("button", {
          title: props.messages.attachmentRemove,
          onClick: function onClick(e) {
            return removeAttachment(e, liite.tiedostoId, liite.uuid);
          }
        }, /*#__PURE__*/React.createElement(FaTimes, null))));
      } else return null;
    });else return null;
  }; // Lists all attachments in read only state


  var LiiteListReadOnly = function LiiteListReadOnly() {
    if (attachments && attachments.length > 0) return attachments.map(function (liite) {
      if ((liite.tiedostoId || liite.uuid) && !liite.removed && (!props.placement || liite.paikka === props.placement)) {
        return /*#__PURE__*/React.createElement(React.Fragment, {
          key: props.id + liite.tiedostoId ? liite.tiedostoId : liite.uuid
        }, /*#__PURE__*/React.createElement(LiiteListItem, null, liite.new ? /*#__PURE__*/React.createElement(FaFile, null) : /*#__PURE__*/React.createElement(FaRegFile, null), /*#__PURE__*/React.createElement("span", {
          className: "w-full pl-2"
        }, liite.nimi), /*#__PURE__*/React.createElement("span", {
          className: "type"
        }, liite.tyyppi), /*#__PURE__*/React.createElement("span", {
          className: "size"
        }, bytesToSize(liite.koko)), /*#__PURE__*/React.createElement("button", {
          title: props.messages.attachmentDownload,
          onClick: downloadFileFn(addLiiteUrl(liite)),
          className: "ml-2"
        }, /*#__PURE__*/React.createElement(FaDownload, null)), /*#__PURE__*/React.createElement("span", {
          title: liite.salainen ? props.messages.attachmentSecret : ""
        }, liite.salainen && /*#__PURE__*/React.createElement(FaLock, null))));
      } else return null;
    });else {
      return /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("i", null, props.messages.attachmentNone));
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, !props.showListOnly && !props.isReadOnly && /*#__PURE__*/React.createElement(Attachment, {
    id: props.id,
    messages: props.messages,
    setAttachment: setAttachment,
    setAttachmentName: setAttachmentName
  }), fileError && /*#__PURE__*/React.createElement(Error, null, props.messages.attachmentError), props.showValidationErrors && props.isRequired && props.requiredMessage && (!attachments || attachments && attachments.length === 0) && /*#__PURE__*/React.createElement(FormHelperText, {
    id: "component-message-text",
    style: {
      marginTop: "0.1em",
      marginBottom: "0.5em",
      color: COLORS.OIVA_ORANGE_TEXT
    }
  }, /*#__PURE__*/React.createElement(Incomplete, {
    style: {
      fontSize: 24,
      color: COLORS.OIVA_ORANGE,
      marginRight: "0.2em"
    }
  }), props.requiredMessage), !props.listHidden && !props.isReadOnly && /*#__PURE__*/React.createElement(LiiteList, null), !props.listHidden && props.isReadOnly && /*#__PURE__*/React.createElement(LiiteListReadOnly, null), /*#__PURE__*/React.createElement(Dialog, {
    open: isNameModalOpen,
    "aria-labelledby": "name-dialog",
    fullWidth: true,
    maxWidth: "sm"
  }, /*#__PURE__*/React.createElement(DialogTitle, {
    id: "name-dialog"
  }, props.messages.attachmentName), /*#__PURE__*/React.createElement(DialogContent, null, /*#__PURE__*/React.createElement(Input, {
    defaultValue: selectedAttachment.nimi,
    autoFocus: true,
    onFocus: function onFocus(e) {
      var val = e.target.value;
      e.target.value = "";
      e.target.value = val;
    },
    onBlur: function onBlur(e) {
      setAttachmentName(e, selectedAttachment.tiedostoId, selectedAttachment.uuid);
    },
    onKeyUp: function onKeyUp(e) {
      if (e.keyCode === 13) {
        setAttachmentName(e, selectedAttachment.tiedostoId, selectedAttachment.uuid);
        addAttachment(e);
      }
    }
  }), /*#__PURE__*/React.createElement(Error, null, nameMissing && props.messages.attachmentErrorName)), /*#__PURE__*/React.createElement(DialogActions, null, /*#__PURE__*/React.createElement(Button, {
    onClick: addAttachment,
    color: "primary",
    variant: "contained"
  }, props.messages.ok), /*#__PURE__*/React.createElement(Button, {
    onClick: cancelAttachment,
    color: "secondary",
    variant: "outlined"
  }, props.messages.cancel))));
}, function (prevState, nextState) {
  return R.equals(prevState.payload, nextState.payload);
});
export default Attachments;