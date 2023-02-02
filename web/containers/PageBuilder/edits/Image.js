import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabsConfig } from './Common';

export default withEditTabsConfig(({ defaultParams }) => ({
  enableValidations: false,
  pageData: {
    items: [],
  },
  general: [
    {
      name: 'imageUrl',
      cmpType: 'InputField',
      label: 'imageUrl',
    },
    {
      name: 'size',
      cmpType: 'InputField',
      label: 'size',
    },
  ],
}));
