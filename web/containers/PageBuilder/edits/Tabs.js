import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabs } from './Common';
export default withEditTabs({
  enableValidations: false,
  pageData: {
    items: [
      {
        component: 'Button',
        actionType: 'submit-event',
        buttonText: 'Save',
        params: {
          name: '.main.name',
          textField: '.main.textField',
          valueField: '.main.valueField',
          className: '.main.className',
          options: '.main.options',
        },
      },
    ],
  },
  general: [
    {
      name: 'textField',
      cmpType: 'Input',
      label: 'textField',
    },
    {
      name: 'valueField',
      cmpType: 'Input',
      label: 'valueField',
    },
    {
      name: 'options',
      cmpType: 'FormList',
      label: 'Options',
      formClassName: 'sq-form--2-cols',
      fields: [
        {
          cmpType: 'Input',
          label: 'Value',
          name: 'value',
        },
        {
          cmpType: 'Input',
          label: 'Text',
          name: 'text',
        },
      ],
    },
  ],
});
