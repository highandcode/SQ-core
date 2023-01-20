import { GLOBAL_OPTIONS } from '../../../globals';
import { getValidators } from '../../../utils/validator';
const tabs = {
  general: {
    text: 'General',
    value: 'general',
  },
  validations: {
    text: 'Validations',
    value: 'validations',
  },
  actions: {
    text: 'Actions',
    value: 'actions',
  },
  match: {
    text: 'Match',
    value: 'match',
  },
};

const defaultGeneral = ({ classNames = [] } = {}) => [
  {
    name: 'name',
    cmpType: 'Input',
    label: 'Field Name',
    validators: [
      {
        type: 'required',
      },
      {
        type: 'fieldName',
      },
    ],
  },
  {
    name: 'className',
    cmpType: 'InputWithOptions',
    optionsLabel: 'Pre-defined Classes',
    optionCmpType: 'Autocomplete',
    label: 'className',
    options: [...GLOBAL_OPTIONS.genericStyles.toArray(), ...classNames],
  },
];

const defaultValidations = [
  {
    name: 'validators',
    cmpType: 'FormList',
    label: 'Validators',
    formClassName: 'sq-form--2-cols mb-wide',
    fields: [
      {
        cmpType: 'Select',
        label: 'Type',
        name: 'type',
        options: () =>
          _.sortBy(
            Object.keys(getValidators()).map((item) => ({
              text: item,
              value: item,
            })),
            'text'
          ),
      },
      {
        cmpType: 'Input',
        label: 'Error Message',
        name: 'message',
      },
      {
        cmpType: 'Input',
        label: 'Error Key',
        name: 'key',
      },
    ],
  },
];

const defaultMatch = [
  {
    name: 'match',
    cmpType: 'FormObject',
    label: 'match',
    formClassName: 'sq-form--2-cols mb-wide',
    fields: [
      {
        cmpType: 'Input',
        label: 'Field Name',
        name: 'key',
      },
      {
        name: 'value',
        cmpType: 'FormList',
        label: 'Value',
        formClassName: 'sq-form--2-cols mb-wide',
        fields: [
          {
            cmpType: 'Select',
            label: 'Type',
            name: 'type',
            options: () =>
              _.sortBy(
                Object.keys(getValidators()).map((item) => ({
                  text: item,
                  value: item,
                })),
                'text'
              ),
          },
          {
            cmpType: 'Input',
            label: 'Error Message',
            name: 'message',
          },
          {
            cmpType: 'Input',
            label: 'Error Key',
            name: 'key',
          },
        ],
      },
    ],
  },
];

export const withEditTabs = ({
  classNames = [],
  pageData = {},
  general = [],
  validations = [],
  enableValidations = true,
  actions = [],
}) => {
  const finalGeneral = [...defaultGeneral({ classNames }), ...general];
  const finalValidations = enableValidations
    ? [...defaultValidations, ...validations]
    : validations;
  const isGeneralTab = finalGeneral && finalGeneral.length !== 0;
  const isValidationsTab = finalValidations && finalValidations.length !== 0;
  const isActionsTab = actions && actions.length !== 0;

  let firstSelectedTab = '';
  if (isGeneralTab) {
    firstSelectedTab = tabs.general.value;
  } else if (isValidationsTab) {
    firstSelectedTab = tabs.validations.value;
  } else if (isActionsTab) {
    firstSelectedTab = tabs.actions.value;
  }

  const createTabItems = (data, key) => {
    return data && key && data.length !== 0
      ? data.map((item = {}) => ({
          ...item,
          match: {
            ...item.match,
            editTab: {
              validators: [
                {
                  type: 'equals',
                  matchValue: key,
                },
              ],
            },
          },
        }))
      : [];
  };

  return {
    pageData: {
      ...pageData,
      init: {
        ...pageData.init,
        main: {
          editTab: firstSelectedTab,
        },
      },
      items: [
        {
          component: 'Form',
          name: 'main',
          fields: [
            {
              name: 'editTab',
              cmpType: 'Tabs',
              options: [
                ...(isGeneralTab ? [tabs.general] : []),
                ...(isValidationsTab ? [tabs.validations] : []),
                ...(isActionsTab ? [tabs.actions] : []),
                tabs.match,
              ],
            },
            ...createTabItems(finalGeneral, tabs.general.value),
            ...createTabItems(finalValidations, tabs.validations.value),
            ...createTabItems(actions, tabs.actions.value),
            ...createTabItems(defaultMatch, tabs.match.value),
          ],
        },
        ...(pageData.items ? pageData.items : []),
      ],
    },
  };
};
