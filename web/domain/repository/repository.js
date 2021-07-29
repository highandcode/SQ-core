import apiBridge from '../../utils/api-bridge';
import Queryable from '../collections/queryable';
import { CONSTANTS } from '../../globals';

class Repository {
  constructor({ type, apiUrl, collection }) {
    this.typeOf = type;
    this.apiUrl = apiUrl;
    this.collection = collection;
  }

  createNew(raw) {
    return new this.typeOf(raw);
  }

  createCollection(data) {
    return new Queryable(data, { entityType: this.typeOf });
  }

  async get(params = {}, { type = 'get', url } = {}) {
    return await apiBridge[type](url || this.apiUrl, params);
  }

  async getOne(params, options = {}) {
    return await this.get(params, {
      ...options,
      type: 'post'
    }).then(this.getEntity.bind(this));
  }

  async getMany(params, options = {}) {
    return await this.get(params, {
      ...options,
      type: 'post'
    }).then(this.getQueryable.bind(this));
  }

  async create(params = {}, { url } = {}) {
    return await apiBridge.post(url || this.apiUrl, params).then(this.getEntity.bind(this));
  }

  async search(params, { url } = {}) {
    return await apiBridge.post(url || this.apiUrl, params).then(this.getQueryable.bind(this));
  }

  getEntity(response) {
    const that = this;
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      return {
        ...response,
        data: new that.typeOf(response.data)
      };
    }
    return response;
  }

  toQueryable(data) {
    return new Queryable(data, { entityType: this.typeOf });
  }

  getQueryable(response, dataKey) {
    if (response.status === CONSTANTS.STATUS.SUCCESS) {
      return {
        ...response,
        data: {
          ...response.data,
          [dataKey]: response.data[dataKey] ? new Queryable(response.data[dataKey], { entityType: this.typeOf }) : {}
        }
      };
    }
    return response;
  }

  async fetch(params, { url, dataKey = this.collection } = {}) {
    return await apiBridge.post(url || this.apiUrl, params).then((res) => this.getQueryable(res, dataKey));
  }

  async update(params, { url } = {}) {
    return await apiBridge.update(url || this.apiUrl, params).then(this.getEntity.bind(this));
  }

  async updateWithPost(params, { url } = {}) {
    return await apiBridge.post(url || this.apiUrl, params).then(this.getEntity.bind(this));
  }

  async delete(params, { url } = {}) {
    return await apiBridge.delete(url || this.apiUrl, params);
  }
  async deleteByUid(params, { url } = {}) {
    return await apiBridge.delete(url || this.apiUrl, { uid: params.uid });
  }

  async post(url, params) {
    return await apiBridge.post(url, params);
  }
  async postOne(url, params) {
    return await apiBridge.post(url, params).then(this.getEntity.bind(this));
  }
}

export default Repository;
