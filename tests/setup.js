const chai = require('chai');
const chaiHttp = require('chai-http');
const spies = require('chai-spies');
var chaiAsPromised = require('chai-as-promised');
const logger = require('../server/src/utils/logger');
const utils = require('../server/src/utils');
const fakeDb = require('./mocks/fake-db');
const mocks = require('./mocks');

chai.use(chaiHttp);
chai.use(chaiAsPromised);
chai.use(spies);

module.exports = {
  chai,
  fakeDb,
  mocks,
  logger,
  utils
};
