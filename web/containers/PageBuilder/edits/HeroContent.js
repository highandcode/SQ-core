import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabsConfig } from './Common';

export default withEditTabsConfig(({ defaultParams, iconList }) => ({
  classNames: GLOBAL_OPTIONS.heroStyles.toArray(),
  enableValidations: false,
  pageData: {
    items: [
      
    ],
  },
  general: [
    {
      name: 'header',
      cmpType: 'InputField',
      label: 'Header',
    },
    {
      name: 'headerTag',
      cmpType: 'Select',
      label: 'Header Tag',
      options: GLOBAL_OPTIONS.headerTags.toArray(),
    },
    {
      name: 'background',
      cmpType: 'Input',
      label: 'background',
    },
    {
      name: 'template',
      cmpType: 'Autocomplete',
      label: 'template',
      options: GLOBAL_OPTIONS.heroTemplates.toArray(),
    },
    {
      name: 'subHeader',
      cmpType: 'RichText',
      label: 'Sub Header',
    },
    {
      name: 'links',
      cmpType: 'FormList',
      label: 'Links',
      formClassName: 'sq-form--2-cols',
      fields: [
        {
          cmpType: 'Input',
          label: 'Button Text',
          name: 'buttonText',
        },
        {
          cmpType: 'Autocomplete',
          label: 'Icon Name',
          name: 'iconName',
          options: iconList,
        },
        {
          cmpType: 'Autocomplete',
          label: 'Type',
          name: 'type',
          options: GLOBAL_OPTIONS.linkTypes.toArray(),
        },
        {
          cmpType: 'Autocomplete',
          label: 'size',
          name: 'size',
          options: GLOBAL_OPTIONS.buttonSize.toArray(),
        },
        {
          cmpType: 'Input',
          label: 'Icon Direction',
          name: 'iconDirection',
        },
        {
          cmpType: 'Input',
          label: 'To Path',
          name: 'to',
        },
      ],
    },
  ],
}));
