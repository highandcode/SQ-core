const { chai, mocks } = require('../../../tests/setup');
const _ = require('lodash');
const Collection = require('./collection');
const { expect } = chai;

describe('Core:DataLayer:Collection', () => {
  let fakeMOdel;
  beforeEach(() => {
    fakeMOdel == mocks.MockModel;
  });
  afterEach(() => {});

  describe('Basic', () => {
    it('should be defined', async () => {
      const repo = new Collection({ model: mocks.MockModel });
      expect(repo).not.to.be.undefined;
    });
  });
  describe('insert(data)', () => {
    beforeEach(() => {});
    afterEach(() => {
      mocks.MockModel.setError(false);
    });
    it('should  call contructor and save method', function (done) {
      mocks.MockModel.setError(true);

      const coll = new Collection({ model: mocks.MockModel });
      coll.insert({ rec: 1 }).catch((err) => {
        expect(err.message).to.equal('error occured');
        done();
      });
    });
    it('should  call save method', function (done) {
      const coll = new Collection({ model: mocks.MockModel });
      coll.insert({ update: '1' }).then((data) => {
        expect(data).to.eql({});
        done();
      });
    });
  });
  describe('find(criteria)', () => {
    beforeEach(() => {
      chai.spy.on(mocks.MockModel, 'findOne', () => Promise.resolve({ _doc: { name: 'test' } }));
    });
    afterEach(() => {
      chai.spy.restore(mocks.MockModel, 'findOne');
    });
    it('should  call findOne method', function (done) {
      const coll = new Collection({ model: mocks.MockModel });
      coll.findOne({ update: '1' }).then((res) => {
        expect(res.name).to.equal('test');
        done();
      });
    });
  });
  describe('aggregate(criteria)', () => {
    beforeEach(() => {
      chai.spy.on(mocks.MockModel, 'aggregate', () => Promise.resolve([{ _doc: { name: 'test' } }]));
    });
    afterEach(() => {
      chai.spy.restore(mocks.MockModel, 'aggregate');
    });
    it('should  call aggregate method', function (done) {
      const coll = new Collection({ model: mocks.MockModel });
      coll.aggregate({ update: '1' }).then((res) => {
        expect(res.length).to.equal(1);
        done();
      });
    });
  });
  describe('find(criteria)', () => {
    beforeEach(() => {
      chai.spy.on(mocks.MockModel, 'find', () => Promise.resolve([{ _doc: { name: 'test' } }]));
    });
    afterEach(() => {
      chai.spy.restore(mocks.MockModel, 'find');
    });
    it('should call find method and return _doc only', function (done) {
      const coll = new Collection({ model: mocks.MockModel });
      coll.find({ update: '1' }).then((res) => {
        expect(res[0].name).to.equal('test');
        done();
      });
    });
  });
  describe('update(data)', () => {
    beforeEach(() => {
      chai.spy.on(mocks.MockModel, 'findOne', () => new mocks.MockModel({}));
    });
    afterEach(() => {
      mocks.MockModel.setError(false);
      chai.spy.restore(mocks.MockModel, 'findOne');
    });
    it('should  call save method', function (done) {
      mocks.MockModel.setError(true);
      const coll = new Collection({ model: mocks.MockModel });
      coll.update({ update: '1' }, { update: '1' }).catch((err) => {
        expect(err.message).to.equal('error occured');
        done();
      });
    });
    it('should  call save method', function (done) {
      const coll = new Collection({ model: mocks.MockModel });
      coll.update({ update: '1' }, { update: '1' }).then((data) => {
        expect(data).to.eql({});
        done();
      });
    });
  });
  describe('deleteOne(data)', () => {
    it('should throw error', function (done) {
      const model = mocks.createMockModel({}, []);
      const coll = new Collection({ model });
      model.setError(true);
      coll.deleteOne({ rec: 1 }).catch((err) => {
        expect(err.message).to.equal('error occured');

        done();
      });
    });
    it('should not throw error', function (done) {
      const model = mocks.createMockModel({}, []);
      const coll = new Collection({ model });

      coll.deleteOne({ rec: 1 }).then((data) => {
        expect(data).to.eql({});
        done();
      });
    });
  });
  describe('deleteMany(data)', () => {
    it('should throw error', function (done) {
      const model = mocks.createMockModel({}, []);
      const coll = new Collection({ model });
      model.setError(true);
      coll.deleteMany({ rec: 1 }).catch((err) => {
        expect(err.message).to.equal('error occured');

        done();
      });
    });
    it('should not throw error', function (done) {
      const model = mocks.createMockModel({}, []);
      const coll = new Collection({ model });

      coll.deleteMany({ rec: 1 }).then((data) => {
        expect(data).to.eql({});
        done();
      });
    });
  });
  describe('updateAll(data)', () => {
    let model;
    let mockRecords;
    beforeEach(async () => {
      model = mocks.createMockModel({}, []);
      const coll = new Collection({ model });
      mockRecords = [mocks.createMockModel({ id: '1', test: 'true' }), mocks.createMockModel({ id: '2', test: '2 true' })];
      chai.spy.on(mockRecords[0], 'save');
      chai.spy.on(mockRecords[1], 'save');
      chai.spy.on(model, 'find', () => Promise.resolve(mockRecords));
      await coll.updateAll({ rec: 1 }, { update: 1 });
    });

    it('should call save once', function () {
      expect(mockRecords[0].save).to.called.once;
    });
  });
  describe('updateAll(data) with error', () => {
    let model;
    let mockRecords;
    let result;
    beforeEach(async () => {
      model = mocks.createMockModel({}, []);
      const coll = new Collection({ model });
      mockRecords = [mocks.createMockModel({ id: '1', test: 'true' })];
      chai.spy.on(mockRecords[0], 'save');
      mockRecords[0].setError(true);
      chai.spy.on(model, 'find', () => Promise.resolve(mockRecords));
      await coll.updateAll({ rec: 1 }, { update: 1 }).catch((ex) => {
        result = ex;
      });
    });

    it('should  call .save once', function () {
      expect(mockRecords[0].save).to.called.once;
    });
    it('should throw error', function () {
      expect(result).to.eqls({ message: 'error occured' });
    });
  });
});
