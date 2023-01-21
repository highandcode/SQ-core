import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabsConfig } from './Common';

export default withEditTabsConfig(({ defaultParams }) => ({
  enableValidations: false,
  classNames: GLOBAL_OPTIONS.headerStyles.toArray(),
  pageData: {
    items: [
      {
        component: 'Button',
        actionType: 'submit-event',
        buttonText: 'Save',
        params: {
          ...defaultParams,
          headerTag: '.main.headerTag',
          subHeader: '.main.subHeader',
        },
      },
    ],
  },
  general: [
    {
      name: 'header',
      cmpType: 'InputField',
      label: 'Header',
    },
    {
      name: 'headerTag',
      cmpType: 'Select',
      label: 'Header Tag',
      options: GLOBAL_OPTIONS.headerTags.toArray(),
    },
    {
      name: 'subHeader',
      cmpType: 'InputField',
      label: 'Sub Header',
    },
  ],
}));
