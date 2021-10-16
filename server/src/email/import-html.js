var fs = require('fs');
module.exports = {
  importFile: (path) => {
    return fs.readFileSync(__dirname + '/' + path, 'utf8');
  }
};
