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
          text: '.main.text',
          label: '.main.label',
          validators: '.main.validators',
        },
      },
    ],
  },
  general: [
    {
      name: 'className',
      cmpType: 'Input',
      label: 'className',
    },
    {
      name: 'label',
      cmpType: 'Input',
      label: 'Label',
    },
    {
      name: 'text',
      cmpType: 'Input',
      label: 'Text',
    },
  ],
});
