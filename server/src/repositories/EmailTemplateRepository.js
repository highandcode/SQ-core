const BaseRepository = require('../BaseRepository');
const constants = require('../constants');
const Error = require('../Error');
const helpers = require('../email/helpers');
const { datetime, path } = require('../utils');

class EmailTemplateRepository extends BaseRepository {
  constructor({ mailRepo, ...options } = {}) {
    super({
      ...options,
      collection: 'emailTemplates',
    });
    this.mailRepo = mailRepo;
  }

  async create(params) {
    return this.insert({
      ...params,
      active: true,
      createdOn: new Date(),
    });
  }

  async sendEmail(template, data, to) {
    const outputTemplate = await this.findOne({ name: template, active: true });
    if (outputTemplate) {
      let message = {};
      message.subject = helpers.processBody(outputTemplate.subject, data);
      message.html = helpers.processBody(outputTemplate.body, data);
      message.from = `${outputTemplate.fromName} <${outputTemplate.from}>`;
      message.to = to;
      message.cc = outputTemplate.emailCc;
      message.bcc = outputTemplate.emailBCc;
      return this.mailRepo.sendEmailMessage(message);
    } else {
      throw Error.notfound();
    }
  }
}

module.exports = EmailTemplateRepository;
