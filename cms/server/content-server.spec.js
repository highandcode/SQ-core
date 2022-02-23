var path = require('path');
const { chai, mocks } = require('../../tests/setup');
var expect = chai.expect;
var ContentServer = require('./content-server');
var mockSiteConfig = require('./test-data/test.mocksite.config');
var mockSiteConfigCustomized = {
  ...mockSiteConfig,
  siteMap: {
    ...mockSiteConfig.siteMap,
    errorRedirects: {
      500: '/content/pages/mockerror',
      404: '/content/pages/mock404',
      launchSoon: '/content/pages/mocklaunch'
    }
  }
};

describe('CMS::ContentServer', function () {
  let fse;
  let app;
  let common_inst;
  let real_inst;
  beforeEach(() => {
    fse = mocks.createMockRepository({}, ['readdir', 'existsSync', 'lstatSync', 'readdirSync', 'readFileSync']);
    app = mocks.createMockRepository({}, ['get', 'post', 'use']);
    chai.spy.on(fse, 'readdir', () => []);
    chai.spy.on(fse, 'lstatSync', () => ({ isDirectory: () => true }));
    chai.spy.on(fse, 'readdirSync', () => []);
    chai.spy.on(fse, 'readFileSync', () => '');
    chai.spy.on(app, 'use', () => []);
    chai.spy.on(app, 'get', () => []);
    chai.spy.on(app, 'post', () => []);
    common_inst = new ContentServer(
      {
        contentPath: '/test/content',
        serverPath: '/content/*',
        rootApp: '/test/',
        damAssets: '/test/dam',
        clientLibs: '/clientlibs',
        envConfig: {},
        mode: 'production',
        siteConfig: mockSiteConfig,
        fse,
        dirname: '/test/server'
      },
      app
    );

    real_inst = new ContentServer(
      {
        contentPath: path.resolve('cms/server/test-data/content'),
        serverPath: '/content/*',
        rootApp: path.resolve('cms/server/test-data'),
        damAssets: path.resolve('cms/server/test-data/dam'),
        clientLibs: '/clientlibs',
        envConfig: {},
        mode: 'production',
        siteConfig: mockSiteConfig
      },
      app
    );
    real_inst_customized = new ContentServer(
      {
        contentPath: path.resolve('cms/server/test-data/content'),
        serverPath: '/content/*',
        rootApp: path.resolve('cms/server/test-data'),
        damAssets: path.resolve('cms/server/test-data/dam'),
        clientLibs: '/clientlibs',
        envConfig: {},
        mode: 'production',
        siteConfig: mockSiteConfigCustomized
      },
      app
    );
  });
  it('should exists', () => {
    expect(ContentServer).not.to.undefined;
  });
  it('should be able to create new instance', () => {
    expect(new ContentServer({ fse })).not.to.undefined;
  });

  describe('pass the options', () => {
    let inst;
    before(() => {
      inst = new ContentServer({
        contentPath: '/test/content',
        serverPath: '/content/*',
        rootApp: '/test/',
        damAssets: '/test/dam',
        envConfig: {},
        mode: 'production',
        siteConfig: {},
        fse,
        dirname: '/test/server'
      });
    });

    it('should have contentFolder', () => {
      expect(inst.contentFolder).to.equal('/content');
    });
    it('should have clientLibs', () => {
      expect(inst.clientLibs).to.equal('/test/client');
    });
  });

  describe('mapVanity()', () => {
    it('should call app.use with string', () => {
      common_inst.mapVanity({
        test: '/test'
      });
      expect(app.use).to.be.called.with('/test');
    });
    it('should call app.use with target', () => {
      common_inst.mapVanity({
        '/content/(.*)': {
          type: 'regex',
          target: '/content/$1'
        }
      });
      expect(app.use).not.to.be.called.with('/content/$1');
    });
  });
  describe('getFilePath(path)', () => {
    let inst;
    beforeEach(() => {
      inst = new ContentServer({
        contentPath: '/test/content',
        serverPath: '/content/*',
        rootApp: '/test',
        damAssets: '/test/dam',
        envConfig: {},
        mode: 'production',
        siteConfig: {},
        fse,
        dirname: '/test/server'
      });
    });

    afterEach(() => {});

    it('should give priority to file gold.yaml', () => {
      chai.spy.on(fse, 'existsSync', (path) => (path.indexOf('gold') > -1 ? true : false));
      expect(inst.getFilePath('/test/dir/gold')).to.equal('/test/test/dir/gold.yaml');
      chai.spy.restore(fse, 'existsSync');
    });
    it('should give priority to if have /index.yaml', () => {
      chai.spy.on(fse, 'existsSync', (path) => (path.indexOf('/index.yaml') > -1 ? true : false));
      expect(inst.getFilePath('/test/dir/site')).to.equal('/test/test/dir/site/index.yaml');
      chai.spy.restore(fse, 'existsSync');
    });
    it('should return same path if not has yaml file', () => {
      chai.spy.on(fse, 'existsSync', (path) => (path.indexOf('.yaml') > -1 ? false : true));
      expect(inst.getFilePath('/test/dir/site')).to.equal('/test/test/dir/site');
      chai.spy.restore(fse, 'existsSync');
    });
    it('should return path if not matched', () => {
      chai.spy.on(fse, 'existsSync', (path) => false);
      expect(inst.getFilePath('/test/dir/site')).to.equal('/test/dir/site');
      chai.spy.restore(fse, 'existsSync');
    });
  });

  describe('getPageNode(node, path)', () => {
    let navigation = {
      children: [
        {
          title: 'Products',
          href: '/content/in/services',
          iconName: 'calendar-plus-fill',
          children: [
            {
              title: 'Gold',
              href: '/content/in/gold',
              children: [
                {
                  title: 'Chain',
                  href: '/content/in/gold/chain'
                },
                {
                  title: 'Ring',
                  href: '/content/in/gold/ring'
                }
              ]
            },
            {
              title: 'Silver',
              href: '/content/in/silver',
              children: [
                {
                  title: 'Panjeb',
                  href: '/content/in/silver/panjeb'
                },
                {
                  title: 'Kada',
                  href: '/content/in/silver/kada'
                }
              ]
            }
          ]
        }
      ]
    };
    describe('finding root as site', () => {
      let result;
      beforeEach(() => {
        result = common_inst.getPageNode(navigation, '/content/in/home');
      });
      it('should return undefined', () => {
        expect(result).to.be.undefined;
      });
    });
    describe('finding root as site', () => {
      let result;
      beforeEach(() => {
        result = common_inst.getPageNode(navigation, '/content/in/gold');
      });
      it('should have 2 sub menu', () => {
        expect(result.children.length).to.equal(2);
      });
      it('should have href as /content/in/gold', () => {
        expect(result.href).to.equal('/content/in/gold');
      });
    });
    describe('finding child node as site', () => {
      let result;
      beforeEach(() => {
        result = common_inst.getPageNode(navigation, '/content/in/silver/kada');
      });
      it('should have 2 sub menu', () => {
        expect(result.children.length).to.equal(2);
      });
      it('should have href as /content/in/silver', () => {
        expect(result.href).to.equal('/content/in/silver');
      });
    });
  });

  describe('getAppNameFromUrl(path)', () => {
    it('should return appName "test"', () => {
      expect(common_inst.getAppNameFromUrl('test/app/gold')).to.equal('test');
    });
  });
  describe('processContent(content, data)', () => {
    let result;
    beforeEach(() => {
      result = common_inst.processContent(
        {
          inject: {
            value: 'cold.war'
          },
          items: [
            {
              inject: {
                take: 'item'
              }
            }
          ]
        },
        {
          item: 'gold',
          cold: {
            war: 'test'
          }
        }
      );
    });

    it('should return value "test"', () => {
      expect(result.value).to.equal('test');
    });
    it('should return items[0].item "gold"', () => {
      expect(result.items[0].take).to.equal('gold');
    });
  });
  describe('init()', () => {
    beforeEach(() => {
      common_inst.init();
    });

    it('should call app.get to server html', () => {
      expect(app.get).to.be.called.with('/content/*');
    });

    it('should call app.post to server json', () => {
      expect(app.post).to.be.called.with('/content/*');
    });

    it('should call app.use to /client libs', () => {
      expect(app.use.__spy.calls[0][0]).to.equal('/client');
    });
    it('should call app.use to dam assets', () => {
      expect(app.use.__spy.calls[1][0]).to.equal('/dam');
    });
    it('should call app.use to clientLibs', () => {
      expect(app.use.__spy.calls[2][0]).to.equal('/clientlibs');
    });
  });

  describe('real instance test with test data', () => {
    describe('getPageData() parameters', () => {
      let result;
      beforeEach(() => {
        result = real_inst.getPageData('crm/goodpage');
      });
      it('should return mode', () => {
        expect(result.mode).to.equal('production');
      });
      it('should return status', () => {
        expect(result.status).to.equal(200);
      });
      it('should return path', () => {
        expect(result.path).to.equal('/content/crm/goodpage');
      });
      it('should return site', () => {
        expect(result.site).not.to.undefined;
      });
      it('should return siteConfig', () => {
        expect(result.siteConfig).to.eqls(mockSiteConfig);
      });
      it('should return currentNode', () => {
        expect(result.currentNode.title).to.equal('CRM Daniels');
      });
      it('should return merged', () => {
        expect(result.merged).not.to.undefined;
      });
      it('should return merged.launchTime', () => {
        expect(result.merged.launchTime).to.equal('');
      });
      it('should return merged.navigation', () => {
        expect(result.merged.navigation).to.eql([]);
      });
    });
    describe('getPageData() for good pages', () => {
      let result;
      beforeEach(() => {
        result = real_inst.getPageData('crm/goodpage');
      });
      it('should have page title "Sample page"', () => {
        expect(result.pageData.title).to.equal('Sample page');
      });
    });

    describe('getPageData() for page has errors [default]', () => {
      let result;
      beforeEach(() => {
        result = real_inst.getPageData('crm/dataerror');
      });
      it('should return defined page "Error occurred"', () => {
        expect(result.pageData.title).to.equal('Error occurred');
      });
    });
    describe('getPageData() for page dont exists [default]', () => {
      let result;
      beforeEach(() => {
        result = real_inst.getPageData('crm/non-exist');
      });
      it('should return defined page "Page not found"', () => {
        expect(result.pageData.title).to.equal('Page not found');
      });
    });
    describe('getPageData() for page not launched [default]', () => {
      let result;
      beforeEach(() => {
        result = real_inst.getPageData('crm/launch');
      });
      it('should return defined page "Coming soon"', () => {
        expect(result.pageData.title).to.equal('Coming soon');
      });
    });

    describe('getPageData() for page has errors [customized]', () => {
      let result;
      beforeEach(() => {
        result = real_inst_customized.getPageData('crm/dataerror');
      });
      it('should return defined page "Mock error"', () => {
        expect(result.pageData.title).to.equal('Mock error');
      });
    });
    describe('getPageData() for page dont exists [customized]', () => {
      let result;
      beforeEach(() => {
        result = real_inst_customized.getPageData('crm/non-exist');
      });
      it('should return defined page "Mock not found"', () => {
        expect(result.pageData.title).to.equal('Mock not found');
      });
    });
    describe('getPageData() for page not launched [customized]', () => {
      let result;
      beforeEach(() => {
        result = real_inst_customized.getPageData('crm/launch');
      });
      it('should return defined page "Mock launch"', () => {
        expect(result.pageData.title).to.equal('Mock launch');
      });
    });
    describe('getPageData() for page already launched [customized]', () => {
      let result;
      beforeEach(() => {
        result = real_inst_customized.getPageData('crm/launched');
      });
      it('should return defined page "Launched page"', () => {
        expect(result.pageData.title).to.equal('Launched page');
      });
      it('should return launchTime', () => {
        expect(!!result.merged.launchTime).to.equal(true);
      });
    });
  });
});
