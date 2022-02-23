const { chai, mocks } = require('../../tests/setup');
const server = require('./index');
const { expect } = chai;
describe('CMS::Server', function () {
  it('should have .ContentServer', () => {
    expect(server.ContentServer).not.to.be.undefined;
  });
  it('should have .JobScheduler', () => {
    expect(server.JobScheduler).not.to.be.undefined;
  });
});
