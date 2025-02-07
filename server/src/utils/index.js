const UrlGenerator = require('./url-generator');
const ApiManager = require('./api-manager');
const validator = require('./validator');
const timer = require('./timer');
const { ValidatorCast } = require('./validator-cast');
const { GlobalOptions } = require('./global-options');
const { ParamsValidator } = require('./params-validator');

require('./special-validators')(validator);

module.exports = {
  guid: require('./guid.js'),
  format: require('./format'),
  logger: require('./logger'),
  datetime: require('./datetime'),
  object: require('./object'),
  number: require('./number'),
  common: require('./common'),
  path: require('./path'),
  mask: require('./mask'),
  filter: require('./filter'),
  GlobalOptions,
  validatorCaster: new ValidatorCast(),
  UrlGenerator,
  validator,
  timer,
  ApiManager,
  ParamsValidator,
  url: new UrlGenerator()
};
