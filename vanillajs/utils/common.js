const common = {
  toStringBlank: (val) => {
    return !common.isNullOrUndefined(val) ? val : '';
  },
  isNullOrUndefined: (value) => {
    return value === undefined || value === null;
  },
  isNullOrUndefinedBlank: (value) => {
    return commons.isNullOrUndefined(value) || value === '';
  }
};
export default common;
