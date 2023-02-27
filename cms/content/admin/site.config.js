var packageJson = require('../../../package.json');

module.exports = {
  theme: 'basic',
  analytics: {
    gaTrackingId: 'est',
  },
  siteMap: {
    maxNavigationLevel: 2,
    appVersion: packageJson.version,
    title: 'QubeJS: Admin Panel',

    errorRedirects: {
      500: '/content/pages/error',
      404: '/content/pages/404',
      launchSoon: '/content/pages/wait',
      launchEnded: '/content/pages/ended',
      '/content/admin/*': {
        500: '/content/admin/common/error',
        404: '/content/admin/common/404',
      },
    },
    globalNavigation: {
      className: 'sq-global-navigation--bordered daneil-navigation--site',
      navPosition: 'fixed',
      classes: {
        wrapper: 'container',
      },
      navigation: [],
      mobileItems: [],
      rightItems: [],
    },
    globalNavigationLoggedIn: {
      className: 'sq-global-navigation--bordered daneil-navigation--site',
      navPosition: 'fixed',
      navigation: [
        {
          title: 'Dashboard',
          iconName: 'dashboard',
          href: '/content/admin/portal/dashboard',
          header: 'Dashboard Module',
          children: [],
        },
        {
          title: 'Pages',
          iconName: 'Pages',
          href: '/content/admin/portal/pages',
          header: 'Content Pages',
          children: [
            {
              title: 'Create new',
              // key: 'serviceRequestSubMenu',
              iconName: 'AddBox',
              href: '/content/admin/portal/pages/create',
              children: [],
            },
            {
              title: 'Edit page',
              // key: 'serviceRequestSubMenu',
              hideInMenu: true,
              href: '/content/admin/portal/pages/edit',
              children: [],
            },
            {
              title: 'Edit SiteMap',
              // key: 'serviceRequestSubMenu',
              hideInMenu: true,
              href: '/content/admin/portal/pages/editmap',
              children: [],
            },
          ],
        },
        {
          title: 'Users',
          iconName: 'people',
          href: '/content/admin/portal/users',
          header: 'User Module',
          children: [
            {
              title: 'Create new',
              // key: 'serviceRequestSubMenu',
              iconName: 'AddBox',
              href: '/content/admin/portal/users/new',
              children: [],
            },
          ],
        },
      ],
      mobileItems: [],
      rightItems: [],
    },
    globalFooter: {
      classes: {
        item: 'col-xs-12 col-sm-6',
      },
      className: 'sq-footer--light',
      copyrights: '© QUbeJS, All Rights Reserved',
    },
    logo: {
      text: '',
      imgAlt: 'logo image',
      // name: 'logo',
      mobileName: 'logo-wide',
      topName: 'logo-wide',
      size: 'dan-wide',
      className: '',
      variant: 'primary',
      href: 'home',
    },
    children: [
      {
        title: 'Docs',
        href: '/content/admin/knowledge-base',
      },
      {
        title: 'Documents',
        href: '/content/admin/documents',
      },
      {
        title: 'Service Requests',
        href: '/content/admin/tickets',
      },
    ],
  },
};
