class QueryString {
  constructor(params) {
    this.input = params;
    this.isString = !!params && typeof params === 'string';
    this.isObject = !!params && typeof params === 'object';
  }

  toString() {
    var str = '';
    if (this.isObject) {
      Object.keys(this.input).forEach((key) => {
        if (typeof this.input[key] !== 'undefined') {
          str +=
            (str ? '&' : '') + key + '=' + encodeURIComponent(this.input[key]);
        }
      });
    }
    return str ? '?' + str : str;
  }

  toObject() {
    var obj = {};
    if (this.isString) {
      const runInput = this.input.substr(this.input.indexOf('?') + 1);
      runInput.split('&').forEach((keyValue) => {
        const split = keyValue.split('=');
        obj[split[0]] = decodeURIComponent(split[1]);
      });
    }
    return obj;
  }
}

const location = window.location;

const query = {
  get: (search) => {
    let brouterSearch = '';
    if (location.href.indexOf('?') > -1) {
      brouterSearch = location.href.substr(location.href.indexOf('?'));
    }
    return new QueryString(search || location.search || brouterSearch).toObject();
  },
};
export default QueryString;
export { query, QueryString };
