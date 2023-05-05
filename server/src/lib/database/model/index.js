module.exports = function (conn) {
  return {
    AdminDBVersion: require('./admin-db-version')(conn),
    Content: require('./content')(conn),
    User: require('./user')(conn),
    EmailTemplate: require('./email-template')(conn),
    UserPreference: require('./user-preference')(conn),
    UserSession: require('./user-session')(conn),
  };
};
