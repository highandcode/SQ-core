export default {

  pageData: {
    items: [
      {
        component: 'Form',
        name: 'main',
        fields: [
          {
            name: 'className',
            cmpType: 'Input',
            label: 'className',
          },
          {
            name: 'bodyClassName',
            cmpType: 'Input',
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
