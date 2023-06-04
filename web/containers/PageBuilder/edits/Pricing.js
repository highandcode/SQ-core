import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabsConfig } from './Common';

export default withEditTabsConfig(({ defaultParams, iconList, iconColorTypes, colorTypes }) => ({
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
      name: 'template',
      cmpType: 'Autocomplete',
      label: 'template',
      options: GLOBAL_OPTIONS.pricingTemplates.toArray(),
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
      name: 'features',
      label: 'feature',
      cmpType: 'FormObject',
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
          name: 'Autocomplete',
          label: 'color',
          options: colorTypes,
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
          name: 'lastPrice',
          label: 'lastPrice',
        },
        {
          name: 'features',
          cmpType: 'FormObject',
        },
      ],
    },
  ],
}));
