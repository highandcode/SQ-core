const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var ApiManager = require('./api-manager');

describe('utils:ApiManager', function () {
  describe('basic', function () {
    it('should exists', () => {
      expect(ApiManager).not.to.undefined;
    });
    it('should be able to create instance', () => {
      expect(new ApiManager()).not.to.undefined;
    });
  });

  describe('get()', function () {
    let apiMgr;
    let axios;
    let params;
    before(() => {
      axios = {
        method: () => {}
      };
      chai.spy.on(axios, 'method', (...args) => {
        params = args;
        return Promise.resolve({ args });
      });

      apiMgr = new ApiManager({
        axios: axios.method,
        domain: 'http://test.com'
      });
      apiMgr.get('/test');
    });
    it('should call axios', () => {
      expect(axios.method).to.called.once;
    });
    it('should called with given params', () => {
      expect(params[0]).to.eql({
        data: {},
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'get',
        url: 'http://test.com/test'
      });
    });
  });

  describe('post()', function () {
    let apiMgr;
    let axios;
    let params;
    before(() => {
      axios = {
        method: () => {}
      };
      chai.spy.on(axios, 'method', (...args) => {
        params = args;
        return Promise.resolve({ args });
      });

      apiMgr = new ApiManager({
        axios: axios.method,
        domain: 'http://test.com'
      });
      apiMgr.post('/test');
    });
    it('should call axios', () => {
      expect(axios.method).to.called.once;
    });
    it('should called with given params', () => {
      expect(params[0]).to.eql({
        data: {},
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url: 'http://test.com/test'
      });
    });
  });
  describe('put()', function () {
    let apiMgr;
    let axios;
    let params;
    before(() => {
      axios = {
        method: () => {}
      };
      chai.spy.on(axios, 'method', (...args) => {
        params = args;
        return Promise.resolve({ args });
      });

      apiMgr = new ApiManager({
        axios: axios.method,
        domain: 'http://test.com'
      });
      apiMgr.put('/test');
    });
    it('should call axios', () => {
      expect(axios.method).to.called.once;
    });
    it('should called with given params', () => {
      expect(params[0]).to.eql({
        data: {},
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'put',
        url: 'http://test.com/test'
      });
    });
  });
  describe('delete()', function () {
    let apiMgr;
    let axios;
    let params;
    before(() => {
      axios = {
        method: () => {}
      };
      chai.spy.on(axios, 'method', (...args) => {
        params = args;
        return Promise.resolve({ args });
      });

      apiMgr = new ApiManager({
        axios: axios.method,
        domain: 'http://test.com'
      });
      apiMgr.delete('/test');
    });
    it('should call axios', () => {
      expect(axios.method).to.called.once;
    });
    it('should called with given params', () => {
      expect(params[0]).to.eql({
        data: {},
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'delete',
        url: 'http://test.com/test'
      });
    });
  });

  describe('post() -> success()', function () {
    let apiMgr;
    let axios;
    let params;
    let response;
    before(async () => {
      axios = {
        method: () => {}
      };
      chai.spy.on(axios, 'method', (...args) => {
        params = args;
        return Promise.resolve({ args, data: { test: true }, status: 200 });
      });

      apiMgr = new ApiManager({
        axios: axios.method,
        domain: 'http://test.com'
      });
      response = await apiMgr.post('/test');
    });
    it('should call axios', () => {
      expect(axios.method).to.called.once;
    });
    it('should called with given params', () => {
      expect(params[0]).to.eql({
        data: {},
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url: 'http://test.com/test'
      });
    });
    it('should have response.data', () => {
      expect(response.data).to.eql({ test: true });
    });
    it('should have response.success', () => {
      expect(response.success).to.equal(true);
    });
    it('should have response.code', () => {
      expect(response.code).to.equal(200);
    });
  });

  describe('post() -> error()', function () {
    let apiMgr;
    let axios;
    let params;
    let response;
    before(async () => {
      axios = {
        method: () => {}
      };
      chai.spy.on(axios, 'method', (...args) => {
        params = args;
        return Promise.reject({ args, response: { data: { error: true }, status: 400 } });
      });

      apiMgr = new ApiManager({
        axios: axios.method,
        domain: 'http://test.com'
      });
      await apiMgr.post('/test').catch((ex) => {
        response = ex;
      });
    });
    it('should call axios', () => {
      expect(axios.method).to.called.once;
    });
    it('should called with given params', () => {
      expect(params[0]).to.eql({
        data: {},
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'post',
        url: 'http://test.com/test'
      });
    });
    it('should have response.data', () => {
      expect(response.data).to.eql({ error: true });
    });
    it('should have response.success', () => {
      expect(response.error).to.equal(true);
    });
    it('should have response.code', () => {
      expect(response.code).to.equal(400);
    });
  });
});
