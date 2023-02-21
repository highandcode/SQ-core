module.exports = ({ formData = {}, ...config } = {}) => ({
  pageData: {
    init: {
      formData: {
        to: '/content/',
        ...formData,
        ...config.init
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
            name: 'to',
            label: 'Target path',
            validators: [
              {
                type: 'required',
                defaultValue: '/content/',
                ...config.targetPath?.required
              },
              {
                type: 'path',
              },
              {
                type: 'startsWith',
                startsWith: '/content/',
                ...config.targetPath?.starts
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
          to: '.formData.to',
          type: '.formData.type',
        }
      },
    ],
  },
});
