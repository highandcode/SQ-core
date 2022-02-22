const { chai } = require('../tests/setup');
var expect = chai.expect;
var server = require('./index');

describe('Server', function () {
  it('should exists', () => {
    expect(server).not.to.undefined;
  });
});
