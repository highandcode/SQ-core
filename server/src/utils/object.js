var common = require('./common');
var { getFormatters } = require('./format');

var object = {
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
      value = !common.isNullOrUndefined(value) && !common.isNullOrUndefined(value[nestedKey]) ? value[nestedKey] : defaultValue;
    });
    return value;
  },
  processMessage: (html, data, options = {}) => {
    const { removePrefix = '' } = options;
    const allFormatters = getFormatters();
    const dataToProcess = data;
    if (html && typeof html === 'string') {
      const arrayKeys = html.match(/##([^(##)])*##/g);
      arrayKeys &&
        arrayKeys.forEach((key) => {
          let exactKey = key.replace(/##/g, '').replace(removePrefix, '');
          let fnToCall;
          if (exactKey.indexOf('|') > -1) {
            fnToCall = exactKey.substr(0, exactKey.indexOf('|'));
            exactKey = exactKey.substr(exactKey.indexOf('|') + 1);
          }
          const textOutput =
            typeof dataToProcess[exactKey] === 'function' ? dataToProcess[exactKey](data) : object.getDataFromKey(dataToProcess, exactKey);
          let value = object.processMessage(textOutput, data, options);
          if (fnToCall && allFormatters[fnToCall]) {
            value = allFormatters[fnToCall](value);
          }
          html = html.replace(new RegExp(key.replace('|', '\\|'), 'g'), value);
        });
    }
    return common.isNullOrUndefined(html) ? '' : html;
  }
};

module.exports = object;
