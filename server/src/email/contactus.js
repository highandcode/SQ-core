const { importFile } = require('./import-html');
var html = importFile('templates/contactus.html');
const helpers = require('./helpers');

module.exports = (data) => {
  const outputHtml = helpers.processBody(html, data);
  return {
    subject: `${data.product.name}: ${data.subject}`,
    body: outputHtml
  };
};
