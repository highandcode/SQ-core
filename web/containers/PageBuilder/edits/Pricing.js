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
          name: 'lastPrice',
          label: 'lastPrice',
        },
        {
          name: 'features',
          cmpType: 'FormList',
          fields: [
            {
              cmpType: 'Autocomplete',
              name: 'icon',
              label: 'icon',
              options: iconList,
            },
            {
              cmpType: 'Autocomplete',
              name: 'iconColor',
              label: 'iconColor',
              options: iconColorTypes,
            },
            {
              name: 'text',
              label: 'text',
            },
          ],
        },
      ],
    },
  ],
}));
