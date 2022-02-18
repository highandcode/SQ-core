const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var cms = require('./index');

describe('CMS', function () {
  it('should return true when there is null value', () => {
    expect(cms).not.to.undefined;
  });
});
