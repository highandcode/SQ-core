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

  toArray() {
    return this.rData.map((item) => {
      return new this.entityType(item).toJson();
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
