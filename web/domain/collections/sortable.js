import Queryable from './queryable';

class Sortable {
  constructor(data = [], { entityType = function () { return this; } } = {}) {
    this.rData = data;
    this.entityType = entityType;
    this._sortOrder = [];
  }

  sortOrder(field, order = 'asc') {
    this._sortOrder.push({
      field,
      order,
    });
    return this;
  }

  sortBy(field, order = 'asc') {
    this.sortOrder(field, order);
    let data = this.rData.sort((a, b) => {
      let idx;
      for (var count = 0; count < this._sortOrder.length; count++) {
        const order = this._sortOrder[count].order;
        const field = this._sortOrder[count].field;
        let data1 = a[field];
        let data2 = b[field];
        if (typeof data1 === 'string') {
          data1 = data1.toLowerCase();
        }
        if (typeof data2 === 'string') {
          data2 = data2.toLowerCase();
        }
        if (data1 > data2) {
          idx = order === 'asc' ? 1 : -1;
          break;
        } else if (data1 < data2) {
          idx = order === 'asc' ? -1 : 1;
          break;
        } else {
          idx = 0;
        }
      }
      return idx;
    });
    this._sortOrder = [];
    return new Queryable(data, { entityType: this.entityType });
  }
}

export default Sortable;
