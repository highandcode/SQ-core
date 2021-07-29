class BaseEntityCollection {
  constructor(data = [], entityType) {
    this.data = data;
    this._entityType = entityType;
  }

  toArray() {
    return this.data.map((dataItem) => {
      return new this._entityType(dataItem);
    });
  }

  toObject(key, value, defaultValue) {
    var obj = {};
    this.data.forEach((item) => {
      obj[item[key]] = item[value];
    });
    obj.get = (key) => {
      return obj[key] || defaultValue || 'NoValue';
    };
    return obj;
  }
}

module.exports = BaseEntityCollection;
