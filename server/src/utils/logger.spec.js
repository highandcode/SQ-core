const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var logger = require("./logger");

describe("utils::logger", function () {
  beforeEach(() => {
    chai.spy.on(console, 'log');
  });
  afterEach(() => {
    chai.spy.restore(console, 'log');
  });
  describe("#log()", function () {
    it('should enable logger by default', () => {
      logger.log('Test');
      expect(console.log).to.have.been.called.with('Test');
    });
    it('should be able to turn off', () => {
      logger.off();
      logger.log('Test');
      expect(console.log).not.to.have.been.called;
    });
    it('should be able to turn on/off', () => {
      logger.off();
      logger.log('Test');
      logger.log('Test');
      logger.on();
      logger.log('Test 2');
      expect(console.log).to.have.been.called.with('Test 2');
    });
  });
  describe("#filter()", function () {
    it('should be able to set filter', () => {
      logger.filter('API:');
      logger.log('Call:Test');
      logger.log('API22:Test');
      logger.log('API:Test22');
      expect(console.log).to.have.been.called.once;
    });
    
  });
  describe("#clearFilter()", function () {
    it('should be able to set filter', () => {
      logger.filter('API:');
      logger.log('Call:Test');
      logger.log('API22:Test');
      logger.log('API:Test22');
      logger.clearFilter();
      logger.log('Call:Test');
      logger.log('API22:Test');
      logger.log('API:Test22');
      expect(console.log).to.have.been.called.exactly(4);
    });
  });

});