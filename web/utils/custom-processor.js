const object = require('../../server/src/utils/object');
const common = require('../../server/src/utils/common');
const _string = require('./string').default;
const accent = require('./accent-colors').default;

class CustomProcessor {
  constructor() {
    this.processor = {
      compare: {
        equals: (value, { matchValue = '' } = {}) => {
          return value === matchValue;
        },
        notEquals: (value, { matchValue = '' } = {}) => {
          return value !== matchValue;
        },
        exists: (value) => {
          return !!value;
        },
      },
      dataType: {
        string: (value) => {
          return !common.isNullOrUndefined(value) ? value.toString() : value;
        },
        number: (value) => {
          return !common.isNullOrUndefined(value) ? value * 1 : value;
        },
        forceArray: (value) => {
          if (value && Array.isArray(value)) {
            return value;
          }
          return [];
        },
      },
      common: {
        accentByChar: (value) => {
          return accent.getColorByChar(_string.getTwoChars(value));
        },
        getTwoChars: (value) => {
          return _string.getTwoChars(value);
        },
        addClassName: (value, { oldValue = '' } = {}) => {
          return oldValue + ' ' + value;
        },
        join: (value, { fields }, { userData }) => {
          const arr = fields?.split('+');
          const values = arr
            ?.map((val) => {
              if (val.charAt(0) === '.') {
                return object.getDataFromKey(userData, val.substr(1));
              }
              return val;
            })
            .join('');
          return values;
        },
      },
      array: {
        join: (value) => {
          return Array.isArray(value) ? value.join(',') : value;
        },
        extractByKey: (value, { key = 'code' } = {}) => {
          return Array.isArray(value) ? value.map((i) => i[key]).join(',') : value;
        },
        extractDataArray: (result) => {
          if (result.status === CONSTANTS.STATUS.SUCCESS) {
            return {
              pages: result.data.data,
            };
          }
        },
      },
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
        getOptionArray: (value) => {
          if (this.globalOptions[value]) {
            return this.globalOptions[value].toArray();
          }
          return [];
        },
        getOption: (value, { optionsName, options, textField = 'text', valueField = 'value' } = {}) => {
          if (options) {
            const filterOpt = options.filter((i) => i[valueField] === value);
            if (filterOpt.length > 0) {
              return {
                text: filterOpt[0][textField],
                value: filterOpt[0][valueField],
              };
            }
          }
          if (this.globalOptions[optionsName]) {
            return this.globalOptions[optionsName].get(value);
          }
          return value;
        },
      },
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
