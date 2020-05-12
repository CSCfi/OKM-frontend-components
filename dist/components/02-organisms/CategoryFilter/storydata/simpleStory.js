import { isInLupa, isAdded, isRemoved } from "../../../../css/label";
var labelStyles = {
  addition: isAdded,
  removal: isRemoved
};
export var simpleStory = {
  changes: [{
    anchor: "simple-story.A.A",
    properties: {
      isChecked: true,
      isIndeterminate: true
    }
  }, {
    anchor: "simple-story.A.A.A",
    properties: {
      isChecked: true,
      isIndeterminate: false
    }
  }, {
    anchor: "simple-story.A.C.A",
    properties: {
      isChecked: true,
      isIndeterminate: false
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
        code: "A.A",
        isChecked: false,
        labelStyles: Object.assign({}, labelStyles, {
          custom: isInLupa
        }),
        name: "example-checkbox-1",
        title: "Keski-Suomi"
      }
    }],
    categories: [{
      anchor: "A",
      code: "1.1",
      title: "Sub category",
      components: [{
        anchor: "A",
        name: "CheckboxWithLabel",
        properties: {
          code: "A.A.A",
          isChecked: false,
          labelStyles: Object.assign({}, labelStyles, {
            custom: isInLupa
          }),
          name: "example-checkbox",
          title: "Jyväskylä",
          value: "Testi"
        }
      }]
    }, {
      anchor: "B",
      code: "1.2",
      title: "Sub category",
      components: [{
        anchor: "A",
        name: "CheckboxWithLabel",
        properties: {
          code: "A.B.A",
          isChecked: false,
          labelStyles: labelStyles,
          name: "example-checkbox",
          title: "Keuruu",
          value: "Testi2"
        }
      }]
    }, {
      anchor: "C",
      code: "3",
      title: "Sub category",
      components: [{
        anchor: "A",
        name: "CheckboxWithLabel",
        properties: {
          code: "A.C.A",
          isChecked: false,
          labelStyles: Object.assign({}, labelStyles, {
            custom: isInLupa
          }),
          name: "example-checkbox",
          title: "Multia",
          value: "Testi3"
        }
      }]
    }]
  }, {
    anchor: "B",
    code: "2",
    title: "Category",
    components: [{
      anchor: "A",
      name: "CheckboxWithLabel",
      properties: {
        code: "B.A",
        isChecked: true,
        isIndeterminate: true,
        labelStyles: labelStyles,
        name: "example-checkbox-2",
        title: "Pirkanmaa"
      }
    }],
    categories: [{
      anchor: "A",
      code: "2.1",
      title: "Sub category",
      components: [{
        anchor: "A",
        name: "CheckboxWithLabel",
        properties: {
          code: "B.A.A",
          isChecked: false,
          labelStyles: labelStyles,
          name: "example-label",
          title: "Lempäälä",
          value: "lempäälä"
        }
      }]
    }, {
      anchor: "B",
      code: "2.2",
      title: "Sub category",
      components: [{
        anchor: "A",
        name: "CheckboxWithLabel",
        properties: {
          code: "B.B.A",
          isChecked: false,
          isIndeterminate: false,
          labelStyles: labelStyles,
          name: "example-checkbox",
          title: "Tampere",
          value: "tampere"
        }
      }],
      categories: [{
        anchor: "A",
        code: "2.2.1",
        title: "Sub category",
        components: [{
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            code: "B.B.A.A",
            title: "Kaleva",
            isChecked: false,
            labelStyles: labelStyles,
            name: "example-label",
            value: "kaleva"
          }
        }]
      }, {
        anchor: "B",
        code: "2.2.2",
        title: "Sub category",
        components: [{
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            code: "B.B.B.A",
            isChecked: false,
            labelStyles: labelStyles,
            name: "example-checkbox",
            title: "Lielahti",
            value: "lielahti"
          }
        }]
      }, {
        anchor: "C",
        code: "2.2.3",
        title: "Sub category",
        components: [{
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            code: "B.B.C.A",
            isChecked: false,
            labelStyles: labelStyles,
            name: "example-checkbox",
            title: "Linnainmaa",
            value: "linnainmaa"
          }
        }]
      }, {
        anchor: "D",
        code: "2.2.4",
        title: "Sub category",
        components: [{
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            code: "B.B.D.A",
            isChecked: false,
            labelStyles: labelStyles,
            name: "example-checkbox",
            title: "Tammela",
            value: "tammela"
          }
        }]
      }]
    }, {
      anchor: "C",
      code: "2.3",
      title: "Sub category",
      components: [{
        anchor: "A",
        name: "CheckboxWithLabel",
        properties: {
          code: "B.C.A",
          isChecked: false,
          labelStyles: labelStyles,
          name: "example-checkbox",
          title: "Valkeakoski",
          value: "valkeakoski"
        }
      }]
    }],
    changes: []
  }, {
    anchor: "C",
    code: "3",
    title: "Category",
    components: [{
      anchor: "A",
      name: "CheckboxWithLabel",
      properties: {
        code: "C.A",
        isChecked: false,
        labelStyles: Object.assign({}, labelStyles, {
          custom: isInLupa
        }),
        name: "example-checkbox-3",
        title: "Uusimaa"
      }
    }]
  }]
};