import EventManager from './event-manager';

class Storage {
  constructor(components = {}) {
    this.components = components;
    this.helpers = {};
  }

  setHelpers(helpers) {
    this.helpers = {
      ...this.helpers,
      ...helpers,
    };
  }

  add(name, data) {
    this.components[name] = data;
  }

  get() {
    return this.components;
  }

  remove(key) {
    delete this.components[key];
  }

  set(newComps) {
    this.components = {
      ...this.components,
      ...newComps,
    };
  }
}

class GroupStorage {
  constructor(components) {
    this.components = {
      default: components,
    };
    this.fns = {};
  }

  setHelpers(helpers) {
    this.helpers = {
      ...this.helpers,
      ...helpers,
    };
  }

  add(name, data) {
    this.components[name] = data;
  }

  get(group) {
    return this.components[group] || this.components.default;
  }

  remove(group) {
    delete this.components[group];
  }

  getAll() {
    let newObj = {};
    Object.keys(this.components).forEach((a) => {
      newObj = {
        ...newObj,
        ...this.components[a],
      };
    });
    return newObj;
  }

  set(newComps, group = 'default') {
    this.components = {
      ...this.components,
      [group]: {
        ...(this.components[group] || {}),
        ...newComps,
      },
    };
  }
}

export const getParseJSON = (obj, isNull) => {
  try {
    return typeof obj == 'string' ? JSON.parse(obj) : obj || (isNull ? undefined : {});
  } catch (e) {
    return obj || (isNull ? undefined : {});
  }
};

class PreferenceStorage {
  constructor() {
    this.helpers = {};
    this.prefData = null;
    this._win = window;
    this.events = new EventManager();
  }

  setData(data) {
    this.prefData = data;
  }

  getKey(prefix) {
    return `${prefix || 'default'}_${(this._win.location.pathname || '').split('/').join('_')}`;
  }

  read(key, isNull) {
    if (this.prefData) {
      return this.prefData[this.getKey(key)];
    }
    return getParseJSON(this._win.localStorage.getItem(this.getKey(key)), isNull);
  }

  write(key, data) {
    if (this.prefData) {
      this.prefData[key] = data;
      this.events.emit('onWrite', key, data);
      return;
    }
    data && this._win.localStorage.setItem(this.getKey(key), JSON.stringify(data));
  }

  setHelpers(helpers) {
    this.helpers = {
      ...this.helpers,
      ...helpers,
    };
  }

  clearData() {
    if (this.prefData) {
      this.prefData = null;
    }
  }
}

export { Storage, GroupStorage, PreferenceStorage };
