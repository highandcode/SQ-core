import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabs } from './Common';

export default withEditTabs({
  enableValidations:false,
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
      name: 'className',
      cmpType: 'InputWithOptions',
      label: 'className',
      options: GLOBAL_OPTIONS.formStyles.toArray(),
    },
  ],
});
