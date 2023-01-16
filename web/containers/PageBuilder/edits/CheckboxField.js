export default {
  
  pageData: {
    items: [
      {
        component: 'Form',
        name: 'main',
        fields: [
          {
            name: 'name',
            cmpType: 'Input',
            label: 'Field Name',
            validations: [
              {
                type: 'required',
              },
            ],
          },
          {
            name: 'className',
            cmpType: 'Input',
            label: 'className',
          },
          {
            name: 'label',
            cmpType: 'Input',
            label: 'Label',
          },
          {
            name: 'text',
            cmpType: 'Input',
            label: 'Text',
          },
        ],
      },
      {
        component: 'Button',
        actionType: 'submit-event',
        buttonText: 'Save',
        params: {
          name: '.main.name',
          className: '.main.className',
          text: '.main.text',
          label: '.main.label',
        },
      },
    ],
  },
};
