const utils = require('../utils');
const { importFile } = require('./import-html');

let dataItems = {
  HEADER: importFile('./parts/header.html'),
  FOOTER: importFile('./parts/footer.html'),
  STYLES: importFile('./parts/styles.html')
};

function getDataFromKey(data, key) {
  if (!utils.common.isNullOrUndefined(data[key])) {
    return data[key];
  }
  const allItems = key.split('.');
  let value = data;
  allItems.forEach((nestedKey) => {
    value = !utils.common.isNullOrUndefined(value) ? value[nestedKey] : '';
  });
  return value;
}

function setDataItems(newData) {
  dataItems = { ...dataItems, ...newData };
}

function processBody(html, data) {
  var dataToProcess = {
    ...dataItems,
    ...data
  };
  if (html && typeof html === 'string') {
    const arrayKeys = html.match(/##.*##/g);
    arrayKeys &&
      arrayKeys.forEach((key) => {
        const exactKey = key.replace(/##/g, '').replace('data.', '');
        const textOutput = typeof dataToProcess[exactKey] === 'function' ? dataToProcess[exactKey](data) : getDataFromKey(dataToProcess, exactKey);
        html = html.replace(new RegExp(key, 'g'), processBody(textOutput, data));
      });
  }
  return utils.common.isNullOrUndefined(html) ? '' : html;
}

module.exports = {
  processBody,
  setDataItems
};
