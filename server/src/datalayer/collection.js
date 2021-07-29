class DocumentCollection {
  constructor({ model }) {
    this.model = model;
  }

  insert(data) {
    return new Promise((resolve, reject) => {
      new this.model(data).save((err, savedObj) => {
        if (err) {
          reject(err);
        } else {
          resolve({
            ...savedObj._doc
          });
        }
      });
    });
  }

  find(criteria) {
    return this.model.find(criteria).then((list) => {
      return list.map((item) => item._doc);
    });
  }

  aggregate(criteria) {
    return this.model.aggregate(criteria).then((list) => {
      return list;
    });
  }
  findOne(criteria) {
    return this.model.findOne(criteria).then((doc) => {
      return doc && doc._doc;
    });
  }

  deleteOne(criteria) {
    return new Promise((resolve, reject) => {
      this.model.deleteOne(criteria, (err, doc) => {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      });
    });
  }
  deleteMany(criteria) {
    return new Promise((resolve, reject) => {
      this.model.deleteMany(criteria, (err, doc) => {
        if (!err) {
          resolve(doc);
        } else {
          reject(err);
        }
      });
    });
  }

  async update(criteria, props) {
    const doc = await this.model.findOne(criteria);
    if (doc) {
      Object.keys(props).forEach((key) => {
        doc[key] = props[key];
      });
      return new Promise((resolve, reject) => {
        doc.save((err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              ...data._doc
            });
          }
        });
      });
    }
  }

  async updateAll(criteria, props) {
    const list = await this.model.find(criteria);
    const allProm = [];
    list.forEach((doc) => {
      Object.keys(props).forEach((key) => {
        doc[key] = props[key];
      });
      allProm.push(
        new Promise((resolve, reject) => {
          doc.save((err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve({
                ...data._doc
              });
            }
          });
        })
      );
    });
    return Promise.all(allProm);
  }
}

module.exports = DocumentCollection;
