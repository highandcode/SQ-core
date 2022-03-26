var path = require('path');
const { chai, mocks } = require('../../../tests/setup');
var expect = chai.expect;
var PageBuilder = require('./page-builder');
var mockSiteConfig = require('../test-data/test.mocksite.config');

describe('CMS::PageBuilder', function () {
  beforeEach(() => {});
  it('should exists', () => {
    expect(PageBuilder).not.to.undefined;
  });
  it('should be able to create new instance', () => {
    let builder = new PageBuilder({
      site: {
        rootApp: path.resolve('cms/server/test-data'),
        srcPath: path.resolve('cms/server'),
        siteConfig: mockSiteConfig,
        mode: 'development',
        pageData: {
          template: 'apps/fake-app/templates/fake-t',
          layout: 'apps/fake-app/layouts/fake-l'
        }
      }
    });
    expect(builder).not.to.undefined;
  });

  describe('PageBuilder with defined custom templates', () => {
    let builder, result;
    beforeEach(async () => {
      builder = new PageBuilder({
        site: {
          rootApp: path.resolve('cms/server/test-data'),
          srcPath: path.resolve('cms/server')
        },
        siteConfig: mockSiteConfig,
        mode: 'development',
        pageData: {
          template: 'apps/fake-app/templates/fake-t',
          layout: 'apps/fake-app/layouts/fake-l',
          blocks: []
        }
      });
      result = await builder.build();
    });

    it('should have proper html', () => {
      expect(result.output).to.equal(`<html> <head></head> <body> <span></span> </body></html>`);
    });
  });

  describe('PageBuilder with defined extraParams, merged', () => {
    let builder, result;
    beforeEach(async () => {
      builder = new PageBuilder({
        site: {
          rootApp: path.resolve('cms/server/test-data'),
          srcPath: path.resolve('cms/server')
        },
        siteConfig: mockSiteConfig,
        mode: 'development',
        pageData: {
          template: 'apps/fake-app/templates/fake-t-extra',
          layout: 'apps/fake-app/layouts/fake-l-extra'
        },
        extraParams: {
          Ice: {
            ok: 'ok'
          }
        },
        merged: {
          merged: {
            params: 'test'
          }
        }
      });
      result = await builder.build();
    });

    it('should have proper html', () => {
      expect(result.output).to.equal(`<html> <head></head> <body> <span>ok:test</span> </body></html>`);
    });
  });

  describe('PageBuilder with not defined should use default template/page', () => {
    let builder, result;
    beforeEach(async () => {
      builder = new PageBuilder({
        site: {
          rootApp: path.resolve('cms/server/test-data'),
          srcPath: path.resolve('cms')
        },
        siteConfig: mockSiteConfig,
        mode: 'development',
        pageData: {
          template: 'apps/core/templates/page2',
          layout: 'apps/core/layouts/default2',
          blocks: []
        },
        currentNode: {
          children: []
        }
      });
      result = await builder.build();
    });

    it('should have default template html html', () => {
      expect(result.output).not.to.equal(`<html> <head></head> <body> <span></span> </body></html>`);
    });
  });
});
