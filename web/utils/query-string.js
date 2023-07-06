import common from "./common";

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
        if (Array.isArray(this.input[key])) {
          this.input[key].forEach((itemVal) => {
            str +=
            (str ? '&' : '') + key + '=' + encodeURIComponent(itemVal);
          })
        } else if (typeof this.input[key] === 'object' && this.input[key] !== null) {
          str +=
            (str ? '&' : '') + key + '=o:' + encodeURIComponent(JSON.stringify(this.input[key]));
        } else if (!common.isNullOrUndefinedBlank(this.input[key])) {
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
        if (split[1].substr(0,2) === 'o:') {
           obj[split[0]] = JSON.parse(decodeURIComponent(split[1].substr(2)));
        } else {
          if (Array.isArray(obj[split[0]])) {
            obj[split[0]].push(decodeURIComponent(split[1]))
          } else if (obj[split[0]]) {
            obj[split[0]] = [obj[split[0]], decodeURIComponent(split[1])];
          } else {
            obj[split[0]] = decodeURIComponent(split[1]);
          }
        }
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
