const UrlGenerator = require('./url-generator');
const ApiManager = require('./api-manager');
const { ValidatorCast } = require('./validator-cast');

module.exports = {
  guid: require('./guid.js'),
  format: require('./format'),
  logger: require('./logger'),
  datetime: require('./datetime'),
  object: require('./object'),
  number: require('./number'),
  common: require('./common'),
  mask: require('./mask'),
  filter: require('./filter'),
  validatorCaster: new ValidatorCast(),
  UrlGenerator,
  ApiManager,
  url: new UrlGenerator()
};
