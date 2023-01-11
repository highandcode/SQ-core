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
            name: 'variant',
            cmpType: 'Radio',
            label: 'variant',
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
          variant: '.main.variant',
        },
      },
    ],
  },
};
