import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabsConfig } from './Common';

export default withEditTabsConfig(({ defaultParams = {} }) => ({
  enableValidations: false,
  pageData: {
    items: [
      {
        component: 'Button',
        actionType: 'submit-event',
        buttonText: 'Save',
        params: {
          ...defaultParams,
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
}));
