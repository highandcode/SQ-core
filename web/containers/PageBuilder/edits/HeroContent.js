export default {
  
  pageData: {
    items: [
      {
        component: 'Form',
        name: 'main',
        fields: [
          {
            name: 'header',
            cmpType: 'InputField',
            label: 'Header',
          },
          {
            name: 'subHeader',
            cmpType: 'InputField',
            label: 'Sub Header',
          },
        ],
      },
      {
        component: 'Button',
        actionType: 'submit-event',
        buttonText: 'Save',
        params: {
          header: '.main.header',
          subHeader: '.main.subHeader',
        },
      },
    ],
  },
};
