const fs = require('fs');
const m_nodemailer = require('nodemailer');
const { templates, set } = require('../email');
const datetime = require('../utils/datetime');

class MailRepository {
  constructor({ ...options } = {}) {
    const { nodemailer = m_nodemailer, ...config } = options;
    this.config = config;
    this.nodemailer = nodemailer;
    this.customParams = config.customParams || (() => ({}));
    this.init();
  }

  init() {
    this.transport = this.nodemailer.createTransport({
      ...this.config.smtpSettings
    });
  }

  templates(name, data) {
    const template = templates()[name];
    if (template) {
      return template({
        ...this.config.server,
        product: this.config.product,
        ...this.customParams(),
        ...data
      });
    }
    return null;
  }

  sendEmail(template, to, data) {
    const message = this.templates(template, data);
    const fromEmail = message.from || this.config.email.defaultFrom;
    if (message.fromName) {
      message.from = `${message.fromName} <${fromEmail}>`;
    } else {
      message.from = `${this.config.email.defaultFromName} <${fromEmail}>`;
    }

    if (message && this.config.email.enabled) {
      return this.send(message.from, to, message.subject, message.body);
    }
    if (this.config.email.loggerEnabled && this.config.email.loggerPath) {
      const dirPath = `${this.config.email.loggerPath}/${to}`;
      if (!fs.existsSync(this.config.email.loggerPath)) {
        fs.mkdirSync(this.config.email.loggerPath);
      }
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }
      fs.writeFile(`${dirPath}/email-${datetime.now().toString('YYYY-MM-DD-hh_mm_ss')}.html`, message.body, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    }
  }

  send(from, to, subject, body) {
    const message = {
      from,
      to,
      subject,
      html: body
    };
    return new Promise((resolve, reject) => {
      this.transport.sendMail(message, function (err, info) {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  }
}

module.exports = {
  MailRepository,
  setTemplates: set
};
