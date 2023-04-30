const BaseRepository = require('../BaseRepository');
const constants = require('../constants');
const Error = require('../Error');
const { datetime, path } = require('../utils');

class EmailTemplateRepository extends BaseRepository {
  constructor(options) {
    super({
      ...options,
      collection: 'emailTemplates',
    });
  }

  async create(params) {
    return this.insert({
      ...params,
      active: true,
      createdOn: new Date(),
    });
  }
}

module.exports = EmailTemplateRepository;
