const { chai } = require('../../../tests/setup');
const UrlGenerator = require('./url-generator');
const { expect } = chai;

describe('Utils:UrlGenerator', () => {

  const defaultConfig = {
    server: {
      host: 'http://localhost:4000'
    }
  };
  describe('ensureSlashEnd(url)', () => {
    const urlGener = new UrlGenerator({
      ...defaultConfig
    });
    it('should add / at the end', () => {
      expect(urlGener.ensureSlashEnd('http://localhost:4000')).to.equal('http://localhost:4000/')
    });
    it('should not add / at the end', () => {
      expect(urlGener.ensureSlashEnd('http://localhost:4000/')).to.equal('http://localhost:4000/')
    });


  });
  describe('ensureNoSlashStart(url)', () => {
    const urlGener = new UrlGenerator();
    it('should remove / at the start', () => {
      expect(urlGener.ensureNoSlashStart('/emailverify')).to.equal('emailverify')
    });
    it('should return as it is', () => {
      expect(urlGener.ensureNoSlashStart('emailverify')).to.equal('emailverify')
    });


  });
  describe('create(url, params)', () => {
    const urlGener = new UrlGenerator({
      ...defaultConfig
    });
    it('should create url with query params', () => {
      expect(urlGener.create('/emailverify', { token: 'heytoken' })).to.equal('http://localhost:4000/emailverify?token=heytoken')
    });
  });

});