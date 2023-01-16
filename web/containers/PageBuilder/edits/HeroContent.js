export default {
  
  pageData: {
    items: [
      {
        component: 'Form',
        name: 'main',
        fields: [
          {
            name: 'header',
            cmpType: 'Input',
            label: 'Header',
          },
          {
            name: 'subHeader',
            cmpType: 'Input',
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
