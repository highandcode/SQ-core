import Filterbale from './filterable';
import Sortable from './sortable';

class Queryable {
  constructor(data = [], { entityType = (data) => data } = {}) {
    this.rData = data;
    this.entityType = entityType;
  }

  filterBy(options) {
    return new Filterbale(this.rData, { entityType: this.entityType }).filterBy(
      options
    );
  }

  sortBy(field, asc) {
    return new Sortable(this.rData, { entityType: this.entityType }).sortBy(
      field,
      asc
    );
  }

  sortOrder(field, asc) {
    return new Sortable(this.rData, { entityType: this.entityType }).sortOrder(
      field,
      asc
    );
  }

  toArray(derived = true) {
    return this.rData.map((item) => {
      const fix = new this.entityType(item);
      return fix.toJson ? fix.toJson(derived) : fix;
    });
  }

  toObject(key, value, defaultValue = '') {
    var obj = {};
    this.rData.forEach((item) => {
      obj[item[key]] = item[value];
    });
    // obj.get = (key, overrideDefault) => {
    //   return obj[key] || overrideDefault || defaultValue;
    // };
    return obj;
  }
}

export default Queryable;
