import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabs } from './Common';

export default withEditTabs({
  classNames: GLOBAL_OPTIONS.heroStyles.toArray(),
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
          background: '.main.background',
          headerTag: '.main.headerTag',
          template: '.main.template',
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
      name: 'background',
      cmpType: 'Input',
      label: 'background',
    },
    {
      name: 'template',
      cmpType: 'Autocomplete',
      label: 'template',
      options: GLOBAL_OPTIONS.heroTemplates.toArray(),
    },
    {
      name: 'subHeader',
      cmpType: 'InputField',
      label: 'Sub Header',
    },
  ],
});
