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
};

export const withEditTabs = ({
  pageData = {},
  general = [],
  validations = [],
  actions = [],
}) => {
  const isGeneralTab = general && general.length !== 0;
  const isValidationsTab = validations && validations.length !== 0;
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
              ],
            },
            ...createTabItems(general, tabs.general.value),
            ...createTabItems(validations, tabs.validations.value),
            ...createTabItems(actions, tabs.actions.value),
          ],
        },
        ...(pageData.items ? pageData.items : []),
      ],
    },
  };
};
