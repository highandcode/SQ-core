var common = require('./common');

module.exports = {
  clone: function (obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  getDataFromKey: function (data, key, defaultValue = '') {
    if (!common.isNullOrUndefined(data[key])) {
      return data[key];
    }
    const allItems = key.split('.');
    let value = data;
    allItems.forEach((nestedKey) => {
      value = !common.isNullOrUndefined(value) ? value[nestedKey] : defaultValue;
    });
    return value;
  }
};
