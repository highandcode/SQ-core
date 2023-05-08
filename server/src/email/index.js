const { importFile } = require('./import-html');
const helpers = require('./helpers');

let allTemplates = {};
module.exports = {
  templates: () => {
    return allTemplates;
  },
  set: (newTemplates) => {
    allTemplates = {
      ...allTemplates,
      ...newTemplates,
    };
  },
  helpers,
  importFile,
};
