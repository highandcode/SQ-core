import { observable } from 'mobx';
import apiBridge from '../utils/api-bridge';
import { utils } from 'sq-core/web';
class ContentStore {
  @observable userData = {};

  constructor({ config = {} } = {}) {
    this.config = config;
    this.userData = this.getSystem();
  }

  async getPage(page) {
    const fullUrl = page || location.href;
    const resp = await apiBridge.post(fullUrl);
    return resp.data;
  }

  processParams(params = {}) {
    const newObj = {};
    Object.keys(params).forEach((key) => {
      let value;
      if (typeof params[key] === 'object') {
        value = this.processParams(params[key]);
      } else if (params[key].toString().substr(0, 1) === '.') {
        value = utils.object.getDataFromKey(this.userData, params[key].substr(1), undefined);
      } else if (!utils.common.isNullOrUndefined(params[key])) {
        value = params[key];
      }
      if (!utils.common.isNullOrUndefined(value)) {
        newObj[key] = value;
      }
    });
    return newObj;
  }

  postApi(data) {
    return apiBridge[data.method.toLowerCase()](data.url, this.processParams(data.params), data.headers).then((response) => {
      if (response.status === 'success') {
        this.updateUserData(response.data);
      } else {
        this.updateUserData({
          error: response.error
        });
      }
      return response;
    });
  }

  mergeUserData(data) {
    this.updateUserData(this.processParams(data), true);
  }

  getSystem() {
    return {
      query: utils.queryString.query.get()
    };
  }

  resetUserData(data = {}) {
    this.userData = {
      ...data,
      ...this.getSystem()
    };
  }

  extendData(org, update) {
    let obj = {
      ...org
    };
    Object.keys(update).forEach((a) => {
      if (!Array.isArray(update[a]) && typeof update[a] === 'object') {
        obj[a] = this.extendData(obj[a], update[a]);
      } else {
        obj[a] = update[a];
      }
    });
    return obj;
  }

  updateUserData(data, append) {
    let merged = {};
    if (append) {
      merged = this.extendData(this.userData, data);
    } else {
      merged = data;
    }
    this.userData = {
      ...this.userData,
      ...merged,
      ...this.getSystem()
    };
  }
}

export default new ContentStore();
