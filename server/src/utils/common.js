const commons = {
  isNullOrUndefined: (value) => {
    return value === undefined || value === null;
  },
  isNullOrUndefinedBlank: (value) => {
    return commons.isNullOrUndefined(value) || value === '';
  },
  getValue : (context, value, ...args) => {
    if (typeof value === 'function') {
      return value.apply(context, args);
    }
    return value || '';
  }
};

module.exports = commons
