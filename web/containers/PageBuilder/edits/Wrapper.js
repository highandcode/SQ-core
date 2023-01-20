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
          className: '.main.className',
          bodyClassName: '.main.bodyClassName',
        },
      },
    ],
  },
  general: [
    {
      name: 'bodyClassName',
      cmpType: 'Input',
      label: 'bodyClassName',
    },
  ],
});
