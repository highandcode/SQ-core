const { chai } = require('../../../tests/setup');
const Timeunit = require('./time-unit');
const { expect } = chai;
const timeunit = new Timeunit();

describe('Utils:timeunit', () => {
  describe('getTimeunit()', () => {
    it('should return 1s to 1000', () => {
      expect(timeunit.getTimeunit('1s')).to.equal(1000);
    });
    it('should return 1m to 60000', () => {
      expect(timeunit.getTimeunit('1m')).to.equal(60000);
    });
    it('should return 1h to 60 * 60 * 1000', () => {
      expect(timeunit.getTimeunit('1h')).to.equal(60 * 60 * 1000);
    });
    it('should return 1d to 24 * 60 * 60 * 1000', () => {
      expect(timeunit.getTimeunit('1d')).to.equal(24 * 60 * 60 * 1000);
    });
  });
});
