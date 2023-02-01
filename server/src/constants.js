const GlobalOptions = require('./utils/global-options');
module.exports = {
  contentType: new GlobalOptions({
    PAGE: 'PAGE',
    SITE_MAP: 'SITE_MAP',
  }),
  contentStatus: new GlobalOptions({
    DRAFT: 'DRAFT',
    PUBLISHED: 'PUBLISHED',
  }),
};
