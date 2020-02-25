import { isInLupa, isAdded, isRemoved } from "../../../../css/label";
import * as R from "ramda";
var labelStyles = {
  addition: isAdded,
  removal: isRemoved
};
export var longAndPlainStory = {
  changes: [],
  categories: [{
    anchor: "A",
    code: "0",
    title: "Categories",
    categories: R.addIndex(R.map)(function (item, index) {
      return {
        anchor: index,
        components: [{
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            name: "example-radio-".concat(index),
            code: "A.".concat(index, ".A"),
            title: "Row item",
            labelStyles: Object.assign({}, labelStyles, {
              custom: isInLupa
            }),
            isChecked: false
          }
        }]
      };
    }, new Array(20))
  }, {
    anchor: "B",
    code: "1",
    title: "Categories",
    categories: R.addIndex(R.map)(function (item, index) {
      return {
        anchor: index,
        components: [{
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            name: "example-radio-".concat(index),
            code: "B.".concat(index, ".A"),
            title: "Row item",
            labelStyles: Object.assign({}, labelStyles, {
              custom: isInLupa
            }),
            isChecked: false
          }
        }]
      };
    }, new Array(20))
  }, {
    anchor: "C",
    code: "2",
    title: "Categories",
    categories: R.addIndex(R.map)(function (item, index) {
      return {
        anchor: index,
        components: [{
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            name: "example-radio-".concat(index),
            code: "C.".concat(index, ".A"),
            title: "Row item",
            labelStyles: Object.assign({}, labelStyles, {
              custom: isInLupa
            }),
            isChecked: false
          }
        }]
      };
    }, new Array(20))
  }]
};