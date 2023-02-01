const { ContentRepository } = require('../../repositories/ContentRepository');
const UserRepository = require('../../repositories/UserRepository');
const UserSessionRepository = require('../../repositories/UserSessionRepository');
const UserPreferenceRepository = require('../../repositories/UserPreferenceRepository');
const Response = require('../../Response');
var express = require('express');
var router = express.Router();
var utils = require('../../utils');
var settings = require('../../settings').getSettings();
var tokenManager = require('../../tokenManager');
var contentApi = require('./content');
var moduleApi = require('./module');

const { logger } = utils;

class AdminPanel {
  constructor({ router: m_router, ...config } = {}) {
    this.config = config;
    this.router = m_router || router;
    this.contentRepo = new ContentRepository(config);
    this.userRepo = new UserRepository(config);
    this.userSessionRepo = new UserSessionRepository(config);
    this.userPrefRepo = new UserPreferenceRepository(config);
  }

  handleError(ex, res) {
    console.log(ex);
    res.status(ex.code || 500).send(new Response(ex).error());
  }

  get() {
    var that = this;
    return {
      '/admin': function (bridge) {
        /* content api  */
        contentApi({ context: that });

        /*module api */
        moduleApi({ context: that });
       
        that.router.post('/users/all', function (req, res) {
          that.userRepo
            .getAll()
            .then((result) => {
              res.json(
                new Response({
                  users: result,
                }).json()
              );
            })
            .catch((ex) => that.handleError(ex, res));
        });
        that.router.get('/user/info', function (req, res) {
          that.userRepo
            .getUserById(req.session.userData.uid)
            .then(function (user) {
              that.userPrefRepo
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
            .catch((ex) => that.handleError(ex, res));
        });
        that.router.post('/login', function (req, res) {
          that.userRepo
            .validate(req.body.email, req.body.password)
            .then((validResponse) => {
              if (validResponse.loginStatus === 'ok') {
                const user = validResponse.user;
                req.session.userData = user;
                var infoToStore = that.userRepo.info(user);
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
                that.otpRepo
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
                  .catch((ex) => that.handleError(ex, res));
              }
            })
            .catch((ex) => that.handleError(ex, res));
        });
        that.router.post('/signup', function (req, res) {
          that.userRepo
            .insertUser(req.body)
            .then((validResponse) => {
              res.json(new Response(validResponse).json());
            })
            .catch((ex) => that.handleError(ex, res));
        });
        return router;
      },
    };
  }
}
const middleware = () => {
  return function (req, res, next) {
    var isFeatureAdmin = false;
    var isPublic = false;
    var tokenValidated = false;
    var websettings = settings;

    logger.log('Admin Middleware:' + req.method + req.originalUrl);
    websettings.api?.admin?.forEach(function (urlReg) {
      logger.log(
        'Admin Middleware:checking for admin api:' + req.originalUrl,
        ' -> ',
        urlReg
      );
      if (req.originalUrl.match(urlReg)) {
        logger.log(
          'Admin Middleware:match found for admin api:' + req.originalUrl,
          ' -> ',
          urlReg
        );
        isFeatureAdmin = true;
      }
    });
    websettings.api?.adminPublic?.forEach(function (urlReg) {
      logger.log(
        'Admin Middleware:checking for public api:' + req.originalUrl,
        ' -> ',
        urlReg
      );
      if (req.originalUrl.match(urlReg)) {
        logger.log(
          'Admin Middleware:match found for public api:' + req.originalUrl,
          ' -> ',
          urlReg
        );
        isPublic = true;
      }
    });
    let validations = {};
    if (websettings.apiValidationRules) {
      const validator = new utils.ParamsValidator({
        originalUrl: req.originalUrl,
        beforeUrl: (url) => websettings.url.getUrl(url),
        method: req.method,
        body: req.body,
        rules: websettings.apiValidationRules,
      });
      validations = validator.validate();
    }

    const tokenValue =
      req.cookies[websettings.cookie.tokenKey] ||
      req.headers[websettings.cookie.tokenKey];

    if (!isPublic && isFeatureAdmin && tokenValue) {
      logger.log('Token:' + tokenValue);
      try {
        var info = tokenManager.decrypt(tokenValue);
        tokenValidated = true;
        logger.log('Admin Middleware:Token validated');
      } catch (err) {
        req.session.userData = null;
      }
      if (info) {
        req.session.userData = info;
      }
    }

    if (!isPublic && isFeatureAdmin && tokenValidated) {
      if (req.session.userData.roles?.indexOf('admin') > -1) {
        if (Object.keys(validations).length > 0) {
          logger.log('Admin Middleware:url parameter validations failed:');
          res.status(400).send(
            new Response({
              code: 400,
              errors: validations,
            }).error()
          );
          return false;
        } else {
          // setTimeout(function () {
          next();
          return true;
          // }, 2000);
        }
      } else {
        logger.log('Admin Middleware:no access:');
        res.status(400).send(
          new Response({
            code: 400,
            key: 'INSUFFICIENT_PERMISSION',
            message: 'no permission',
          }).error()
        );
        return false;
      }
    } else if (isFeatureAdmin) {
      if (!isPublic) {
        logger.log('Admin Middleware:invalidate session:');
        res.status(403).send(
          new Response({
            code: 403,
            key: 'NOT_LOGGED_IN',
            message: 'not logged in',
          }).error()
        );
        return false;
      } else {
        next();
        return true;
      }
    }
  };
};
module.exports = { AdminPanel, middleware };
