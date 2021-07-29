import _ from 'lodash';
import Queryable from './queryable';

class Sortable {
  constructor(data = [], { entityType }) {
    this.rData = data;
    this.entityType = entityType;
  }

  sortBy(field, order = 'asc') {
    let data = _.sortBy(this.rData, field);
    if (order === 'desc') {
      data = data.reverse();
    }
    return new Queryable(data, { entityType: this.entityType });
  }


}

export default Sortable;