import { isInLupa, isAdded, isRemoved } from "../../../../css/label";
var labelStyles = {
  addition: isAdded,
  removal: isRemoved
};
export var alertStory = {
  changes: [{
    anchor: "A.A",
    properties: {
      isChecked: true
    }
  }],
  categories: [{
    anchor: "A",
    code: "0",
    title: "Categories",
    components: [{
      anchor: "A",
      name: "CheckboxWithLabel",
      properties: {
        name: "example-checkbox-1",
        code: "A.A",
        title: "Row item",
        labelStyles: Object.assign({}, labelStyles, {
          custom: isInLupa
        }),
        isChecked: true
      }
    }, {}],
    categories: [{
      anchor: "B",
      components: [{
        anchor: "B",
        name: "Alert",
        properties: {
          title: "This is a test.",
          linkText: "Link",
          linkUrl: "#alert.A"
        }
      }]
    }, {
      anchor: "C",
      components: [{
        anchor: "B",
        name: "Alert",
        properties: {
          title: "This is a test!",
          type: "warning",
          linkText: "Link as func",
          handleLinkClick: function handleLinkClick() {
            var a = document.createElement("a");
            a.href = "#alert.A";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        }
      }]
    }]
  }]
};