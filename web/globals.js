import { translate } from '../web/utils/translate';
export const CONSTANTS = {
  STATUS: {
    SUCCESS: 'success',
    ERROR: 'error',
    OK: 'ok',
  },
};

export class GlobalOptions {
  constructor(options) {
    this.opts = Object.assign({}, options);
    this.keys = {};
    Object.keys(this.opts).forEach((key) => {
      if (typeof this.opts[key] === 'object' && this.opts[key].key) {
        this.keys[key] = this.opts[key].key;
      } else {
        this.keys[key] = key;
      }
    });
  }

  get(key) {
    return this.opts[key] || {};
  }

  getProp(key, name) {
    if (typeof this.opts[key] === 'object') {
      return this.opts[key][name];
    } else {
      return this.opts[key];
    }
  }

  getText(key) {
    if (typeof this.opts[key] === 'object') {
      return this.opts[key].text;
    } else {
      return this.opts[key];
    }
  }

  fromData(data, { valueField = 'value' } = {}) {
    const values = (data || []).map((i) => i[valueField]);
    return this.toArray()
      .filter((i) => values.indexOf(i.value) > -1)
      .map((item) => {
        const dataItem = data.filter(
          (innerItem) => innerItem[valueField] === item.value
        )[0];
        return {
          ...item,
          ...dataItem,
        };
      });
  }

  toArray({ sortBy, sortOrder = 'asc' } = {}) {
    let result = Object.keys(this.opts).map((key) => {
      let {
        text,
        key: overrideKey,
        ...rest
      } = typeof this.opts[key] === 'string'
        ? { text: this.opts[key] }
        : this.opts[key];
      return {
        value: overrideKey || key,
        text: translate(text || this.getText(key)),
        ...rest,
      };
    });
    if (sortBy) {
      result = result.sort((a, b) => {
        if (a[sortBy]?.toLowerCase() > b[sortBy].toLowerCase()) {
          return sortOrder === 'asc' ? 1 : -1;
        } else if (a[sortBy] < b[sortBy]) {
          return sortOrder === 'asc' ? -1 : 1;
        } else {
          return 0;
        }
      });
    }
    return result;
  }
}

export const GLOBAL_OPTIONS = {
  inputVariant: new GlobalOptions({
    outlined: 'Outlined',
    standard: 'Standard',
  }),
  headerTags: new GlobalOptions({
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    h4: 'H4',
    h5: 'H5',
    h6: 'H6',
  }),
  headerStyles: new GlobalOptions({
    'sq-header--center': 'sq-header--center',
    'sq-header--left': 'sq-header--left',
    'mb-narrow': 'Margin bottom narrow',
    'mb-wide': 'Margin bottom wide',
    'mb-none': 'Margin bottom none',
  }),
  formStyles: new GlobalOptions({
    'sq-form--2-cols': '2 Columns',
    'sq-form--3-cols': '3 Columns',
    'sq-form--inline-auto': 'Inline Auto',
    'sq-form--narrow-space': 'Narrow Space',
    'pb-none': 'No Padding bottom',
  }),
  salutation: new GlobalOptions({
    'Mr.': 'Mr.',
    'Mrs.': 'Mrs.',
    'Miss.': 'Miss',
  }),
};
