import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import * as R from "ramda";
import ContentEditable from "react-contenteditable";
import { FaTimes, FaLock, FaUnlock, FaDownload, FaEdit } from "react-icons/fa";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { withStyles, IconButton } from "@material-ui/core";
import Tooltip from "../Tooltip";
import { downloadFileFn } from "../../../utils/common";
import _ from "lodash";

const alter = R.curry((id, value, path, items) =>
  R.map(R.when(R.propEq("id", id), R.assocPath(path, value)), items)
);

const StyledToggleButton = withStyles({
  root: {
    width: "3em",
    height: "3em",
    marginTop: "0.5em",
    marginBottom: "0.5em",
    "&.Mui-selected": {
      color: "red"
    }
  }
})(ToggleButton);

// 'mimeTypes' => array('image/jpeg', 'image/png','image/jpg','application/vnd.ms-excel',
// 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/docx',
// 'application/pdf','text/plain','application/msword',
// 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const defaultProps = {
  acceptedTypes: [
    "image/*",
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ],
  isReadOnly: false,
  messages: {},
  minSize: 0,
  maxSize: 26214400, // 1MB = 1048576
  uploadedFiles: []
};

const FileUpload = ({
  acceptedTypes = defaultProps.acceptedTypes,
  isReadOnly,
  messages = defaultProps.messages,
  minSize = defaultProps.minSize,
  maxSize = defaultProps.maxSize,
  onChanges,
  payload,
  uploadedFiles = defaultProps.uploadedFiles
}) => {
  const onDrop = useCallback(
    acceptedFiles => {
      console.info(acceptedFiles);
      if (acceptedFiles.length > 0) {
        const files = R.concat(
          uploadedFiles,
          R.map(file => {
            const liite = {
              tiedostoId: Math.random() + "-" + file.name,
              filename: file.name,
              kieli: "fi", // Hard coded... but why?
              name: file.name,
              nimi: R.toLower(
                R.slice(0, R.lastIndexOf(".", file.name), file.name)
              ),
              tiedosto: new Blob([file]),
              koko: file.size,
              size: file.size,
              tyyppi: R.slice(
                R.lastIndexOf(".", file.name) + 1,
                Infinity,
                file.name
              ),
              type: file.type,
              removed: false,
              salainen: false,
              new: true
            };
            return {
              file: liite,
              id: Math.random()
            };
          }, acceptedFiles)
        );
        onChanges(payload, {
          uploadedFiles: files
        });
      }
    },
    [onChanges, payload, uploadedFiles]
  );

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    fileRejections
  } = useDropzone({
    accept: acceptedTypes,
    minSize,
    maxSize,
    onDrop
  });

  function handleFileRename(e, id) {
    onChanges(payload, {
      uploadedFiles: alter(id, e.target.value, ["file", "nimi"], uploadedFiles)
    });
  }

  const renamingDelayed = _.debounce(handleFileRename, 300);

  const editFile = id => {
    console.info(id);
  };

  function togglePublicity(id, newValue) {
    onChanges(payload, {
      uploadedFiles: alter(id, newValue, ["file", "salainen"], uploadedFiles)
    });
  }

  function removeFile(id) {
    onChanges(payload, {
      uploadedFiles: R.filter(
        R.compose(R.not, R.equals(id), R.prop("id")),
        uploadedFiles
      )
    });
  }

  function downloadFile(file) {
    const fileToDownload = file.uuid
      ? { ...file, url: `/liitteet/${file.uuid}/raw` }
      : file;
    downloadFileFn(fileToDownload)();
  }

  const hasFilesWithUUID = useMemo(() => {
    return (
      R.filter(({ file }) => {
        return file.uuid || false;
      }, uploadedFiles).length > 0
    );
  }, [uploadedFiles]);

  const fileRejectionItems = R.map(
    ({ file, errors }) => (
      <li key={file.path}>
        {file.path} - {Math.round(file.size) / 100} KB
        <ul className="list-disc ml-8 text-red-500">
          {R.map(e => {
            console.info(e);
            return <li key={e.code}>{messages[e.code] || e.message}</li>;
          }, errors)}
        </ul>
      </li>
    ),
    fileRejections
  );

  return (
    <div>
      {!isReadOnly && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="min-h-20 p-8 cursor-pointer flex flex-col justify-center items-center border border-dashed border-gray-600">
            {isDragActive ? (
              <p>{messages.dropAreaInfo3}</p>
            ) : (
              <React.Fragment>
                <p>{messages.dropAreaInfo1}</p>
                {uploadedFiles.length > 0 && <p>{messages.dropAreaInfo2}</p>}
              </React.Fragment>
            )}
            {fileRejectionItems.length ? (
              <ul className="mt-12 list-disc">{fileRejectionItems}</ul>
            ) : null}
          </div>
        </div>
      )}
      <table className="mt-8 w-full text-left">
        {uploadedFiles.length > 0 && (
          <thead className="font-bold">
            <tr>
              <th>Nimi</th>
              <th>Tyyppi</th>
              <th>Koko</th>
              {!isReadOnly && <th>{messages.functions}</th>}
            </tr>
          </thead>
        )}
        <tbody>
          {R.map(({ file, id }) => {
            return (
              <tr
                key={`file-${id}`}
                className={`${
                  isReadOnly ? "py-4" : ""
                } border-t border-gray-400`}>
                <td className="items-center">
                  <span>
                    {isReadOnly ? (
                      file.nimi
                    ) : (
                      <ContentEditable
                        html={file.nimi} // innerHTML of the editable div
                        disabled={false} // use true to disable edition
                        onChange={e => renamingDelayed(e, id)} // handle innerHTML change
                        tagName="span"
                      />
                    )}
                  </span>
                </td>
                <td className="break-words">{file.tyyppi}</td>
                <td>{Math.round(file.size) / 100} KB</td>
                {!isReadOnly ? (
                  <td>
                    {file.uuid && (
                      <span className="mr-2">
                        <Tooltip
                          placement="left"
                          tooltip="Tallenna liite koneellesi">
                          <IconButton
                            variant="contained"
                            size="small"
                            onClick={() => downloadFile(file)}>
                            <FaDownload />
                          </IconButton>
                        </Tooltip>
                      </span>
                    )}
                    <span className="mr-2">
                      <Tooltip
                        placement="bottom"
                        tooltip={
                          file.salainen
                            ? "common.attachmentSecretUnselect"
                            : "common.attachmentSecretSelect"
                        }>
                        <StyledToggleButton
                          value="check"
                          selected={file.salainen}
                          size="small"
                          onChange={() => {
                            togglePublicity(id, !!!file.salainen);
                          }}
                          title={
                            file.salainen
                              ? "common.attachmentSecretUnselect"
                              : "common.attachmentSecretSelect"
                          }>
                          {!file.salainen ? <FaUnlock /> : <FaLock />}
                        </StyledToggleButton>
                      </Tooltip>
                    </span>
                    {!isReadOnly && (
                      <span className="mr-2">
                        <Tooltip
                          placement="right"
                          tooltip="Poista liite hakemukselta">
                          <IconButton
                            variant="contained"
                            size="small"
                            onClick={() => removeFile(id)}>
                            <FaTimes />
                          </IconButton>
                        </Tooltip>
                      </span>
                    )}
                    {!isReadOnly && (
                      <span className="mr-2">
                        <Tooltip
                          placement="right"
                          tooltip="Muokkaa tiedoston nimeä">
                          <IconButton
                            variant="contained"
                            size="small"
                            onClick={() => editFile(id)}>
                            <FaEdit />
                          </IconButton>
                        </Tooltip>
                      </span>
                    )}
                  </td>
                ) : null}
              </tr>
            );
          }, uploadedFiles)}
        </tbody>
      </table>
    </div>
  );
};

FileUpload.propTypes = {
  isReadOnly: PropTypes.bool,
  messages: PropTypes.object,
  minSize: PropTypes.number,
  maxSize: PropTypes.number,
  acceptedTypes: PropTypes.array,
  onChanges: PropTypes.func.isRequired,
  payload: PropTypes.object,
  uploadedFiles: PropTypes.array
};

export default FileUpload;
