import { GLOBAL_OPTIONS } from '../../../globals';
import { withEditTabs } from './Common';

export default withEditTabs({
  enableValidations: false,
  enableActions: true,
  saveParams: {},
  pageData: {
    merge: {
      liveFields: '.fieldsMeta.liveFields',
    },

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
      match: {
        fieldsMeta: {
          validators: [
            {
              type: 'notExists',
            },
          ],
        },
      },
    },
    {
      name: 'params',
      cmpType: 'FormObject',
      output: 'object',
      label: 'params',
      fields: [
        {
          cmpType: 'Autocomplete',
          name: 'key',
          label: 'Field Name',
          inject: {
            options: 'fieldsMeta.formFields',
          },
          textField: 'name',
          valueField: 'code',
        },
        {
          label: 'Value Field',
          cmpType: 'Input',
          name: 'value',
          match: {
            liveFields: {
              validators: [
                {
                  type: 'notExists',
                },
              ],
            },
          },
        },
        {
          label: 'Value Field',
          cmpType: 'Autocomplete',
          inject: {
            options: 'fieldsMeta.liveFields',
          },
          name: 'value',
          match: {
            liveFields: {
              validators: [
                {
                  type: 'exists',
                },
              ],
            },
          },
        },
      ],
      match: {
        fieldsMeta: {
          validators: [
            {
              type: 'exists',
            },
          ],
        },
      },
    },
    {
      name: 'postHook',
      cmpType: 'Input',
      label: 'postHook',
    },
    {
      name: 'defaultResponse',
      cmpType: 'Form',
      fields: [
        {
          cmpType: 'Form',
          name: 'success',
          label: 'success',
          fields: [
            {
              name: 'data',
              cmpType: 'FormObject',
              label: 'success',
            },
          ],
        },
        {
          cmpType: 'Form',
          nameL: 'success',
          label: 'error',
          fields: [
            {
              name: 'data',
              cmpType: 'FormObject',
              label: 'error',
            },
          ],
        },
      ],
    },
  ],
});
