const { MailRepository, setTemplates } = require('../repositories/MailRepository');
const Response = require('../Response');
var express = require('express');
var router = express.Router();

class Contact {
  constructor({ ...config } = {}) {
    this.config = config;
    this.mailRepo = new MailRepository(config);
  }

  get() {
    var that = this;
    return function (bridge) {
      router.post('/message', function (req, res) {
        that.mailRepo.sendEmail('contactus', that.config.email.messageBox, req.body);
        res.json(new Response({}).json());
      });
      return router;
    };
  }
}

module.exports = { Contact, setTemplates };
