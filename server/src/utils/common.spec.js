const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var commons = require('./common');

describe('utils:common', function () {
  describe('#isNullOrUndefined()', function () {
    it('should return true when there is null value', () => {
      expect(commons.isNullOrUndefined(null)).to.equal(true);
    });
    it('should return true when there is undefined value', () => {
      expect(commons.isNullOrUndefined(undefined)).to.equal(true);
    });
    it('should return false when there is blank value', () => {
      expect(commons.isNullOrUndefined('')).to.equal(false);
    });
    it('should return false when there is 0 value', () => {
      expect(commons.isNullOrUndefined(0)).to.equal(false);
    });
  });
  describe('#isNullOrUndefinedBlank()', function () {
    it('should return true when there is null value', () => {
      expect(commons.isNullOrUndefinedBlank(null)).to.equal(true);
    });
    it('should return true when there is undefined value', () => {
      expect(commons.isNullOrUndefinedBlank(undefined)).to.equal(true);
    });
    it('should return true when there is blank value', () => {
      expect(commons.isNullOrUndefinedBlank('')).to.equal(true);
    });
    it('should return false when there is 0 value', () => {
      expect(commons.isNullOrUndefinedBlank(0)).to.equal(false);
    });
  });
  describe('#getValue()', function () {
    it('should return null', () => {
      expect(commons.getValue(null)).to.equal('');
    });
    it('should return exact value if not fn', () => {
      expect(commons.getValue({}, 'test')).to.equal('test');
    });
    it('should return true when there is blank value', () => {
      expect(
        commons.getValue({}, (args) => 'fun result'),
        { test: true }
      ).to.equal('fun result');
    });
  });
});
