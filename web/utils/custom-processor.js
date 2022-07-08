class CustomProcessor {
  constructor() {
    this.processor = {
      globals: {
        options: (value) => {
          return this.globalOptions[value]?.toArray();
        },
        filterOptions: (value, { optionsName, ...params }) => {
          if (this.globalOptions[optionsName]) {
            return this.globalOptions[optionsName].fromData(value, params);
          }
          return value;
        },
        getOptionArray: (value, {}) => {
          if (this.globalOptions[value]) {
            return this.globalOptions[value].toArray();
          }
          return [];
        },
        getOption: (value, { optionsName }) => {
          if (this.globalOptions[optionsName]) {
            return this.globalOptions[optionsName].get(value);
          }
          return value;
        },
      }
    };
    this.globalOptions = {};
  }

  registerOptions(options) {
    this.globalOptions = options;
  }

  add(moduleName, actions) {
    if (!this.processor[moduleName]) {
      this.processor[moduleName] = {};
    }
    this.processor[moduleName] = {
      ...this.processor[moduleName],
      ...actions,
    };
  }

  remove(moduleName) {
    delete this.processor[moduleName];
  }

  execute(moduleAction, ...params) {
    const actions = moduleAction.split('.');
    const moduleName = actions[0];
    const action = actions[1];
    let output;
    if (this.processor[moduleName]) {
      if (this.processor[moduleName][action]) {
        output = this.processor[moduleName][action].apply(this, params);
      } else {
        throw `${moduleName}.${action} action not found`;
      }
    } else {
      throw `${moduleName} module not found`;
    }
    return output;
  }
}

export default CustomProcessor;
