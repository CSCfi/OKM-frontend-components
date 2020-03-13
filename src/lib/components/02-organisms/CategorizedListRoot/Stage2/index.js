import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Select, MenuItem, FormControl } from "@material-ui/core";

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const intervalOptions = [500, 1000, 2000, 3000, 4000, 5000, 10000];
let timeoutHandle = null;

function Stage2(props) {
  let originalInterval = props.interval;

  const [interval, setInterval] = useState(originalInterval || 3000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [changes, setChanges] = useState(props.changes);

  let originalChanges = props.changes;

  const handleUpdate = payload => {
    setChanges(payload.changes);
  };

  function getElementToClick(elementsToClick) {
    let randomElementIndex = getRandomInt(0, elementsToClick.length - 1);
    let randomElement = elementsToClick[randomElementIndex];
    console.info(randomElement);
    return { randomElement, randomElementIndex };
  }

  const runTest = useCallback(() => {
    const elementsToClick = document.querySelectorAll(
      'input[type="checkbox"], input[type="radio"]:not([checked])'
    );
    if (isPlaying) {
      const { randomElement, randomElementIndex } = getElementToClick(
        elementsToClick
      );
      randomElement.parentNode.style["background-color"] = "#000000";
      randomElement.parentNode.style["border"] = "1px dashed red";
      console.info("Random input: ", randomElement.parentNode);
      if (elementsToClick && randomElementIndex > -1) {
        timeoutHandle = setTimeout(() => {
          randomElement.parentNode.style["background-color"] = "initial";
          randomElement.parentNode.style["border"] = "initial";
          elementsToClick[randomElementIndex].click();
        }, interval);
      }
    } else {
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
        timeoutHandle = null;
        setChanges(originalChanges);
        elementsToClick.forEach(randomInput => {
          randomInput.parentNode.style["background-color"] = "initial";
          randomInput.parentNode.style["border"] = "initial";
        });
      }
    }
  }, [interval, isPlaying, originalChanges]);

  useEffect(() => {
    runTest();
  }, [changes, isPlaying, originalChanges, runTest]);

  return (
    <React.Fragment>
      {!!props.render
        ? props.render({
            anchor: props.anchor,
            categories: props.categories,
            changes,
            onUpdate: handleUpdate
          })
        : null}
      <div className="p-16">
        <hr />
        <p className="pt-8 pb-8">
          Test run simulates click events. Next click is marked with black
          background and red dashed border. By folowing the test you can ensure
          that the category structure above responses to clicks correctly.
        </p>
        <div className="flex items-center">
          <label className="flex items-center mr-12">
            <span className="inline-block mr-4">Interval between clicks:</span>
            <FormControl>
              <Select
                labelId="test-run-interval"
                value={interval}
                autoWidth={true}
                onChange={e => {
                  setIsPlaying(false);
                  setInterval(parseInt(e.target.value));
                  setTimeout(() => {
                    setIsPlaying(true);
                  });
                }}>
                {intervalOptions.map(_interval => {
                  return (
                    <MenuItem key={_interval} value={_interval}>
                      {_interval / 1000} s
                    </MenuItem>
                  );
                })}
                {originalInterval && (
                  <MenuItem value={originalInterval}>
                    User defined = {originalInterval / 1000} s
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </label>
          <Button
            variant="contained"
            color="primary"
            // disabled={!isPlaying && !isNaN(timeoutHandle)}
            onClick={() => {
              setIsPlaying(prevState => !prevState);
            }}>
            {isPlaying ? "Stop test run" : "Start test run"}
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
}

Stage2.propTypes = {};

export default Stage2;
