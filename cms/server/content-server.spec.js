const { chai, mocks } = require('../../tests/setup');
var expect = chai.expect;
var ContentServer = require('./content-server');

describe('CMS::ContentServer', function () {
  let fse;
  let app;
  let common_inst;
  beforeEach(() => {
    fse = mocks.createMockRepository({}, ['readdir']);
    app = mocks.createMockRepository({}, ['get', 'post', 'use']);
    chai.spy.on(fse, 'readdir', () => []);
    chai.spy.on(app, 'use', () => []);
    chai.spy.on(app, 'get', () => []);
    chai.spy.on(app, 'post', () => []);
    common_inst = new ContentServer(
      {
        contentPath: '/test/content',
        serverPath: '/content/*',
        rootApp: '/test/',
        damAssets: '/test/dam',
        envConfig: {},
        mode: 'production',
        siteConfig: {},
        fse,
        dirname: '/test/server'
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
});
