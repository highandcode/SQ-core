class DynamoDocumentCollection {
  constructor({ tableName, database, db }) {
    this.database = database;
    this.db = db;
    this.tableName = tableName;
  }

  insert(data) {
    return this.db
      .put({
        TableName: this.tableName,
        Item: data
      })
      .promise()
      .then(this.mapSingle);
  }

  find(criteria) {
    const params = {
      TableName: this.tableName
    };
    return this.db.scan(params).promise().then(this.mapData);
  }

  mapSingle(data) {
    return data.Item;
  }

  mapData(data) {
    return data.Items.map((item) => item);
  }

  aggregate(criteria) {}
  findOne(criteria) {
    const params = {
      TableName: this.tableName,
      Key: criteria
    };
    return this.db.get(params).promise().then(this.mapSingle);
  }

  deleteOne(criteria) {}
  deleteMany(criteria) {}

  async update(criteria, props) {}

  async updateAll(criteria, props) {}
}

module.exports = DynamoDocumentCollection;
