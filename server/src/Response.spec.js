var expect = require("chai").expect;
var Response = require("./Response.js");

describe("Response", function () {
  describe("Basics", function () {
    it('should not be null', function () {
      expect(typeof (Response)).to.equal('function');
    });
    it('should be able to create object', function () {
      expect(new Response({})).to.be.an('object');
    });
  });
  describe("success()", function () {
    it('should have status prop as "success"', function () {
      var response = new Response({}).success();
      expect(response.status).to.equal('success');
    });
    it('should have property as "data"', function () {
      var data = {sample:1};
      var response = new Response(data).success();
      expect(response.data).to.equal(data);
    });
  });
  describe("error()", function () {
    it('should have status prop as "error"', function () {
      var response = new Response({}).error();
      expect(response.status).to.equal('error');
    });
    it('should have property as "data"', function () {
      var data = {error:1};
      var response = new Response(data).error();
      expect(response.error).to.equal(data);
    });
  });
});