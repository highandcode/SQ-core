import { GLOBAL_OPTIONS } from '../../../globals';

export default {
  pageData: {
    items: [
      {
        component: 'Form',
        name: 'main',
        fields: [
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
      },
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
};
