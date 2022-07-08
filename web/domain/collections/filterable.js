import _ from 'lodash';
import Querytable from './queryable';

class Filterable {
  constructor(data = [], { entityType = (data) => data } = {}) {
    this.rData = data;
    this.entityType = entityType;
  }

  filterBy(options) {
    return new Querytable(_.filter(this.rData, options), {
      entityType: this.entityType,
    });
  }
}

export default Filterable;
