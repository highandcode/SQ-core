import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabsConfig } from './Common';

export default withEditTabsConfig(({ defaultParams, iconList, iconColorTypes }) => ({
  enableValidations: false,
  pageData: {
    items: [],
  },
  general: [
    {
      name: 'icon',
      cmpType: 'Autocomplete',
      label: 'icon',
      options: iconList,
    },
    {
      name: 'eyebrow',
      label: 'eyebrow',
    },
    {
      name: 'header',
      label: 'header',
    },
    {
      name: 'subHeader',
      label: 'subHeader',
    },
    {
      name: 'items',
      label: 'items',
      cmpType: 'FormList',
      fields: [
        {
          name: 'header',
          label: 'header',
        },
        {
          name: 'price',
          label: 'price',
        },
        {
          cmpType: 'Autocomplete',
          name: 'icon',
          label: 'icon',
          options: iconList,
        },
        {
          cmpType: 'Input',
          name: 'iconVariant',
          label: 'iconVariant',
        },
        {
          name: 'features',
          cmpType: 'FormObject',
        },
      ],
    },
  ],
}));
