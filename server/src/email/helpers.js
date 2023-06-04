const object = require('../utils/object');

let dataItems = {
  // HEADER: require('./parts/header.html'),
  // FOOTER: require('./parts/footer.html'),
  // STYLES: require('./parts/styles.html')
};

function setDataItems(newData) {
  dataItems = { ...dataItems, ...newData };
}

function processBody(html, data) {
  var dataToProcess = {
    ...dataItems,
    ...data
  };
  return object.processMessage(html, dataToProcess, { removePrefix: 'data.' });
}

module.exports = {
  processBody,
  setDataItems
};
