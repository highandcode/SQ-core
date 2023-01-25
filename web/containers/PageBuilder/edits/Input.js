import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabs } from './Common';

export default withEditTabs({
  pageData: {
    items: [
      
    ],
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
  ],
});
