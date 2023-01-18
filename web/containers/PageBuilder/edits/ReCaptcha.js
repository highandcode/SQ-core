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
          sitekey: '.main.sitekey',
          validators: '.main.validators',
        },
      },
    ],
  },
  general: [
    {
      name: 'sitekey',
      cmpType: 'InputField',
      label: 'sitekey',
    },
  ],
});
