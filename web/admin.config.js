module.exports = {
  globals: {
    path: '/content/admin/root',
  },
  urls: {
    protected: ['content/admin/(?!(login|register|forgotpassword)$).*$'],
  },
  apis: {
    userInfo: '/api/v1/admin/user/info',
    userRoles: '/api/v1/admin/role',
    searchRole: '/api/v1/admin/role/search',
    roleMapping: '/api/v1/admin/role/mapping',
    getUsers: '/api/v1/admin/users/all',
    searchUsers: '/api/v1/admin/users/search',
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
    usersList: '/content/admin/portal/users',
    createNewUser: '/content/admin/portal/users/create',
    editUser: '/content/admin/portal/users/edit',
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
