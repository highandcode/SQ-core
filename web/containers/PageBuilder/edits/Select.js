import { GLOBAL_OPTIONS } from '../../../globals';
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
              {
                type: 'fieldName',
              },
            ],
          },
          {
            name: 'label',
            cmpType: 'InputField',
            label: 'Label',
          },
          {
            name: 'className',
            cmpType: 'InputField',
            label: 'className',
          },
          {
            name: 'inputVariant',
            cmpType: 'Radio',
            label: 'Input Variant',
            options: GLOBAL_OPTIONS.inputVariant.toArray(),
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
          label: '.main.label',
          inputVariant: '.main.inputVariant',
        },
      },
    ],
  },
};
