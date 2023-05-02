import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabsConfig } from './Common';

export default withEditTabsConfig(({ defaultParams, iconList }) => ({
  pageData: {
    items: [],
  },
  general: [
    { name: 'header', label: 'Header' },
    { name: 'footerText', cmpType: 'RichText', label: 'Footer Text' },
    {
      name: 'info',
      cmpType: 'FormList',
      label: 'Info',
      fields: [
        {
          name: 'iconName',
          cmpType: 'Autocomplete',
          options: iconList,
          label: 'Icon',
        },
        {
          name: 'text',
          cmpType: 'Input',
          label: 'Text',
        },
        {
          name: 'iconColor',
          cmpType: 'Autocomplete',
          options: GLOBAL_OPTIONS.iconColorTypes.toArray(),
          label: 'iconColor',
        },
        {
          name: 'href',
          label: 'Href',
        },
        {
          name: 'target',
          cmpType: 'CheckboxField',
          selectedValue: '_blank',
          text: 'Open in new window',
        },
      ],
    },
  ],
}));
