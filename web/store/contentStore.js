import { observable } from 'mobx';
import apiBridge from '../utils/api-bridge';

class ContentStore {

  constructor({ config = {} } = {}) {
    this.config = config;
  }

  async getPage(page) {
    const resp = await apiBridge.post(page || location.href);
    return resp.data;
  }
}

export default new ContentStore();
