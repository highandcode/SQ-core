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
      name: 'label',
      cmpType: 'Input',
      label: 'Label',
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
