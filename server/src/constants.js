const { GlobalOptions } = require('./utils/global-options');
module.exports = {
  contentType: new GlobalOptions({
    PAGE: 'Page',
    SITE_MAP: 'Site Map',
  }),
  contentStatus: new GlobalOptions({
    DRAFT: 'Draft',
    PUBLISHED: 'Published',
  }),
};
