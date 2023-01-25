import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabs } from './Common';

export default withEditTabs({
  enableValidations: false,
  enableActions: true,
  saveParams: {},
  pageData: {
    items: [],
  },
  general: [
    {
      name: 'buttonText',
      cmpType: 'Input',
      label: 'buttonText',
    },
    {
      name: 'className',
      cmpType: 'InputWithOptions',
      label: 'className',
      options: GLOBAL_OPTIONS.formStyles.toArray(),
    },
    {
      name: 'size',
      cmpType: 'Select',
      label: 'size',
      options: GLOBAL_OPTIONS.buttonSize.toArray(),
    },
    {
      name: 'actionType',
      cmpType: 'Select',
      label: 'Action Type',
      options: GLOBAL_OPTIONS.actionTypes.toArray(),
    },
    {
      name: 'url',
      cmpType: 'Input',
      label: 'url',
    },
    {
      name: 'method',
      cmpType: 'Radio',
      display: 'Inline',
      options: GLOBAL_OPTIONS.methodTypes.toArray(),
      label: 'method',
    },
    {
      name: 'variant',
      cmpType: 'Autocomplete',
      options: GLOBAL_OPTIONS.variants.toArray(),
      label: 'variant',
    },
    {
      name: 'params',
      cmpType: 'FormObject',
      output: 'object',
      label: 'params',
    },
    {
      name: 'postHook',
      cmpType: 'Input',
      label: 'postHook',
    },
  ],
});
