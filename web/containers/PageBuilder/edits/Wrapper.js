export default {

  pageData: {
    items: [
      {
        component: 'Form',
        name: 'main',
        fields: [
          {
            name: 'className',
            cmpType: 'InputField',
            label: 'className',
          },
          {
            name: 'bodyClassName',
            cmpType: 'InputField',
            label: 'bodyClassName',
          },
        ],
      },
      {
        component: 'Button',
        actionType: 'submit-event',
        buttonText: 'Save',
        params: {
          className: '.main.className',
          bodyClassName: '.main.bodyClassName',
        },
      },
    ],
  },
};
