const { utils } = require('../../server');

function MockMongoAPI(data) {
  this.data = data;
}
MockMongoAPI.prototype = {
  find: function () {
    return this;
  },
  update: function () {
    return this;
  },
  delete: function () {
    return this;
  },
  deleteOne: function () {
    return this;
  },
  insert: function () {
    return this;
  },
  then: function (callback) {
    callback(this.data);
  },
  return: function (data) {
    this.data = data;
    return this;
  }
};

function MockRepository(data, methods) {
  this.data = data;
  methods &&
    methods.forEach((method) => {
      this[method] = () => Promise.resolve(this.data);
    });
}
MockRepository.prototype = {
  find: function () {
    return Promise.resolve(this.data);
  },
  update: function () {
    return Promise.resolve(this.data);
  },
  insert: function () {
    return Promise.resolve(this.data);
  },
  deleteMany: function () {
    return Promise.resolve(this.data);
  },
  deleteById: function () {
    return Promise.resolve(this.data);
  },

  create: function () {
    return Promise.resolve(this.data);
  },

  return: function (data) {
    this.data = data;
    return this;
  }
};

function NewMockModel(data, methods = []) {
  this.data = data;
  this.errorMode = false;
  this.save = function (callback) {
    if (NewMockModel.errorMode || this.errorMode) {
      callback({ message: 'error occured' });
    } else {
      callback(null, this.data);
    }
  };

  methods.forEach((method) => {
    this[method] = () => {
      if (NewMockModel.errorMode || this.errorMode) {
        return Promise.reject({ message: 'error occured' });
      }
      return Promise.resolve(this.data);
    };
  });
}
NewMockModel.prototype = {
  setError: function (bool) {
    this.errorMode = bool;
  },
  find: function () {
    return Promise.resolve(this.data);
  },
  findOne: function () {
    return Promise.resolve(this.data);
  },
  deleteOne: function (cr, callback) {
    if (this.errorMode) {
      callback({ message: 'error occured' });
    } else {
      callback(null, this.data);
    }
  },
  deleteMany: function (cr, callback) {
    if (this.errorMode) {
      callback({ message: 'error occured' });
    } else {
      callback(null, this.data);
    }
  },
  delete: function () {
    return Promise.resolve(this.data);
  },
  update: function () {
    return Promise.resolve(this.data);
  },
  insert: function () {
    return Promise.resolve(this.data);
  },

  return: function (data) {
    this.data = data;
    return this;
  }
};

Object.assign(NewMockModel, {
  errorMode: false,
  setError: function (bool) {
    NewMockModel.errorMode = bool;
  },
  find: function () {
    return Promise.resolve(this.data);
  },
  findOne: function () {
    return Promise.resolve(this.data);
  },
  deleteOne: function (cr, callback) {
    if (NewMockModel.errorMode) {
      callback({ message: 'error occured' });
    } else {
      callback(null, this.data);
    }
  },
  delete: function () {
    return Promise.resolve(this.data);
  },
  update: function () {
    return Promise.resolve(this.data);
  },
  insert: function () {
    return Promise.resolve(this.data);
  },

  return: function (data) {
    this.data = data;
    return this;
  }
});

class MockIo {
  listen() {
    return {
      use: () => {},
      sockets: {
        on: () => {}
      }
    };
  }
}

class MockClient {
  constructor(args = {}) {
    this.id = args.id || utils.guid();
    this.called = [];
    this.lastCall = undefined;
  }
  emit() {
    this.called.push(arguments);
    this.lastCall = arguments;
  }
}

class MockEntity {
  constructor(data) {
    this.data = data;
  }
  toObject() {
    return this.data;
  }
}

class FakeEntity {
  constructor(data) {
    this.data = data;
    Object.assign(this, data);
  }

  toObject() {
    return this.data;
  }
}

module.exports = {
  createMockMongoAPI: function (data) {
    return new MockMongoAPI(data);
  },
  createMockRepository: function (data, methods = []) {
    return new MockRepository(data, methods);
  },
  MockModel: NewMockModel,
  createMockModel: function (data, methods = []) {
    return new NewMockModel(data, methods);
  },
  createMockIo: function () {
    return new MockIo();
  },
  createMockClient: function (args) {
    return new MockClient(args);
  },
  createMockEntity(args) {
    return new MockEntity(args);
  },
  createFakeEntity(data) {
    return new FakeEntity(data);
  },
  createFakeCollection(data) {
    return data.map((item) => new FakeEntity(item));
  }
};
