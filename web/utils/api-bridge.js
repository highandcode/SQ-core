import { QueryString } from './query-string';
import { messages } from './error-messages';
import EventManager from './event-manager';
import { CONSTANTS } from '../globals';

var defaultHeaders = {
  'Content-Type': 'application/json',
};

export class ApiBridge {
  constructor() {
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
    var url =
      window.location != window.parent.location
        ? document.referrer
        : document.location.href;
    var accesstore =
      document.location.ancestorOrigins && document.location.ancestorOrigins[0];
    return {
      'x-referer': accesstore || url,
      ...this.headers,
    };
  }

  getPrefix(data) {
    const result = this.events.emit('onPrefix', data);
    return result || window.API_SERVER || '';
  }

  get(url, params, headers = {}) {
    return fetch(
      this.getPrefix({ url, body: params }) +
        url +
        new QueryString(params).toString(),
      {
        method: 'GET',
        headers: {
          ...defaultHeaders,
          ...this.getCustomHeaders(),
          ...headers,
        },
      }
    )
      .then(checkStatus.bind(this))
      .then(parseJSON)
      .then(messageParser)
      .then(responseReader.bind(this));
  }

  post(url, body, headers = {}) {
    return fetch(this.getPrefix({ url, body }) + url, {
      method: 'POST',
      headers: {
        ...defaultHeaders,
        ...this.getCustomHeaders(),
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then(checkStatus.bind(this))
      .then(parseJSON)
      .then(messageParser)
      .then(responseReader.bind(this));
  }

  update(url, body, headers = {}) {
    return fetch(this.getPrefix({ url, body }) + url, {
      method: 'PUT',
      headers: {
        ...defaultHeaders,
        ...this.getCustomHeaders(),
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then(checkStatus.bind(this))
      .then(parseJSON)
      .then(messageParser)
      .then(responseReader.bind(this));
  }

  delete(url, body, headers = {}) {
    return fetch(this.getPrefix({ url, body }) + url, {
      method: 'DELETE',
      headers: {
        ...defaultHeaders,
        ...this.getCustomHeaders(),
        ...headers,
      },
      body: JSON.stringify(body),
    })
      .then(checkStatus.bind(this))
      .then(parseJSON)
      .then(messageParser)
      .then(responseReader.bind(this));
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else if (response.status === 401) {
    return response;
  } else if (response.status === 403) {
    this.events.emit('onUnauthroized', response);
    return response;
  } else if (response.status === 400) {
    return response;
  } else if (response.status === 500) {
    return {
      code: response.status,
      error: true,
      status: CONSTANTS.STATUS.UNNKOWN,
      error: {
        message: 'Unexpected error',
        key: 'UNEXPECTED_ERROR',
      },
    };
  } else if (response.status === 404) {
    return {
      code: response.status,
      error: true,
      status: CONSTANTS.STATUS.UNKNOWN,
      error: {
        message: 'Unexpected error',
        key: 'UNEXPECTED_ERROR',
      },
    };
  } else {
    return new Promise(function (resolve) {
      resolve({
        code: response.status,
        status: CONSTANTS.STATUS.SUCCESS,
        data: {},
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
    case CONSTANTS.STATUS.SUCCESS:
      return response;
    case CONSTANTS.STATUS.ERROR:
      switch (response.error.handler) {
        case 'POPUP':
          this.events.emit('onErrorPopup', response);
          break;
        case 'CUSTOM':
          this.events.emit('onCustomError', response);
          break;
      }
      return response;
    case CONSTANTS.STATUS.UNNKOWN:
      this.events.emit('onUnRecognizedError', response);
    default:
      return {
        ...response,
      };
  }
}

function messageParser(response) {
  if (response.error) {
    if (response.error.key && messages.get(response.error.key)) {
      response.error.message = messages.get(response.error.key);
      response.error.errorMessage = messages.get(response.error.key);
    }
    if (response.errors) {
      Object.keys(response.errors).forEach((errorField) => {
        if (response.errors[errorField].errors) {
          messageParser(response.errors[errorField]);
        }
        if (
          response.errors[errorField].key &&
          messages.get(response.errors[errorField].key)
        ) {
          response.errors[errorField].message = messages.get(
            response.errors[errorField].key
          );
          response.errors[errorField].errorMessage = messages.get(
            response.errors[errorField].key
          );
        }
      });
    }
    if (response.error.errors) {
      Object.keys(response.error.errors).forEach((errorField) => {
        if (response.error.errors[errorField].errors) {
          messageParser(response.error.errors[errorField]);
        }
        if (
          response.error.errors[errorField].key &&
          messages.get(response.error.errors[errorField].key)
        ) {
          response.error.errors[errorField].message = messages.get(
            response.error.errors[errorField].key
          );
          response.error.errors[errorField].errorMessage = messages.get(
            response.error.errors[errorField].key
          );
        }
      });
    }
  }
  return response;
}

export default new ApiBridge();
