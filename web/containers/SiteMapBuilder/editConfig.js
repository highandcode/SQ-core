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
export default {
  pageData: {
    init: {
      editTab: tabs.general.value,
    },
    items: [
      {
        name: 'autoSave',
        component: 'Input',
        label: 'Autosave'
      },
      {
        component: 'Wrapper',
        bodyClassName: 'text-right',
        items: [
          {
            component: 'Button',
            actionType: 'submit-event',
            buttonText: 'Save',
            variant: 'outlined',
            size: 'large',
            params: {
              '...main': '.main',
            },
          },
        ],
      },
      {
        component: 'Form',
        name: 'main',
        fields: [
          {
            name: 'editTab',
            cmpType: 'Tabs',
            options: [tabs.general],
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
                options: [{ text: 'basic', value: 'basic' }],
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
                    cmpType: 'FormList',
                    label: 'children',
                    fields: [
                      {
                        cmpType: 'Input',
                        label: 'Title',
                        name: 'title',
                      },
                      {
                        cmpType: 'Input',
                        label: 'href',
                        name: 'href',
                      },
                      {
                        name: 'children',
                        label: 'children',
                        cmpType: 'FormList',
                        label: 'children',
                        fields: [
                          {
                            cmpType: 'Input',
                            label: 'Title',
                            name: 'title',
                          },
                          {
                            cmpType: 'Input',
                            label: 'href',
                            name: 'href',
                          },
                          {
                            name: 'children',
                            label: 'children',
                            cmpType: 'FormList',
                            label: 'children',
                            fields: [
                              {
                                cmpType: 'Input',
                                label: 'Title',
                                name: 'title',
                              },
                              {
                                cmpType: 'Input',
                                label: 'href',
                                name: 'href',
                              },
                              {
                                name: 'children',
                                label: 'children',
                                cmpType: 'FormList',
                                label: 'children',
                                fields: [
                                  {
                                    cmpType: 'Input',
                                    label: 'Title',
                                    name: 'title',
                                  },
                                  {
                                    cmpType: 'Input',
                                    label: 'href',
                                    name: 'href',
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
            tabs.general.value
          ),
        ],
      },
    ],
  },
};
