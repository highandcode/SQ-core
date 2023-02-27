const _ = require('lodash');
var BaseEntity = require('./BaseEntity');
var BaseEntityCollection = require('./BaseEntityCollection');
const errors = require('./Error');
const datetime = require('./utils/datetime');

class BaseRepository {
  constructor({
    entityType = BaseEntity,
    collectionEntity = BaseEntityCollection,
    db,
    collection,
  }) {
    this._entityType = entityType;
    this._collectionEntity = collectionEntity;
    this._db = db;
    this._collection = collection;
    this._db.connect();
  }

  createObject(params) {
    return new this._entityType(params);
  }

  createCollection(data) {
    return new this._collectionEntity(data, this._entityType);
  }

  find(filter, { sort } = {}) {
    return new Promise((resolve) => {
      let objFind = this._db.collections[this._collection].find(filter);
      if (sort) {
        objFind = objFind.sort(sort);
      }
      objFind.then((data) => {
        let coll = new this._collectionEntity(data, this._entityType);
        resolve(coll.toArray(), coll);
      });
    });
  }

  findOne(filter) {
    return new Promise((resolve, reject) => {
      this._db.collections[this._collection]
        .findOne(filter)
        .then((data) => {
          resolve(new this._entityType(data || {}));
        })
        .catch(reject);
    });
  }

  deleteMany(filter) {
    return new Promise(async (resolve, reject) => {
      if (filter) {
        const result = await this._db.collections[this._collection]
          .deleteMany(filter)
          .catch(reject);
        resolve(result);
      } else {
        reject(errors.invalidopr());
      }
    });
  }

  deleteById(uid, filter) {
    return new Promise(async (resolve, reject) => {
      let records;
      if (filter) {
        records = await this.find({ _id: uid, ...filter }).catch(reject);
      }
      if (!filter || !records || (records && records.length > 0)) {
        const result = await this._db.collections[this._collection]
          .deleteOne({ _id: uid })
          .catch(reject);
        resolve(result);
      } else {
        reject(errors.invalidopr());
      }
    });
    // return this._db.collections[this._collection].deleteOne({ _id: uid });
  }

  update(data) {
    const { uid, ...rest } = data;
    return new Promise((resolve, reject) => {
      this._db.collections[this._collection]
        .update({ _id: uid }, { updatedOn: datetime.new().date(), ...rest })
        .then((doc) => {
          resolve(new this._entityType(doc));
        })
        .catch(() => {
          reject(errors.dbfailed());
        });
    });
  }
  updateBulk(filter, data) {
    return new Promise((resolve, reject) => {
      this._db.collections[this._collection]
        .updateAll({ ...filter }, { updatedOn: datetime.new().date(), ...data })
        .then((data) => {
          resolve(new this._collectionEntity(data, this._entityType));
        })
        .catch(() => {
          reject(errors.dbfailed());
        });
    });
  }

  insert(data) {
    return new Promise((resolve, reject) => {
      this._db.collections[this._collection]
        .insert(data)
        .then((res) => {
          resolve(new this._entityType(res));
        })
        .catch(() => {
          reject(errors.dbfailed());
        });
    });
  }

  mustExists(filter) {
    return new Promise((resolve, reject) => {
      this._db.collections[this._collection].find(filter).then((res) => {
        if (res.length === 0) {
          reject(errors.invalidopr());
        } else {
          resolve(res);
        }
      });
    });
  }

  checkExists(filter, errorKeys = []) {
    return new Promise((resolve, reject) => {
      this._db.collections[this._collection].find(filter).then((res) => {
        let buildErrors = {};
        if (res.length > 0) {
          errorKeys.forEach((filterKey) => {
            if (
              _.filter(res, (i) => i[filterKey] === filter[filterKey]).length >
              0
            ) {
              buildErrors[filterKey] = {
                error: true,
                errorMessage: 'This record already exists',
                key: 'DUPLICATE_RECORD',
              };
            }
          });
          reject(errors.duprecord(buildErrors));
        } else {
          resolve();
        }
      });
    });
  }

  aggregateMongo(filter, options) {
    return new Promise((resolve, reject) => {
      this._db.collections[this._collection]
        .aggregate(filter, options)
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(errors.dbfailed(err));
        });
    });
  }

  mFind(filter, fields, options) {
    return this._db.collections[this._collection].mFind(
      filter,
      fields,
      options
    );
  }
  count(filter) {
    return this._db.collections[this._collection].count(filter);
  }

  async search(
    payload,
    { sortBy = 'createdOn', sortDir = 'ASC', pageSize = 25, pageNo = 1 } = {}
  ) {
    pageSize = pageSize * 1;
    pageNo = pageNo * 1;
    let count = await this.count(payload);
    let res = await this.mFind(payload)
      .limit(pageSize)
      .skip(pageSize * (pageNo - 1))
      .sort(`${sortDir === 'DESC' ? '-' : ''}${sortBy}`);

    return {
      totalItems: count,
      totalPages: Math.ceil(count / pageSize),
      pageSize,
      currentPage: pageNo,
      data: res,
    };
  }

  aggregate({ match, sort, addFields, group, lookup }) {
    const filter = [];
    if (sort) {
      filter.push({ $sort: sort });
    }
    if (addFields) {
      filter.push({ $addFields: addFields });
    }
    if (match) {
      filter.push({ $match: match });
    }
    if (group) {
      filter.push({
        $group: group,
      });
    }
    if (lookup) {
      filter.push({
        $lookup: lookup,
      });
    }
    return new Promise((resolve, reject) => {
      this._db.collections[this._collection]
        .aggregate(filter)
        .then((data) => {
          resolve(data);
        })
        .catch(() => {
          reject(errors.dbfailed());
        });
    });
  }
}

module.exports = BaseRepository;
