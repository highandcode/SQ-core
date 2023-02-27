const Response = require('../../Response');
var tokenManager = require('../../tokenManager');
var settings = require('../../settings').getSettings();
module.exports = ({ context } = {}) => {
  context.router.post('/users/all', function (req, res) {
    context.userRepo
      .getAll()
      .then((result) => {
        res.json(
          new Response({
            data: result,
          }).json()
        );
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/users/search', function (req, res) {
    context.userRepo
      .search(req.body, req.query)
      .then((result) => {
        res.json(new Response(result).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.get('/users/role', function (req, res) {
    res.json(
      new Response([
        {
          name: 'Admin',
          code: 'ADMIN',
        },
        {
          name: 'Client',
          code: 'CLIENT',
        },
      ]).json()
    );
    // context.userRepo
    //   .search(req.body, req.query)
    //   .then((result) => {

    //   })
    //   .catch((ex) => context.handleError(ex, res));
  });
  context.router.get('/user/info', function (req, res) {
    context.userRepo
      .getUserById(req.session.userData.uid)
      .then(function (user) {
        context.userPrefRepo
          .getByUser(req.session.userData.uid)
          .then(function (preference) {
            res.json(
              new Response({
                userInfo: {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  roles: user.roles,
                  email: user.email,
                  uid: user.uid,
                  phone: user.phone,
                },
                preference: preference.toObject(),
              }).json()
            );
          });
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/login', function (req, res) {
    context.userRepo
      .validate(req.body.email, req.body.password)
      .then((validResponse) => {
        if (validResponse.loginStatus === 'ok') {
          const user = validResponse.user;
          req.session.userData = user;
          var infoToStore = context.userRepo.info(user);
          var token = tokenManager.encrypt(infoToStore);
          res.cookie(settings.cookie.tokenKey, token, {
            maxAge: settings.cookie.maxAge,
          });
          res.cookie(settings.cookie.checkLoginKey, 'true', {
            maxAge: settings.cookie.maxAge,
          });
          res.json(
            new Response({
              userInfo: infoToStore,
              token: token,
            }).json()
          );
        } else if (validResponse.loginStatus === 'otp') {
          req.session.tempUser = validResponse.user;
          req.session.tempUserId = validResponse.user.uid;
          context.otpRepo
            .generate(validResponse.source, validResponse.user.uid)
            .then((response) => {
              res.json(
                new Response({
                  loginStatus: validResponse.loginStatus,
                  source: validResponse.source,
                  requestId: response.requestId,
                  email: response.email,
                  phone: response.phone,
                }).json()
              );
            })
            .catch((ex) => context.handleError(ex, res));
        }
      })
      .catch((ex) => context.handleError(ex, res));
  });
  context.router.post('/signup', function (req, res) {
    context.userRepo
      .insertUser(req.body)
      .then((validResponse) => {
        res.json(new Response(validResponse).json());
      })
      .catch((ex) => context.handleError(ex, res));
  });
};
