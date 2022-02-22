const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var filter = require("./filter");

describe("utils::filter", function () {

  describe("ignoreCase()", function () {
    it('should return regex with ignore case', () => {
      expect(filter.ignoreCase('as@sk.com')).be.eql({
        $regex: `^as@sk\\.com$`,
        $options: 'i'
      });
    });
    it('should return with escaped chars', () => {
      expect(filter.ignoreCase('+919910702765')).be.eql({
        $regex: `^\\+919910702765$`,
        $options: 'i'
      });
    });

  });
  describe("includes()", function () {
    it('should return regex with ignore case', () => {
      expect(filter.includes('as@sk.com')).be.eql({
        $regex: `as@sk\\.com`,
        $options: 'i'
      });
    });
    it('should return with escaped chars', () => {
      expect(filter.includes('+919910702765')).be.eql({
        $regex: `\\+919910702765`,
        $options: 'i'
      });
    });

  });


});