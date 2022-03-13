var fs = require('fs');
require.extensions['.html'] = function (module, filename) {
  module.exports = fs.readFileSync(filename, 'utf8');
};
const chai = require('chai');
const chaiHttp = require('chai-http');
const moment = require('moment');
const spies = require('chai-spies');
var chaiAsPromised = require('chai-as-promised');
const { utils } = require('../server');
const fakeDb = require('./mocks/fake-db');
const mocks = require('./mocks');

chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.use(spies);

module.exports = {
  chai,
  fakeDb,
  mocks,
  logger: utils.logger,
  moment,
  utils
};
