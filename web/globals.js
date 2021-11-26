import { translate } from '../web/utils/translate';
export const CONSTANTS = {
  STATUS: {
    SUCCESS: 'success',
    ERROR: 'error'
  }
};

export class GlobalOptions {
  constructor(options) {
    this.opts = Object.assign({}, options);
    this.keys = {};
    Object.keys(this.opts).forEach((key) => {
      this.keys[key] = key;
    });
  }

  getText(key) {
    if (typeof this.opts[key] === 'object') {
      return this.opts[key].text;
    } else {
      return this.opts[key];
    }
  }

  toArray() {
    return Object.keys(this.opts).map((key) => {
      let { text, ...rest } = typeof(this.opts[key]) === 'string' ? {text: this.opts[key]} : this.opts[key];
      return {
        value: key,
        text: translate(text || this.opts[key]),
        ...rest
      };
    });
  }
}

export const GLOBAL_OPTIONS = {};
