module.exports = ({ formData = {}, ...config } = {}) => ({
  pageData: {
    init: {
      formData: {
        targetPath: '/content/',
        ...formData,
      },
    },
    items: [
      {
        component: 'Form',
        name: 'formData',
        fields: [
          {
            cmpType: 'DataField',
            name: 'path',
            label: 'Clone From',
          },
          {
            cmpType: 'Input',
            name: 'targetPath',
            label: 'Target path',
            validators: [
              {
                type: 'required',
                defaultValue: '/content/',
              },
              {
                type: 'path',
              },
              {
                type: 'startsWith',
                startsWith: '/content/',
              },
            ],
          },
        ],
      },
      {
        component: 'Button',
        actionType: 'submit-event',
        buttonText: 'Clone',
        params: {
          '...': '.formData',
          from: '.formData.path',
          to: '.formData.targetPath',
          type: '.formData.type',
        }
      },
    ],
  },
});
