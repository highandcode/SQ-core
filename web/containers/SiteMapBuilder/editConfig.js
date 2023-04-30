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
const createTabItems = (data, key, extraMatch = {}) => {
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
          ...extraMatch,
        },
      }))
    : [];
};
export default ({ themes } = {}) => ({
  pageData: {
    init: {
      editTab: tabs.general.value,
      advanceParams: 'N',
    },
    params: {
      '...main': '.main',
    },
    items: [
      {
        component: 'Wrapper',
        bodyClassName: 'd-flex j-content-fl-end',
        items: [
          {
            component: 'Switch',
            name: 'advanceParams',
            label: 'Advanced',
            selectedValue: 'Y',
            defaultValue: 'N',
          },
        ],
      },
      {
        component: 'FormObject',
        name: 'main',
        match: {
          advanceParams: {
            validators: [
              {
                type: 'equals',
                matchValue: 'Y',
              },
            ],
          },
        },
      },
      {
        component: 'Form',
        name: 'main',
        fields: [
          {
            name: 'editTab',
            cmpType: 'Tabs',
            options: [tabs.general],
            match: {
              advanceParams: {
                validators: [
                  {
                    type: 'equals',
                    matchValue: 'N',
                  },
                ],
              },
            },
          },
          ...createTabItems(
            [
              {
                name: 'analytics',
                label: 'analytics',
                cmpType: 'FormObject',
              },
              {
                name: 'theme',
                label: 'theme',
                cmpType: 'Autocomplete',
                options: themes,
              },
              {
                name: 'appVersion',
                label: 'appVersion',
                cmpType: 'Input',
              },
              {
                name: 'launchConfig',
                label: 'launchConfig',
                cmpType: 'FormObject',
              },
              {
                name: 'siteMap',
                cmpType: 'Form',
                fields: [
                  {
                    name: 'maxNavigationLevel',
                    label: 'maxNavigationLevel',
                  },
                  {
                    name: 'title',
                    label: 'title',
                  },
                  {
                    name: 'errorRedirects',
                    cmpType: 'FormObject',
                    label: 'errorRedirects',
                  },
                  {
                    name: 'defaultRedirect',
                    cmpType: 'FormObject',
                    label: 'defaultRedirect',
                  },
                  {
                    name: 'globalNavigation',
                    cmpType: 'FormObject',
                    label: 'globalNavigation',
                  },
                  {
                    name: 'globalNavigationLoggedIn',
                    cmpType: 'FormObject',
                    label: 'globalNavigationLoggedIn',
                  },
                  {
                    name: 'logo',
                    cmpType: 'FormObject',
                    label: 'logo',
                  },
                  {
                    name: 'globalFooter',
                    cmpType: 'FormObject',
                    label: 'globalFooter',
                  },

                  {
                    name: 'children',
                    label: 'children',
                    cmpType: 'FormObject',
                    label: 'children',
                  },
                ],
              },
            ],
            tabs.general.value,
            {
              advanceParams: {
                validators: [
                  {
                    type: 'equals',
                    matchValue: 'N',
                  },
                ],
              },
            }
          ),
        ],
      },
    ],
  },
});
