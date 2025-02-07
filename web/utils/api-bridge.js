import { QueryString } from './query-string';
import { messages } from './error-messages';
import EventManager from './event-manager';
import { CONSTANTS } from '../globals';
import { redirectTo } from './redirect';

let CODES = {
  UNAUTHORIZE_CODE: 403,
  LOGIN_FAILED: 401,
  BAD_REQUEST: 400,
  GENERIC_ERROR: 500,
  NOT_FOUND: 404,
};

const setErrorCodes = (newCodes) => {
  CODES = {
    ...CODES,
    ...newCodes,
  };
};

let responseParsers = {};

const addParsers = (newParsers) => {
  responseParsers = {
    ...responseParsers,
    ...newParsers,
  };
};

const getParsers = () => responseParsers;

var defaultHeaders = {
  'Content-Type': 'application/json',
};

export class ApiBridge {
  constructor() {
    this.reset();
  }

  reset() {
    this.events = new EventManager();
    this.headers = {};
  }

  addHeader(name, value) {
    this.headers[name] = value;
  }

  removeHeader(name) {
    delete this.headers[name];
  }

  getCustomHeaders() {
    var url = window.location != window.parent.location ? document.referrer : document.location.href;
    var accesstore = document.location.ancestorOrigins && document.location.ancestorOrigins[0];
    return {
      'x-referer': accesstore || url,
      ...this.headers,
    };
  }

  getPrefix(data) {
    const result = this.events.emit('onPrefix', data);
    return result || window.API_SERVER || '';
  }

  handleCatch(ex) {
    const response = {
      status: 'error',
      error: {
        message: ex?.toString(),
        stack: ex.stack?.toString(),
      },
    };
    this.events.emit('onUnRecognizedError', response);
    return response;
  }

  get(url, params, headers = {}, query = {}, { plain = false } = {}) {
    const promisObj = fetch(this.getPrefix({ url, body: params }) + encodeURI(url) + new QueryString({ ...params, ...query }).toString(), {
      method: 'GET',
      headers: {
        ...defaultHeaders,
        ...this.getCustomHeaders(),
        ...headers,
      },
    });
    if (plain) {
      return promisObj;
    }
    return promisObj.then(checkStatus.bind(this)).then(parseJSON).then(processCustomParser.bind(this)).then(messageParser).then(responseReader.bind(this)).catch(this.handleCatch.bind(this));
  }

  rawPost(url, body, headers = {}, query = {}, { method = 'POST', plain = false } = {}) {
    const promisObj = fetch(this.getPrefix({ url, body }) + encodeURI(url) + new QueryString(query).toString(), {
      method: method,
      headers: {
        ...this.getCustomHeaders(),
        ...headers,
      },
      body: body,
    });
    if (plain) {
      return promisObj;
    }
    return promisObj.then(checkStatus.bind(this)).then(parseJSON).then(processCustomParser.bind(this)).then(messageParser).then(responseReader.bind(this)).catch(this.handleCatch.bind(this));
  }

