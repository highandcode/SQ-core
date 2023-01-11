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
            label: 'Field Name',
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
            name: 'className',
            cmpType: 'InputWithOptions',
            label: 'className',
            options: GLOBAL_OPTIONS.formStyles.toArray(),
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
        },
      },
    ],
  },
};
