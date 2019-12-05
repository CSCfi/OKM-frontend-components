import React, { useState, useEffect } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PropTypes from "prop-types";

const TextBox = props => {
  const [value, setValue] = useState(null);
  const [handle, setHandle] = useState(null);

  const updateValue = e => {
    setValue(e.target.value);
    if (handle) {
      clearTimeout(handle);
    }
    setHandle(
      (v => {
        return setTimeout(() => {
          props.onChanges(props.payload, { value: v });
        }, props.delay);
      })(e.target.value)
    );
  };

  useEffect(() => {
    if (props.value !== value || !value) {
      setValue(props.value);
    }
  }, [props.value, value]);

  return (
    <React.Fragment>
      {value !== null ? (
        <React.Fragment>
          {props.title && (
            <label className="text-bold text-base block my-2">
              {props.title}
            </label>
          )}
          <TextareaAutosize
            aria-label={props.ariaLabel}
            disabled={props.isDisabled || props.isReadOnly}
            id={props.id}
            placeholder={
              props.isDisabled || props.isReadOnly ? "" : props.placeholder
            }
            rows={props.isReadOnly ? 1 : props.rows}
            rowsMax={props.isReadOnly ? Infinity : props.rowsMax}
            className={`${props.isHidden ? "hidden" : ""}
             ${
               props.isReadOnly
                 ? "color: text-black"
                 : "border border-solid border-gray-500 rounded"
             } w-full p-2 resize-none`}
            onChange={updateValue}
            value={value}
            inputprops={{
              readOnly: props.isReadOnly
            }}
          />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

TextBox.defaultProps = {
  ariaLabel: "Text area",
  delay: 300,
  isDisabled: false,
  isHidden: false,
  payload: {},
  placeholder: "",
  isReadOnly: false,
  rows: 2,
  rowsMax: 100,
  title: ""
};

TextBox.propTypes = {
  ariaLabel: PropTypes.string,
  delay: PropTypes.number,
  id: PropTypes.string,
  isDisabled: PropTypes.bool,
  isHidden: PropTypes.bool,
  /** Is called with the payload and the value. */
  onChanges: PropTypes.func.isRequired,
  /** Custom object defined by user. */
  payload: PropTypes.object,
  placeholder: PropTypes.string,
  isReadOnly: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.string
};

export default TextBox;
