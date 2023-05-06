import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabsConfig } from './Common';

export default withEditTabsConfig(({ defaultParams }) => ({
  classNames: GLOBAL_OPTIONS.imageStyles.toArray(),
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
    {
      name: 'style',
      cmpType: 'FormObject',
      label: 'style',
    },
  ],
}));
