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
            label: 'Name',
            validators: [
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
            name: 'sitekey',
            cmpType: 'InputField',
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
