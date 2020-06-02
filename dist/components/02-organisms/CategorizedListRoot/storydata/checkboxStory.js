import { isInLupa, isAdded, isRemoved } from "../../../../css/label";
var labelStyles = {
  addition: isAdded,
  removal: isRemoved
};
export var checkboxStory = {
  changes: [],
  categories: [{
    anchor: "A",
    code: "1",
    title: "Category",
    components: [{
      anchor: "A",
      name: "CheckboxWithLabel",
      properties: {
        code: "A.A",
        isChecked: true,
        isIndeterminate: false,
        labelStyles: Object.assign({}, labelStyles, {
          custom: isInLupa
        }),
        name: "example-checkbox-1",
        title: "Row item"
      }
    }],
    categories: [{
      anchor: "A",
      code: "1",
      title: "Category",
      components: [{
        anchor: "A",
        name: "CheckboxWithLabel",
        properties: {
          code: "A.A.A",
          isChecked: true,
          labelStyles: Object.assign({}, labelStyles, {
            custom: isInLupa
          }),
          name: "example-checkbox-1-1",
          title: "Row item"
        }
      }]
    }]
  }]
};