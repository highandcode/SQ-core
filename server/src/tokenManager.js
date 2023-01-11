var jwt = require('jsonwebtoken');
var config = require('./settings').getSettings();

module.exports = {
  encrypt: function (payload) {
    return jwt.sign(payload, config.jwt.secretKey, {
      expiresIn: config.session.timeout,
    });
  },
  decrypt: function (token) {
    return jwt.verify(token, config.jwt.secretKey);
  },
  encryptEmailToken: function (payload) {
    return jwt.sign(payload, config.jwt.emailSecretKey, {
      expiresIn: config.session.emailTokenTimeout,
    });
  },
  decryptEmailToken: function (token) {
    return jwt.verify(token, config.jwt.emailSecretKey);
  },
};
