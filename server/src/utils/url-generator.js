const QueryString = require('./query-string');

class UrlGenerator {
  constructor(config = {}) {
    this.config = config;
  }

  setConfig(config = {}) {
    this.config = {
      ...this.config,
      ...config
    };
  }

  ensureSlashEnd(url) {
    if (url.substr(url.length - 1) === '/') {
      return url;
    } else {
      return url ? url + '/' : url;
    }
  }

  ensureNoSlashStart(url) {
    if (url.substr(0, 1) === '/') {
      return url.substr(1);
    } else {
      return url;
    }
  }

  create(url, params) {
    return this.ensureSlashEnd(this.config.server.host) + this.ensureNoSlashStart(url) + new QueryString(params).toString();
  }
}

module.exports = UrlGenerator;
