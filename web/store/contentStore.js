import { observable } from 'mobx';
import apiBridge from '../utils/api-bridge';

class ContentStore {
  @observable userData = {};

  constructor({ config = {} } = {}) {
    this.config = config;
  }

  async getPage(page) {
    const fullUrl = page || location.href;
    const resp = await apiBridge.post(fullUrl);
    return resp.data;
  }

  setUserData(data) {
    this.userData = data;
  }

  updateUserData(data) {
    this.userData = {
      ...this.userData,
      ...data
    };
  }
}

export default new ContentStore();
