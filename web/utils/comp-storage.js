class Storage {
  constructor(components = {}) {
    this.components = components;
  }

  get() {
    return this.components;
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
  }

  get(group) {
    return this.components[group] || this.components.default;
  }

  getAll() {
    let newObj = {};
    Object.keys(this.components).forEach((a) => {
      newObj = {
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
        newComps,
      },
    };
  }
}
export { Storage, GroupStorage };
