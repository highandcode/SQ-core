
class QueryString {
  constructor(params) {
    this.input = params;
    this.isString = !!params && typeof (params) === 'string';
    this.isObject = !!params && typeof (params) === 'object';
  }

  toString() {
    var str = '';
    if (this.isObject) {
      Object.keys(this.input).forEach((key) => {
        if (this.input[key]) {
          str += (str ? '&' : '') + key + '=' + encodeURIComponent(this.input[key]);
        }
      });
    }
    return str ? '?' + str : str;
  }

  toObject() {
    var obj = {};
    if (this.isString) {
      const runInput = this.input.substr(this.input.indexOf('?')+1);
      runInput.split('&').forEach((keyValue) => {
        const split = keyValue.split('=');
        obj[split[0]] = decodeURIComponent(split[1]);
      });
    }
    return obj;
  }
}

module.exports = QueryString;