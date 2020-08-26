import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _taggedTemplateLiteral from "@babel/runtime/helpers/esm/taggedTemplateLiteral";

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  margin-bottom: 8px;\n  min-height: 20px;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

import React, { useState } from "react";
import Attachment from "../Attachment";
import DialogTitle from "../DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { Input } from "../Attachments";
import styled from "styled-components";
import { COLORS } from "../Attachments/styles";
import { checkFiletypeAndSize } from "../Attachments/utils";
var Error = styled.div(_templateObject(), COLORS.OIVA_RED);
var SelectAttachment = React.memo(function (props) {
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      nameMissing = _useState2[0],
      setNameMissing = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isNameModalOpen = _useState4[0],
      setIsNameModalOpen = _useState4[1];

  var _useState5 = useState([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedAttachment = _useState6[0],
      setSelectedAttachment = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      fileError = _useState8[0],
      setFileError = _useState8[1];

  var setAttachment = function setAttachment(e) {
    setFileError(false);
    if (e.target.files.length === 0) return;
    var type = e.target.files[0].name.split(".").pop().toLowerCase(); // Rajoitetaan max kooksi 25MB ja vain pdf, word, excel, jpeg ja gif on sallittuja

    if (checkFiletypeAndSize(type, e.target.files[0].size)) {
      var liite = {};
      liite.tiedostoId = Math.random() + "-" + e.target.files[0].name;
      liite.filename = e.target.files[0].name;
      liite.kieli = "fi";
      liite.tyyppi = props.fileType ? props.fileType : type;
      liite.nimi = e.target.files[0].name.split(".")[0].toLowerCase();
      liite.tiedosto = new Blob([e.target.files[0]]);
      liite.koko = e.target.files[0].size;
      liite.removed = false;
      liite.salainen = false;
      setSelectedAttachment(liite);
      openNameModal();
    } else return setFileError(true);
  };

  var openNameModal = function openNameModal() {
    setNameMissing(false);
    setIsNameModalOpen(true);
  };

  var addAttachment = function addAttachment() {
    if (selectedAttachment.nimi) {
      props.attachmentAdded(selectedAttachment);
    } else {
      setNameMissing(true);
    }
  };

  var cancelAttachment = function cancelAttachment() {
    setSelectedAttachment([]);
    setIsNameModalOpen(false);
  };

  var setAttachmentName = function setAttachmentName(e) {
    var liite = selectedAttachment;
    liite.nimi = e.target.value;
    setSelectedAttachment(liite);
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Attachment, {
    style: {
      cursor: 'pointer'
    },
    id: props.id,
    name: props.name,
    styles: props.styles,
    setAttachment: setAttachment,
    setAttachmentName: setAttachmentName,
    messages: props.messages
  }), fileError && /*#__PURE__*/React.createElement(Error, null, props.messages.attachmentError), /*#__PURE__*/React.createElement(Dialog, {
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
      setAttachmentName(e);
    },
    onKeyUp: function onKeyUp(e) {
      if (e.keyCode === 13) {
        setAttachmentName(e);
        addAttachment();
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
});
SelectAttachment.defaultProps = {
  styles: {}
};
export default SelectAttachment;