import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabs } from './Common';

export default withEditTabs({
  pageData: {
    items: [],
  },
  general: [
    {
      name: 'label',
      cmpType: 'Input',
      label: 'Label',
    },
    {
      name: 'className',
      cmpType: 'Input',
      label: 'className',
    },
    {
      name: 'variant',
      cmpType: 'Radio',
      label: 'variant',
      options: GLOBAL_OPTIONS.inputVariant.toArray(),
    },
    {
      name: 'mask',
      cmpType: 'Form',
      fields: [
        {
          cmpType: 'Autocomplete',
          name: 'type',
          label: 'Mask Type',
          options: GLOBAL_OPTIONS.maskTypes.toArray(),
        },
      ],
    },
  ],
});
