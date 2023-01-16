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
          validators: '.main.validators',
        },
      },
    ],
  },
  general: [
    {
      name: 'name',
      cmpType: 'Input',
      label: 'Name',
      validators: [
        {
          type: 'required',
        },
      ],
    },
    {
      name: 'label',
      cmpType: 'Input',
      label: 'Label',
    },
    {
      name: 'className',
      cmpType: 'Input',
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
