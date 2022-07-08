import apiBridge from './api-bridge';

let fakeData = {};

function setUpFakeData(url, data, status) {
  fakeData[url] = {
    status: status || 200,
    data,
    json: () => {
      return data;
    },
  };
}

function resetFakeData() {
  fakeData = {};
}

function setUp() {
  window.fetch = function (url) {
    return Promise.resolve(fakeData[url]);
  };
}

describe('Api Bridge', () => {
  beforeEach(() => {
    setUp();
  });
  it('should have get() method', () => {
    expect(typeof apiBridge.get).toBe('function');
  });
  it('should have post() method', () => {
    expect(typeof apiBridge.post).toBe('function');
  });
  it('should have update() method', () => {
    expect(typeof apiBridge.update).toBe('function');
  });
  it('should have delete() method', () => {
    expect(typeof apiBridge.delete).toBe('function');
  });
  describe('ApiBridge:get()', function () {
    let response;
    beforeEach(async () => {
      resetFakeData();
      setUpFakeData('/test', { hello: true });
      response = await apiBridge.get('/test');
    });
    it('should return the data in promise', async () => {
      expect(response).toEqual({ hello: true });
    });
  });
});
