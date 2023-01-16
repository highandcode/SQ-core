import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabs } from './Common';
export default withEditTabs({
  pageData: {
    items: [
      {
        component: 'Button',
        actionType: 'submit-event',
        buttonText: 'Save',
        params: {
          name: '.main.name',
          className: '.main.className',
          label: '.main.label',
          inputVariant: '.main.inputVariant',
          options: '.main.options',
        },
      },
    ],
  },
  general: [
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
});
