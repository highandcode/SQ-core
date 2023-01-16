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
            label: 'Name',
            validators: [
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
            name: 'sitekey',
            cmpType: 'Input',
            label: 'sitekey',
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
          sitekey: '.main.sitekey',
        },
      },
    ],
  },
};
