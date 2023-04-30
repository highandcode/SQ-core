const Response = require('../../Response');
const { path } = require('../../utils');

module.exports = ({ context } = {}) => {
  context.router.post('/emailtemplate/search', function (req, res) {
    context.emailTemplateRepo
      .search(req.body, req.query)
      .then((result) => {
        res.json(new Response(result).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/emailtemplate/get', function (req, res) {
    context.emailTemplateRepo
      .findOne(req.body)
      .then((result) => {
        res.json(new Response(result).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/emailtemplate', function (req, res) {
    context.emailTemplateRepo
      .create(req.body)
      .then((result) => {
        res.json(new Response(result).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
};
