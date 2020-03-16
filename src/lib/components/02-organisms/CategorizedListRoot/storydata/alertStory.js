import { isInLupa, isAdded, isRemoved } from "../../../../css/label";

const labelStyles = {
  addition: isAdded,
  removal: isRemoved
};

export const alertStory = {
  changes: [
    {
      anchor: "alert.A.A",
      properties: {
        isChecked: true
      }
    }
  ],
  categories: [
    {
      anchor: "A",
      code: "0",
      title: "Categories",
      components: [
        {
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            name: "example-checkbox-1",
            code: "A.A",
            title: "Row item",
            labelStyles: Object.assign({}, labelStyles, {
              custom: isInLupa
            }),
            isChecked: false
          }
        },
        {}
      ],
      categories: [
        {
          anchor: "B",
          title: "Categories",
          components: [
            {
              anchor: "B",
              name: "Alert",
              properties: {
                title: "This is a test"
              }
            }
          ]
        },
        {
          anchor: "C",
          title: "Categories",
          components: [
            {
              anchor: "B",
              name: "Alert",
              properties: {
                title: "This is a test",
                message: "Testing alert...",
                type: "warning"
              }
            }
          ]
        }
      ]
    }
  ]
};
