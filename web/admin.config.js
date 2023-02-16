module.exports = {
  globals: {
    path: '/content/admin/root',
  },
  urls: {
    protected: ['content/admin/(?!(login|register|forgotpassword)$).*$'],
  },
  apis: {
    userInfo: '/api/v1/admin/user/info',
    getUsers: '/api/v1/admin/users/all',
    getPage: '/api/v1/admin/content/page/get',
    getFieldsMeta: '/api/v1/admin/content/page/getfieldsmeta',
    getPageByPath: '/api/v1/admin/content/page/getbypath',
    getContentTree: '/api/v1/admin/content/page/gettree',
    contentPage: '/api/v1/admin/content/page',
    clonePage: '/api/v1/admin/content/page/clone',
  },
  urlMapping: {
    login: '/content/admin/login',
    register: '/content/admin/register',
    adminDashboard: '/content/admin/portal/dashboard',
    editPage: '/content/admin/portal/pages/edit',
    editSiteMap: '/content/admin/portal/pages/editmap',
    addNewPage: '/content/admin/portal/pages/create',
    previewDraftPage: '/content/admin/portal/pages/previewdraft',
    '/content/(.*)': {
      type: 'regex',
      target: '/content/$1',
    },
  },
};
