import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import * as R from "ramda";
import ContentEditable from "react-contenteditable";
import { FaTimes, FaLock, FaUnlock, FaDownload, FaEdit } from "react-icons/fa";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withStyles, IconButton } from "@material-ui/core";
import Tooltip from "../Tooltip";
import { downloadFileFn } from "../../../utils/common";
import _ from "lodash";
var alter = R.curry(function (id, value, path, items) {
  return R.map(R.when(R.propEq("id", id), R.assocPath(path, value)), items);
});
var StyledToggleButton = withStyles({
  root: {
    width: "3em",
    height: "3em",
    marginTop: "0.5em",
    marginBottom: "0.5em",
    "&.Mui-selected": {
      color: "red"
    }
  }
})(ToggleButton); // 'mimeTypes' => array('image/jpeg', 'image/png','image/jpg','application/vnd.ms-excel',
// 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/docx',
// 'application/pdf','text/plain','application/msword',
// 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

var defaultProps = {
  acceptedTypes: ["image/*", "application/pdf", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
  isReadOnly: false,
  messages: {},
  minSize: 0,
  maxSize: 26214400,
  // 1MB = 1048576
  uploadedFiles: []
};

var FileUpload = function FileUpload(_ref) {
  var _ref$acceptedTypes = _ref.acceptedTypes,
      acceptedTypes = _ref$acceptedTypes === void 0 ? defaultProps.acceptedTypes : _ref$acceptedTypes,
      isReadOnly = _ref.isReadOnly,
      _ref$messages = _ref.messages,
      messages = _ref$messages === void 0 ? defaultProps.messages : _ref$messages,
      _ref$minSize = _ref.minSize,
      minSize = _ref$minSize === void 0 ? defaultProps.minSize : _ref$minSize,
      _ref$maxSize = _ref.maxSize,
      maxSize = _ref$maxSize === void 0 ? defaultProps.maxSize : _ref$maxSize,
      onChanges = _ref.onChanges,
      payload = _ref.payload,
      _ref$uploadedFiles = _ref.uploadedFiles,
      uploadedFiles = _ref$uploadedFiles === void 0 ? defaultProps.uploadedFiles : _ref$uploadedFiles;
  var onDrop = useCallback(function (acceptedFiles) {
    console.info(acceptedFiles);

    if (acceptedFiles.length > 0) {
      var files = R.concat(uploadedFiles, R.map(function (file) {
        var liite = {
          tiedostoId: Math.random() + "-" + file.name,
          filename: file.name,
          kieli: "fi",
          // Hard coded... but why?
          name: file.name,
          nimi: R.toLower(R.slice(0, R.lastIndexOf(".", file.name), file.name)),
          tiedosto: new Blob([file]),
          koko: file.size,
          size: file.size,
          tyyppi: R.slice(R.lastIndexOf(".", file.name) + 1, Infinity, file.name),
          type: file.type,
          removed: false,
          salainen: false,
          new: true
        };
        return {
          file: liite,
          id: Math.random()
        };
      }, acceptedFiles));
      onChanges(payload, {
        uploadedFiles: files
      });
    }
  }, [onChanges, payload, uploadedFiles]);

  var _useDropzone = useDropzone({
    accept: acceptedTypes,
    minSize: minSize,
    maxSize: maxSize,
    onDrop: onDrop
  }),
      isDragActive = _useDropzone.isDragActive,
      getRootProps = _useDropzone.getRootProps,
      getInputProps = _useDropzone.getInputProps,
      fileRejections = _useDropzone.fileRejections;

  function handleFileRename(e, id) {
    onChanges(payload, {
      uploadedFiles: alter(id, e.target.value, ["file", "nimi"], uploadedFiles)
    });
  }

  var renamingDelayed = _.debounce(handleFileRename, 300);

  var editFile = function editFile(id) {
    console.info(id);
  };

  function togglePublicity(id, newValue) {
    onChanges(payload, {
      uploadedFiles: alter(id, newValue, ["file", "salainen"], uploadedFiles)
    });
  }

  function removeFile(id) {
    onChanges(payload, {
      uploadedFiles: R.filter(R.compose(R.not, R.equals(id), R.prop("id")), uploadedFiles)
    });
  }

  function downloadFile(file) {
    var fileToDownload = file.uuid ? _objectSpread({}, file, {
      url: "/liitteet/".concat(file.uuid, "/raw")
    }) : file;
    downloadFileFn(fileToDownload)();
  }

  var hasFilesWithUUID = useMemo(function () {
    return R.filter(function (_ref2) {
      var file = _ref2.file;
      return file.uuid || false;
    }, uploadedFiles).length > 0;
  }, [uploadedFiles]);
  var fileRejectionItems = R.map(function (_ref3) {
    var file = _ref3.file,
        errors = _ref3.errors;
    return /*#__PURE__*/React.createElement("li", {
      key: file.path
    }, file.path, " - ", Math.round(file.size) / 100, " KB", /*#__PURE__*/React.createElement("ul", {
      className: "list-disc ml-8 text-red-500"
    }, R.map(function (e) {
      console.info(e);
      return /*#__PURE__*/React.createElement("li", {
        key: e.code
      }, messages[e.code] || e.message);
    }, errors)));
  }, fileRejections);
  return /*#__PURE__*/React.createElement("div", null, !isReadOnly && /*#__PURE__*/React.createElement("div", getRootProps(), /*#__PURE__*/React.createElement("input", getInputProps()), /*#__PURE__*/React.createElement("div", {
    className: "min-h-20 p-8 cursor-pointer flex flex-col justify-center items-center border border-dashed border-gray-600"
  }, isDragActive ? /*#__PURE__*/React.createElement("p", null, messages.dropAreaInfo3) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, messages.dropAreaInfo1), uploadedFiles.length > 0 && /*#__PURE__*/React.createElement("p", null, messages.dropAreaInfo2)), fileRejectionItems.length ? /*#__PURE__*/React.createElement("ul", {
    className: "mt-12 list-disc"
  }, fileRejectionItems) : null)), /*#__PURE__*/React.createElement("table", {
    className: "mt-8 w-full text-left"
  }, uploadedFiles.length > 0 && /*#__PURE__*/React.createElement("thead", {
    className: "font-bold"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Nimi"), /*#__PURE__*/React.createElement("th", null, "Tyyppi"), /*#__PURE__*/React.createElement("th", null, "Koko"), !isReadOnly && /*#__PURE__*/React.createElement("th", null, messages.functions))), /*#__PURE__*/React.createElement("tbody", null, R.map(function (_ref4) {
    var file = _ref4.file,
        id = _ref4.id;
    return /*#__PURE__*/React.createElement("tr", {
      key: "file-".concat(id),
      className: "".concat(isReadOnly ? "py-4" : "", " border-t border-gray-400")
    }, /*#__PURE__*/React.createElement("td", {
      className: "items-center"
    }, /*#__PURE__*/React.createElement("span", null, isReadOnly ? file.nimi : /*#__PURE__*/React.createElement(ContentEditable, {
      html: file.nimi // innerHTML of the editable div
      ,
      disabled: false // use true to disable edition
      ,
      onChange: function onChange(e) {
        return renamingDelayed(e, id);
      } // handle innerHTML change
      ,
      tagName: "span"
    }))), /*#__PURE__*/React.createElement("td", {
      className: "break-words"
    }, file.tyyppi), /*#__PURE__*/React.createElement("td", null, Math.round(file.size) / 100, " KB"), !isReadOnly ? /*#__PURE__*/React.createElement("td", null, file.uuid && /*#__PURE__*/React.createElement("span", {
      className: "mr-2"
    }, /*#__PURE__*/React.createElement(Tooltip, {
      placement: "left",
      tooltip: "Tallenna liite koneellesi"
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "contained",
      size: "small",
      onClick: function onClick() {
        return downloadFile(file);
      }
    }, /*#__PURE__*/React.createElement(FaDownload, null)))), /*#__PURE__*/React.createElement("span", {
      className: "mr-2"
    }, /*#__PURE__*/React.createElement(Tooltip, {
      placement: "bottom",
      tooltip: file.salainen ? "common.attachmentSecretUnselect" : "common.attachmentSecretSelect"
    }, /*#__PURE__*/React.createElement(StyledToggleButton, {
      value: "check",
      selected: file.salainen,
      size: "small",
      onChange: function onChange() {
        togglePublicity(id, !!!file.salainen);
      },
      title: file.salainen ? "common.attachmentSecretUnselect" : "common.attachmentSecretSelect"
    }, !file.salainen ? /*#__PURE__*/React.createElement(FaUnlock, null) : /*#__PURE__*/React.createElement(FaLock, null)))), !isReadOnly && /*#__PURE__*/React.createElement("span", {
      className: "mr-2"
    }, /*#__PURE__*/React.createElement(Tooltip, {
      placement: "right",
      tooltip: "Poista liite hakemukselta"
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "contained",
      size: "small",
      onClick: function onClick() {
        return removeFile(id);
      }
    }, /*#__PURE__*/React.createElement(FaTimes, null)))), !isReadOnly && /*#__PURE__*/React.createElement("span", {
      className: "mr-2"
    }, /*#__PURE__*/React.createElement(Tooltip, {
      placement: "right",
      tooltip: "Muokkaa tiedoston nime\xE4"
    }, /*#__PURE__*/React.createElement(IconButton, {
      variant: "contained",
      size: "small",
      onClick: function onClick() {
        return editFile(id);
      }
    }, /*#__PURE__*/React.createElement(FaEdit, null))))) : null);
  }, uploadedFiles))));
};

export default FileUpload;