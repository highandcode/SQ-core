module.exports = {
  domain: {
    BaseEntity: require('./src/BaseEntity'),
    BaseEntityCollection: require('./src/BaseEntityCollection'),
    BaseRepository: require('./src/BaseRepository'),
  },
  dataLayer: {
    Collection: require('./src/datalayer/collection'),
    DynamoCollection: require('./src/datalayer/dynamo-collection'),
  },
  email: require('./src/email'),
  utils: require('./src/utils'),
  Error: require('./src/Error'),
  Response: require('./src/Response'),
  repositories: {
    MailRepository: require('./src/repositories/MailRepository'),
  },
  features: require('./src/features'),
  lib: require('./src/lib'),
};
