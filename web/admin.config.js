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
    getPageByPath: '/api/v1/admin/content/page/getbypath',
    getContentTree: '/api/v1/admin/content/page/gettree',
    contentPage: '/api/v1/admin/content/page',
  },
  urlMapping: {
    login: '/content/admin/login',
    register: '/content/admin/register',
    adminDashboard: '/content/admin/portal/dashboard',
    editPage: '/content/admin/portal/pages/edit',
    previewDraftPage: '/content/admin/portal/pages/previewdraft',
    '/content/(.*)': {
      type: 'regex',
      target: '/content/$1',
    },
  },
};
