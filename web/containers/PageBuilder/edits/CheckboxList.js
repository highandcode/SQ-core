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
              name: 'options',
              cmpType: 'FormList',
              label: 'Options',
              formClassName: 'sq-form--2-cols mb-wide',
              fields: [
                {
                  cmpType: 'Input',
                  label: 'Key',
                  name: 'value',
                },
                {
                  cmpType: 'Input',
                  label: 'Value',
                  name: 'text',
                },
              ],
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
            options: '.main.options',
            label: '.main.label',
          },
        },
      ],
    },
  };
  