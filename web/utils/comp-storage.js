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
    this.defaultPrefData = null;
    this.namedPrefData = {};
    this._win = window;
    this.events = new EventManager();
  }

  setData(data) {
    this.defaultPrefData = data;
  }

  setNamedData(data) {
    this.namedPrefData = data;
  }

  ensureNoSlashStart(url) {
    if (url?.substr(0, 1) === '/') {
      return url.substr(1);
    } else {
      return url;
    }
  }

  getAllNames() {
    return Object.keys(this.namedPrefData[this.preferenceKey()] || {});
  }

  preferenceKey() {
    return this.nameString(this.ensureNoSlashStart(this._win.location.pathname));
  }

  nameString(name) {
    return (name || '').split(' ').join('_').split('/').join('_');
  }

  getKey(prefix) {
    return `${prefix || 'default'}_${this.preferenceKey().split('/').join('_')}`;
  }

  read(key, isNull) {
    if (this.defaultPrefData) {
      return this.defaultPrefData[this.getKey(key)] || (isNull ? undefined : {});
    }
    return getParseJSON(this._win.localStorage.getItem(this.getKey(key)), isNull);
  }

  write(key, data) {
    if (this.defaultPrefData) {
      this.defaultPrefData[this.getKey(key)] = data;
      this.events.emit('onWrite', this.getKey(key), data, this.preferenceKey(), 'default');
      return;
    }
    data && this._win.localStorage.setItem(this.getKey(key), JSON.stringify(data));
  }
  writeAll(obj) {
    const objToSend = {};
    Object.keys(obj).forEach((itemKey) => {
      objToSend[this.getKey(itemKey)] = obj[itemKey] || "";
    });
    if (this.defaultPrefData) {
      Object.keys(objToSend).forEach((itemKey) => {
        this.defaultPrefData[itemKey] = objToSend[itemKey];
      });
      this.events.emit('onWriteAll', objToSend, this.preferenceKey(), 'default');
      return;
    }
    Object.keys(objToSend).forEach((itemKey) => {
      const data = obj[itemKey] || {};
      this._win.localStorage.setItem(itemKey, JSON.stringify(data));
    });
  }

  readNamed(key, name, isNull) {
    if (this.namedPrefData[this.preferenceKey()] && this.namedPrefData[this.preferenceKey()][name]) {
      return this.namedPrefData[this.preferenceKey()][name][this.getKey(key)] || (isNull ? undefined : {});
    }
    return isNull ? undefined : {};
  }

  writeNamed(key, data, name) {
    if (!this.namedPrefData[this.preferenceKey()]) {
      this.namedPrefData[this.preferenceKey()] = {};
    }
    if (!this.namedPrefData[this.preferenceKey()][name]) {
      this.namedPrefData[this.preferenceKey()][name] = {};
    }
    this.namedPrefData[this.preferenceKey()][name][this.getKey(key)] = data;
    this.events.emit('onWriteNamed', this.getKey(key), data, this.preferenceKey(), name);
  }

  writeAllNamed(obj, name) {
    const objToSend = {};
    Object.keys(obj).forEach((itemKey) => {
      objToSend[this.getKey(itemKey)] = obj[itemKey] || {};
    });
    if (!this.namedPrefData[this.preferenceKey()]) {
      this.namedPrefData[this.preferenceKey()] = {};
    }
    if (!this.namedPrefData[this.preferenceKey()][name]) {
      this.namedPrefData[this.preferenceKey()][name] = {};
    }

    Object.keys(objToSend).forEach((itemKey) => {
      this.namedPrefData[this.preferenceKey()][name][itemKey] = objToSend[itemKey];
    });
    this.events.emit('onWriteAllNamed', objToSend, this.preferenceKey(), name);
    return;
  }

  setHelpers(helpers) {
    this.helpers = {
      ...this.helpers,
      ...helpers,
    };
  }

  clearData() {
    if (this.defaultPrefData) {
      this.defaultPrefData = null;
    }
  }
}

export { Storage, GroupStorage, PreferenceStorage };
