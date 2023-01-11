export default {
  
  pageData: {
    items: [
      {
        component: 'Form',
        name: 'main',
        fields: [
          {
            name: 'name',
            cmpType: 'InputField',
            label: 'Field Name',
            validations: [
              {
                type: 'required',
              },
            ],
          },
          {
            name: 'className',
            cmpType: 'InputField',
            label: 'className',
          },
          {
            name: 'label',
            cmpType: 'InputField',
            label: 'Label',
          },
          {
            name: 'text',
            cmpType: 'InputField',
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
