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
      label: 'label',
    },
    {
      name: 'inputFormat',
      cmpType: 'Input',
      label: 'inputFormat',
    },
    {
      name: 'outputFormat',
      cmpType: 'Input',
      label: 'outputFormat',
    },
    {
      name: 'mask',
      cmpType: 'Input',
      label: 'mask',
    },
  ],
});
