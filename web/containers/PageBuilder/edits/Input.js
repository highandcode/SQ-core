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
          variant: '.main.variant',
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
});
