const Collection = require('../../datalayer/collection');
module.exports = (allModels, db) => {
  return {
    contents: new Collection({ model: allModels.Content, db }),
    users: new Collection({ model: allModels.User, db }),
    userSessions: new Collection({ model: allModels.UserSession, db }),
    userPreferences: new Collection({ model: allModels.UserPreference, db }),
  };
};