  post(url, body, headers = {}, query = {}, { plain = false } = {}) {
    const promisObj = fetch(this.getPrefix({ url, body }) + encodeURI(url) + new QueryString(query).toString(), {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...this.getCustomHeaders(),
        ...headers,
      },
      body: JSON.stringify(body),
    });
    if (plain) {
      return promisObj;
    }
    return promisObj.then(checkStatus.bind(this)).then(parseJSON).then(processCustomParser.bind(this)).then(messageParser).then(responseReader.bind(this)).catch(this.handleCatch.bind(this));
  }

  update(url, body, headers = {}, query = {}, { plain = false } = {}) {
    const promisObj = fetch(this.getPrefix({ url, body }) + encodeURI(url) + new QueryString(query).toString(), {
      method: 'PUT',
      headers: {
        ...defaultHeaders,
        ...this.getCustomHeaders(),
        ...headers,
      },
      body: JSON.stringify(body),
    });
    if (plain) {
      return promisObj;
    }
    return promisObj.then(checkStatus.bind(this)).then(parseJSON).then(processCustomParser.bind(this)).then(messageParser).then(responseReader.bind(this)).catch(this.handleCatch.bind(this));
  }

  patch(url, body, headers = {}, query = {}, { plain = false } = {}) {
    const promisObj = fetch(this.getPrefix({ url, body }) + encodeURI(url) + new QueryString(query).toString(), {
      method: 'PATCH',
      headers: {
        ...defaultHeaders,
        ...this.getCustomHeaders(),
        ...headers,
      },
      body: JSON.stringify(body),
    });
    if (plain) {
      return promisObj;
    }
    return promisObj.then(checkStatus.bind(this)).then(parseJSON).then(processCustomParser.bind(this)).then(messageParser).then(responseReader.bind(this)).catch(this.handleCatch.bind(this));
  }

  delete(url, body, headers = {}, query, { plain = false } = {}) {
    const promisObj = fetch(this.getPrefix({ url, body }) + encodeURI(url) + new QueryString(query).toString(), {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        ...this.getCustomHeaders(),
        ...headers,
      },
      body: JSON.stringify(body),
    });
    if (plain) {
      return promisObj;
    }
    return promisObj.then(checkStatus.bind(this)).then(parseJSON).then(processCustomParser.bind(this)).then(messageParser).then(responseReader.bind(this)).catch(this.handleCatch.bind(this));
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === CODES.LOGIN_FAILED) {
    return response;
  } else if (response.status === CODES.UNAUTHORIZE_CODE) {
    this.events.emit('onUnauthroized', response);
    return response;
  } else if (response.status === CODES.BAD_REQUEST) {
    return response;
  } else if (response.status === CODES.GENERIC_ERROR) {
    return {
      code: response.status,
      status: CONSTANTS.STATUS.UNNKOWN,
      error: {
        message: 'Unexpected error',
        key: 'UNEXPECTED_ERROR',
      },
    };
  } else if (response.status === CODES.NOT_FOUND) {
    return {
      code: response.status,
      status: CONSTANTS.STATUS.UNKNOWN,
      error: {
        message: 'Page not found',
        key: 'NOT_FOUND',
      },
    };
  } else {
    return new Promise(function (resolve) {
      resolve({
        code: response.status,
        status: CONSTANTS.STATUS.SUCCESS,
        ...(response?.data || {})
      });
    });
  }
}

function parseJSON(response) {
  if (response && !response.error) {
    let resp = {};
    try {
      resp = response.json();
    } catch (ex) {
      resp = {
        error: response || {},
      };
    }
    return resp;
  } else {
    return response;
  }
}
function responseReader(response) {
  switch (response.status) {
    case CONSTANTS.STATUS.SUCCESS:
      return response;
    case CONSTANTS.STATUS.ERROR:
      switch (response.error?.handler) {
        case 'REDIRECT':
          response.error.redirectUrl && redirectTo(response.error.redirectUrl);
          break;
        case 'POPUP':
          this.events.emit('onErrorPopup', response);
          break;
        case 'CUSTOM':
          this.events.emit('onCustomError', response);
          break;
        default:
          break;
      }
      return response;
    case CONSTANTS.STATUS.UNNKOWN:
      this.events.emit('onUnRecognizedError', response);
    default:
      return response;
  }
}

function processCustomParser(response) {
  const parser = response.parser || 'default';
  let newResult;
  if (responseParsers[parser]) {
    newResult = responseParsers[parser].call(this, response);
  }
  return newResult || response;
}

function messageParser(response) {
  if (response?.error?.key && messages.get(response.error.key)) {
    response.error.message = messages.get(response.error.key);
    response.error.errorMessage = messages.get(response.error.key);
  }
  if (response?.errors) {
    Object.keys(response.errors).forEach((errorField) => {
      if (response.errors[errorField].errors) {
        messageParser(response.errors[errorField]);
      }
      if (response.errors[errorField].key && messages.get(response.errors[errorField].key)) {
        response.errors[errorField].message = messages.get(response.errors[errorField].key);
        response.errors[errorField].errorMessage = messages.get(response.errors[errorField].key);
      }
    });
  }
  if (response?.error?.errors) {
    Object.keys(response.error.errors).forEach((errorField) => {
      if (response.error.errors[errorField].errors) {
        messageParser(response.error.errors[errorField]);
      }
      if (response.error.errors[errorField].key && messages.get(response.error.errors[errorField].key)) {
        response.error.errors[errorField].message = messages.get(response.error.errors[errorField].key);
        response.error.errors[errorField].errorMessage = messages.get(response.error.errors[errorField].key);
      }
    });
  }
  return response;
}

export default new ApiBridge();
export { setErrorCodes, getParsers, addParsers };
