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
          text: '.main.text',
          className: '.main.className',
          tag: '.main.tag',
          parentTag: '.main.parentTag',
        },
      },
    ],
  },
  general: [
    {
      name: 'text',
      cmpType: 'Input',
      label: 'text',
    },
    {
      name: 'tag',
      cmpType: 'Select',
      options: GLOBAL_OPTIONS.htmlTags.toArray(),
      label: 'Tag',
    },
    {
      name: 'parentTag',
      cmpType: 'Select',
      options: GLOBAL_OPTIONS.htmlTags.toArray(),
      label: 'Wrapper Tag',
    },
  ],
});
