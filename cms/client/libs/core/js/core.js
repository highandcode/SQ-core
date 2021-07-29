/*!
  * sq-core:cms:core v1.0.0
  * undefined
  * Licence undefined
  * Copyright 2019-2020 Swish Qube
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SQ = factory());
}(this, (function () { 'use strict';

  class SQCore {
    constructor() {}

  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  class QueryString {
    constructor(params) {
      this.input = params;
      this.isString = !!params && typeof params === 'string';
      this.isObject = !!params && typeof params === 'object';
    }

    toString() {
      var str = '';

      if (this.isObject) {
        Object.keys(this.input).forEach(key => {
          if (this.input[key]) {
            str += (str ? '&' : '') + key + '=' + this.input[key];
          }
        });
      }

      return str ? '?' + str : str;
    }

    toObject() {
      var obj = {};

      if (this.isString) {
        const runInput = this.input.substr(this.input.indexOf('?') + 1);
        runInput.split('&').forEach(keyValue => {
          const split = keyValue.split('=');
          obj[split[0]] = split[1];
        });
      }

      return obj;
    }

  }

  var queryString = QueryString;

  const location = window.location;
  const query = {
    get: () => {
      return new queryString(location.search).toObject();
    }
  };

  let history;
  let urlMapping = {};
  const redirectTo = screen => {
    console.log(screen, urlMapping);
    const url = urlMapping[screen];

    if (url) {
      setTimeout(() => {
        history.push(url);
      });
    }
  };

  let languages = {
    en: {
      messages: {}
    }
  }; // window.getLangs = () => {
  //   return languages;
  // }

  const localStorage = window.localStorage;
  let currentLanguage = localStorage.getItem('lang') || 'en';

  const translate = message => {
    // if ((languages[currentLanguage] &&
    //   !languages[currentLanguage].messages[message])) {
    //   languages[currentLanguage].messages[message] = message;
    // }
    return languages[currentLanguage] && languages[currentLanguage].messages[message] || languages.en.messages[message] || message;
  };

  const MESSAGES = {
    'INVALID_CREDENTIALS': 'Username or Password doesn\'t match.',
    'UNEXPECTED_ERROR': 'Oops something went wrong.',
    'EMAIL_NOT_VERIFIED': 'Opps looks like your email is not verified. Please check your inbox and verify your email.'
  };
  const messages = {
    get: key => {
      return translate(MESSAGES[key]);
    }
  };

  class EventManager {
    constructor() {
      this.events = {};
    }

    subscribe(evtName, fn) {
      if (!this.events[evtName]) {
        this.events[evtName] = [];
      }

      this.events[evtName].push(fn);
    }

    unsubscribe(evtName, fn) {
      if (this.events[evtName] && fn) {
        const idx = this.events[evtName].indexOf(fn);

        if (idx > -1) {
          this.events[evtName].splice(idx, 1);
        }
      } else if (this.events[evtName]) {
        delete this.events[evtName];
      }
    }

    emmit(evtName, ...params) {
      if (this.events[evtName]) {
        this.events[evtName].forEach(fn => {
          fn.apply(this, params);
        });
      }
    }

  }

  var defaultHeaders = {
    "Content-Type": "application/json"
  };
  class ApiBridge {
    constructor() {
      this.events = new EventManager();
    }

    getPrefix() {
      return window.API_SERVER || '';
    }

    get(url, params, headers = {}) {
      return fetch(this.getPrefix() + url + new queryString(params).toString(), {
        method: 'GET',
        headers: _objectSpread2(_objectSpread2({}, defaultHeaders), headers)
      }).then(checkStatus).then(parseJSON).then(messageParser).then(responseReader.bind(this));
    }

    post(url, body, headers = {}) {
      return fetch(this.getPrefix() + url, {
        method: 'POST',
        headers: _objectSpread2(_objectSpread2({}, defaultHeaders), headers),
        body: JSON.stringify(body)
      }).then(checkStatus).then(parseJSON).then(messageParser).then(responseReader.bind(this));
    }

    update(url, body, headers = {}) {
      return fetch(this.getPrefix() + url, {
        method: 'PUT',
        headers: _objectSpread2(_objectSpread2({}, defaultHeaders), headers),
        body: JSON.stringify(body)
      }).then(checkStatus).then(parseJSON).then(messageParser).then(responseReader.bind(this));
    }

    delete(url, body, headers = {}) {
      return fetch(this.getPrefix() + url, {
        method: 'DELETE',
        headers: _objectSpread2(_objectSpread2({}, defaultHeaders), headers),
        body: JSON.stringify(body)
      }).then(checkStatus).then(parseJSON).then(messageParser).then(responseReader.bind(this));
    }

  }

  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else if (response.status === 401) {
      return response;
    } else if (response.status === 403) {
      redirectTo('login');
      return {
        code: response.status,
        error: true,
        response,
        errorText: response.statusText
      };
    } else if (response.status === 400) {
      return response;
    } else if (response.status === 500) {
      return {
        code: response.status,
        status: API_STATUS.UNNKOWN,
        error: {
          message: 'Unexpected error',
          key: 'UNEXPECTED_ERROR'
        }
      };
    } else {
      return new Promise(function (resolve) {
        resolve({
          error: true,
          code: response.status,
          status: API_STATUS.UNNKOWN,
          error: {
            message: response.statusText,
            key: 'UNEXPECTED_ERROR'
          }
        });
      });
    }
  }

  function parseJSON(response) {
    if (response && !response.error) {
      return response.json();
    } else {
      return response;
    }
  }

  function responseReader(response) {
    switch (response.status) {
      case API_STATUS.SUCCESS:
      case API_STATUS.ERROR:
        return response;

      case API_STATUS.UNNKOWN:
        this.events.emit('onUnRecognizedError', response);

      default:
        return _objectSpread2({}, response);
    }
  }

  function messageParser(response) {
    if (response.error) {
      if (response.error.key && messages.get(response.error.key)) {
        response.error.message = messages.get(response.error.key);
      }

      if (response.error.errors) {
        Object.keys(response.error.errors).forEach(errorField => {
          if (response.error.errors[errorField].key && messages.get(response.error.errors[errorField].key)) {
            response.error.errors[errorField].message = messages.get(response.error.errors[errorField].key);
          }
        });
      }
    }

    return response;
  }

  var apiBridge = new ApiBridge();
  const API_STATUS = {
    SUCCESS: 'success',
    ERROR: 'error',
    UNNKOWN: 'unknown'
  };

  SQCore.api = apiBridge;

  SQCore.url = {
    query,
    QueryString: queryString
  };

  return SQCore;

})));
