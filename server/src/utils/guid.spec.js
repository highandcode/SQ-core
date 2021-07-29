var expect = require("chai").expect;
var utils = require("./index");


describe("utils:guid", function () {
  describe("#guid()", function () {
    it('should create new guid', () => {
      expect(utils.guid()).be.an('string');
    });

    it('should create unique guid', () => {
      var arr = [];
      for (var count = 0; count < 100; count++) {
        var newGuid = utils.guid();
        expect(arr.indexOf(newGuid) > -1).be.equals(false);
        arr.push(newGuid);
      }
    });
  });

});