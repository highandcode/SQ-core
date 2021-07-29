export default {
  isNullOrUndefined: (value) => {
    return value === undefined || value === null;
  },
  isNullOrUndefinedBlank: (value) => {
    return commons.isNullOrUndefined(value) || value === '';
  }
};