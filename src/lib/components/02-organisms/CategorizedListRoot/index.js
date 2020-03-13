import React, { useCallback, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import CategorizedList from "./CategorizedList";
import { handleNodeMain, getReducedStructure, getTargetNode } from "./utils";
import * as R from "ramda";

const defaultProps = {
  anchor: "anchornamemissing",
  categories: [],
  changes: [null],
  debug: false,
  sectionId: "sectionidmissing",
  showCategoryTitles: false
};

const CategorizedListRoot = React.memo(
  ({
    anchor = defaultProps.anchor,
    categories = defaultProps.categories,
    changes = defaultProps.changes,
    debug = defaultProps.debug,
    onUpdate,
    showCategoryTitles = defaultProps.showCategoryTitles,
    isReadOnly,
    showValidationErrors
  }) => {
    const changesRef = useRef(null);

    changesRef.current = useMemo(() => {
      return changes;
    }, [changes]);

    const reducedStructure = useMemo(() => {
      return getReducedStructure(categories);
    }, [categories]);

    const onChangesUpdate = useCallback(
      changeObj => {
        const targetNode = getTargetNode(changeObj, reducedStructure);
        const nextChanges = handleNodeMain(
          targetNode,
          anchor,
          reducedStructure,
          changesRef.current
        );
        onUpdate({
          anchor,
          changes: nextChanges
        });
      },
      [anchor, onUpdate, reducedStructure]
    );

    /**
     * Function skips the tree checking (onChangesUpdate func, handleNodeMain).
     * Tree checking might be needed on future use cases.
     */
    const removeChangeObject = useCallback(
      _anchor => {
        return onUpdate({
          anchor,
          changes: R.filter(
            R.compose(R.not, R.propEq("anchor", _anchor)),
            changes
          )
        });
      },
      [anchor, changes, onUpdate]
    );

    return (
      <React.Fragment>
        {!R.equals(R.head(changes), null)
          ? (() => {
              return (
                <CategorizedList
                  anchor={anchor}
                  categories={categories}
                  changes={changes}
                  rootPath={[]}
                  showCategoryTitles={showCategoryTitles}
                  onChangesUpdate={onChangesUpdate}
                  removeChangeObject={removeChangeObject}
                  isReadOnly={isReadOnly}
                  showValidationErrors={showValidationErrors}
                />
              );
            })()
          : null}
      </React.Fragment>
    );
  },
  (prevState, nextState) => {
    return R.equals(prevState, nextState);
  }
);

CategorizedListRoot.propTypes = {
  anchor: PropTypes.string,
  categories: PropTypes.array,
  changes: PropTypes.array,
  index: PropTypes.number,
  interval: PropTypes.number,
  isPlaying: PropTypes.bool,
  onUpdate: PropTypes.func.isRequired,
  sectionId: PropTypes.string,
  showCategoryTitles: PropTypes.bool,
  debug: PropTypes.bool,
  isReadOnly: PropTypes.bool,
  showValidationErrors: PropTypes.bool
};

export default CategorizedListRoot;
