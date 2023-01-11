const { chai } = require('../../../tests/setup');
var expect = chai.expect;
const { path } = require('./index');

describe('utils:path', function () {
  describe('#path.ensureSlashAtEnd(path)', function () {
    it('should return / at end of path', () => {
      expect(path.ensureSlashAtEnd('/test/content')).to.equal('/test/content/');
    });
    it('should return / at end of path', () => {
      expect(path.ensureSlashAtEnd('/test/content/')).to.equal('/test/content/');
    });
    it('should return / at start of path', () => {
      expect(path.ensureSlashAtStart('/test/')).to.equal('/test/');
    });
    it('should return / at start of path', () => {
      expect(path.ensureSlashAtStart('test/')).to.equal('/test/');
    });
  });
});
