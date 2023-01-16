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
        },
      },
    ],
  },
  general: [
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
});
