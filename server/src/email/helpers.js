const utils = require('../utils');

let dataItems = {
  HEADER: require('./parts/header.html'),
  FOOTER: require('./parts/footer.html'),
  STYLES: require('./parts/styles.html')
};

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
        const textOutput = typeof dataToProcess[exactKey] === 'function' ? dataToProcess[exactKey](data) : utils.object.getDataFromKey(dataToProcess, exactKey);
        html = html.replace(new RegExp(key, 'g'), processBody(textOutput, data));
      });
  }
  return utils.common.isNullOrUndefined(html) ? '' : html;
}

module.exports = {
  processBody,
  setDataItems
};
