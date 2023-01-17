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
          header: '.main.header',
          className: '.main.className',
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
      name: 'className',
      cmpType: 'InputWithOptions',
      label: 'className',
      options: GLOBAL_OPTIONS.headerStyles.toArray(),
    },
    {
      name: 'subHeader',
      cmpType: 'InputField',
      label: 'Sub Header',
    },
  ],
});
