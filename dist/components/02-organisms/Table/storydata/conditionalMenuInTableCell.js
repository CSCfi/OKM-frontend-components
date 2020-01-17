import * as R from "ramda";
var colWidths = {
  0: "w-2/12",
  1: "w-2/12",
  2: "w-2/12",
  3: "w-3/12",
  4: "w-2/12",
  5: "w-1/12"
};

function getRandomNumber() {
  var max = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  return Math.floor(Math.random() * max + 1);
}

export var conditionalMenuInTableCell = [{
  role: "thead",
  rowGroups: [{
    rows: [{
      cells: R.addIndex(R.map)(function (col, ii) {
        return {
          isSortable: true,
          truncate: true,
          styleClasses: [colWidths[ii]],
          text: "(MainTable) ".concat(ii)
        };
      }, [1, 2, 3, 4, 5]).concat({
        text: "Toiminnot",
        styleClasses: [colWidths[5]]
      })
    }]
  }]
}, {
  role: "tbody",
  rowGroups: [{
    rows: R.addIndex(R.map)(function (row, i) {
      var rowObj = {
        id: i,
        // This can be e.g. uuid
        onClick: function onClick(row, action) {
          console.info("The row you just clicked is: ", row, action);
        }
      };
      var cells = R.addIndex(R.map)(function (col, ii) {
        return {
          truncate: true,
          styleClasses: [colWidths[ii]],
          text: "".concat(getRandomNumber(3000), " (", 0).concat(ii, ")")
        };
      }, [1, 2, 3, 4, 5]);

      if (Math.random() > 0.5) {
        cells = R.append({
          menu: {
            id: "simple-menu-".concat(i),
            actions: [{
              id: "start-preparing",
              text: "Ota valmisteluun"
            }, {
              id: "delete",
              text: "Poista"
            }]
          },
          styleClasses: [colWidths[5]]
        }, cells);
      } else {
        cells = R.append({
          styleClasses: [colWidths[5]]
        }, cells);
      }

      return R.assoc("cells", cells, rowObj);
    }, new Array(10))
  }]
}, {
  role: "tfoot"
}];
export default conditionalMenuInTableCell;