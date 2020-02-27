import React, { useState } from "react";
import PropTypes from "prop-types";
import ExpandableRow from "./ExpandableRow";
import CategorizedListRoot from "../CategorizedListRoot";
import NumberOfChanges from "../../00-atoms/NumberOfChanges";
import { makeStyles } from "@material-ui/core/styles";
import UndoIcon from "@material-ui/icons/Undo";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles(() => ({
  button: {
    padding: 0
  }
}));

const defaultProps = {
  categories: [],
  changes: [],
  disableReverting: false,
  hideAmountOfChanges: false,
  isExpanded: false,
  messages: {
    undo: "Undo"
  },
  showCategoryTitles: false
};

const ExpandableRowRoot = ({
  anchor,
  categories = defaultProps.categories,
  changes = defaultProps.changes,
  children,
  code,
  disableReverting = defaultProps.disableReverting,
  hideAmountOfChanges = defaultProps.hideAmountOfChanges,
  index,
  isExpanded = defaultProps.isExpanded,
  messages = defaultProps.messages,
  onChangesRemove,
  onUpdate,
  sectionId,
  showCategoryTitles = defaultProps.showCategoryTitles,
  title,
  isReadOnly
}) => {
  const classes = useStyles();
  const [isToggledOpen, setIsToggleOpen] = useState(false);

  const onToggle = (...props) => {
    setIsToggleOpen(props[1]);
  };

  return (
    <React.Fragment>
      {categories && (
        <ExpandableRow
          shouldBeExpanded={isExpanded}
          onToggle={onToggle}
          id={anchor}>
          <h4 data-slot="title" className="opacity-75">
            {code && <span className="pr-6">{code}</span>}
            <span>{title}</span>
          </h4>
          <div data-slot="info">
            {changes.length > 0 && (
              <div className="flex items-center">
                {!hideAmountOfChanges && (
                  <NumberOfChanges changes={changes} id={anchor} />
                )}
                {!disableReverting && (
                  <span className="mx-6">
                    <Tooltip title={messages.undo}>
                      <IconButton
                        className={classes.button}
                        variant="outlined"
                        size="small"
                        onClick={e => {
                          e.stopPropagation();
                          return onChangesRemove(sectionId, anchor, index);
                        }}>
                        <UndoIcon />
                      </IconButton>
                    </Tooltip>
                  </span>
                )}
              </div>
            )}
          </div>
          <div
            data-slot="content"
            className={`w-full ${!children ? "p-8" : ""}`}>
            {!children && (isExpanded || isToggledOpen) ? (
              <CategorizedListRoot
                anchor={anchor}
                categories={categories}
                changes={changes}
                index={index}
                onUpdate={onUpdate}
                sectionId={sectionId}
                showCategoryTitles={showCategoryTitles}
                isReadOnly={isReadOnly}
              />
            ) : (
              children
            )}
          </div>
        </ExpandableRow>
      )}
    </React.Fragment>
  );
};

ExpandableRowRoot.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changes: PropTypes.array,
  code: PropTypes.string,
  disableReverting: PropTypes.bool,
  hideAmountOfChanges: PropTypes.bool,
  index: PropTypes.number,
  isExpanded: PropTypes.bool,
  messages: PropTypes.object,
  onChangesRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  sectionId: PropTypes.string,
  showCategoryTitles: PropTypes.bool,
  title: PropTypes.string,
  isReadOnly: PropTypes.bool
};

export default ExpandableRowRoot;
