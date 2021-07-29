const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var mask = require('./mask');

describe('utils::mask', function () {
  describe('#email(string)', function () {
    it('should mask email', () => {
      expect(mask.email('navneet@gmail.com')).to.equal('n****@gmail.com');
    });
    it('should mask email', () => {
      expect(mask.email('tokne@gmail.com')).to.equal('t****@gmail.com');
    });
  });
  describe('#phone(string)', function () {
    it('should mask phone', () => {
      expect(mask.phone('+19910702765')).to.equal('+1******2765');
    });
    it('should mask phone', () => {
      expect(mask.phone('+919910708999')).to.equal('+91******8999');
    });
  });
});
