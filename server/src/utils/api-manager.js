const _axios = require('axios');
const UrlGenerator = require('./url-generator');
class ApiManager {
  constructor({ headers = {}, domain = '', axios = _axios, ...options } = {}) {
    this.axios = axios;
    this.config = {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
    this.options = options;
    this.url =
      options.url ||
      new UrlGenerator({
        server: {
          host: domain,
        },
      });
  }

  addHeader(name, value) {
    this.config.headers[name] = value;
  }

  removeHeader(name) {
    delete this.config.headers[name];
  }

  handleResponse(res) {
    return {
      ax_response: res,
      success: true,
      data: res.data,
      code: res.status,
    };
  }

  handleError(res) {
    return {
      api_error: true,
      ax_error: res,
      error: true,
      data: res.response?.data,
      code: res.response?.status,
    };
  }

  request(url, body = {}, { method = 'get', ...options } = {}) {
    const finalUrl = this.url.create(url, method === 'get' ? body : {});
    return new Promise((resolve, reject) => {
      this.axios({
        method: method,
        url: finalUrl,
        headers: { ...this.config.headers, ...options.headers },
        data: body,
      })
        .then((response) => {
          resolve(this.handleResponse(response));
        })
        .catch((error) => {
          reject(this.handleError(error));
        });
    });
  }

  post(url, body, options) {
    return this.request(url, body, { ...options, method: 'post' });
  }
  get(url, body, options) {
    return this.request(url, body, { ...options, method: 'get' });
  }
  put(url, body, options) {
    return this.request(url, body, { ...options, method: 'put' });
  }
  delete(url, body, options) {
    return this.request(url, body, { ...options, method: 'delete' });
  }
}

module.exports = ApiManager;
