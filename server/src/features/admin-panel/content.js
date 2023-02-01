const Response = require('../../Response');
const { path } = require('../../utils');

module.exports = ({ context } = {}) => {
  context.router.post('/content/page', function (req, res) {
    context.contentRepo
      .checkExists(
        { path: path.ensureNoSlashAtEnd(req.body.path.toLowerCase()) },
        ['path']
      )
      .then(() => {
        context.contentRepo
          .create(req.body)
          .then((result) => {
            res.json(new Response(result).json());
          })
          .catch((ex) => context.handleError(ex, res));
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/content/meta', function (req, res) {
    context.contentRepo
      .getMeta()
      .then((result) => {
        res.json(new Response(result).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.patch('/content/page', function (req, res) {
    context.contentRepo
      .saveDraft(req.body)
      .then((result) => {
        res.json(new Response(result).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/content/page/get', function (req, res) {
    context.contentRepo
      .getByPath(req.body.path)
      .then((result) => {
        res.json(new Response(result).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/content/page/gettree', function (req, res) {
    context.contentRepo
      .getAllTreeNodes(req.body.path)
      .then((result) => {
        res.json(new Response(result).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/content/page/getbypath', function (req, res) {
    context.contentRepo
      .getAllPages(req.body.parentPath)
      .then((result) => {
        res.json(
          new Response({
            pages: result,
          }).json()
        );
      })
      .catch((ex) => context.handleError(ex, res));
  });
};
