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
        const dataItem = data.filter((innerItem) => innerItem[valueField] === item.value)[0];
        return {
          ...item,
          ...dataItem,
        };
      });
  }

  toArray({ sortBy, sortOrder = 'asc' } = {}) {
    let result = Object.keys(this.opts).map((key) => {
      let { text, key: overrideKey, ...rest } = typeof this.opts[key] === 'string' ? { text: this.opts[key] } : this.opts[key];
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
  compareOperators: new GlobalOptions({
    '=': '= equals',
    '!=': '!= not equals',
  }),
  headerTags: new GlobalOptions({
    h1: 'H1',
    h2: 'H2',
    h3: 'H3',
    h4: 'H4',
    h5: 'H5',
    h6: 'H6',
  }),
  bodyContainers: new GlobalOptions({
    'body-container-small': 'body-container-small',
    'body-container-med': 'body-container-med',
    'body-container-lg': 'body-container-lg',
    'body-container-xl': 'body-container-xl',
  }),
  linkTypes: new GlobalOptions({
    'Button': 'Button',
    'LinkButton': 'LinkButton',
  }),
  pageWrapperClasses: new GlobalOptions({
    'sq-content-page--full-width': 'sq-content-page--full-width',
    'sq-content-page--header-footer-body': 'sq-content-page--header-footer-body',
  }),
  buttonSize: new GlobalOptions({
    small: 'small',
    medium: 'medium',
    large: 'large',
  }),
  radioDisplay: new GlobalOptions({
    Column: 'Column',
    Inline: 'Inline',
  }),
  headerStyles: new GlobalOptions({
    'sq-header--center': 'sq-header--center',
    'sq-header--left': 'sq-header--left',
    'mb-narrow': 'Margin bottom narrow',
    'mb-wide': 'Margin bottom wide',
    'mb-none': 'Margin bottom none',
  }),
  heroStyles: new GlobalOptions({
    'sq-hero-content--left-aligned': 'sq-hero-content--left-aligned',
    'sq-hero-content--large-background-theme-dark': 'sq-hero-content--large-background-theme-dark',
    'sq-hero-content--bg-black': 'sq-hero-content--bg-black',
  }),
  heroTemplates: new GlobalOptions({
    'without-image': 'without-image',
    default: 'default',
    'with-background': 'with-background',
    'large-background': 'large-background',
  }),
  formStyles: new GlobalOptions({
    'sq-form--2-cols': '2 Columns',
    'sq-form--3-cols': '3 Columns',
    'sq-form--inline-auto': 'Inline Auto',
    'sq-form--narrow-space': 'Narrow Space',
    'pb-none': 'No Padding bottom',
  }),

  genericStyles: new GlobalOptions({
    'mb-wide': 'Margin bottom wide',
    'mt-wide': 'Margin top wide',
    'mb-jumbo': 'Margin bottom jumbo',
    'mt-jumbo': 'Margin top jumbo',
    'mb-none': 'Margin bottom none',
    'mt-none': 'Margin top none',
    'pb-wide': 'Padding bottom wide',
    'pt-wide': 'Padding top wide',
    'pb-none': 'Padding bottom none',
    'pt-none': 'Padding top none',
    'pb-jumbo': 'Padding bottom jumbo',
    'pt-jumbo': 'Padding top jumbo',
    'text-center': 'text-center',
  }),

  htmlTags: new GlobalOptions({
    span: 'span',
    div: 'div',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
    h5: 'h5',
    p: 'p',
  }),
  actionTypes: new GlobalOptions({
    submit: 'submit',
    api: 'api',
    module: 'module',
  }),
  methodTypes: new GlobalOptions({
    get: 'GET',
    post: 'POST',
    patch: 'PATCH',
    update: 'UPDATE',
    delete: 'DELETE',
  }),
  salutation: new GlobalOptions({
    'Mr.': 'Mr.',
    'Mrs.': 'Mrs.',
    'Miss.': 'Miss',
  }),
};
