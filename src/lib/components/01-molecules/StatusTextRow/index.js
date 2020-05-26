import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as R from "ramda";

const defaultProps = {
  styleClasses: ["text-base"]
};

const StatusTextRow = React.memo(
  ({
    children,
    isHidden,
    isRequired,
    isValid,
    labelStyles,
    layout,
    statusText,
    statusTextStyleClasses,
    styleClasses,
    isReadOnly
  }) => {
    const [classNames, setClassNames] = useState(defaultProps.styleClasses);

    useEffect(() => {
      if (styleClasses && styleClasses.length) {
        setClassNames(styleClasses);
      }
    }, [styleClasses]);

    useEffect(() => {
      const paddingClass = layout && layout.dense ? "pt-2" : "py-2";
      setClassNames(prevValue => {
        return R.append(paddingClass, prevValue);
      });
    }, [layout]);

    if (!isHidden) {
      return (
        <div className={R.join(" ", classNames)} style={labelStyles}>
          <div className="flex">
            {statusText && (
              <div className={R.join(" ", statusTextStyleClasses)}>
                {statusText}
              </div>
            )}
            {children}
            {!isReadOnly && isRequired && <span className="pr-4">*</span>}{" "}
          </div>
        </div>
      );
    }
  },
  (cp, np) => {
    return (
      cp.isHidden === np.isHidden &&
      cp.isReadOnly === np.isReadOnly &&
      cp.isRequired === np.isRequired &&
      cp.isValid === np.isValid &&
      cp.statusText === np.statusText
    );
  }
);

StatusTextRow.propTypes = {
  isHidden: PropTypes.bool,
  isRequired: PropTypes.bool,
  isValid: PropTypes.bool,
  labelStyles: PropTypes.object,
  layout: PropTypes.object,
  styleClasses: PropTypes.array,
  statusText: PropTypes.string,
  statusTextStyleClasses: PropTypes.array,
  isReadOnly: PropTypes.bool
};

export default StatusTextRow;
