const { chai, fakeDb } = require('../../tests/setup');
const _ = require('lodash');
const BaseRepository = require('./BaseRepository');
const utils = require('./utils');
const { expect } = chai;


describe("BaseRepository", () => {

  describe('+ve Scenario', () => {
    var _db;
    beforeEach(() => {
      _db = fakeDb(['test']);
      chai.spy.on(utils.datetime, 'now', () => utils.datetime.new('2020-01-12T10:00:00.000Z'));
      chai.spy.on(_db.collections.test, 'find', () => Promise.resolve([{ fakeId: 1 }]));
      chai.spy.on(_db.collections.test, 'findOne', () => Promise.resolve({ fakeId: 1 }));
      chai.spy.on(_db.collections.test, 'deleteOne', () => Promise.resolve({ fakeId: 1 }));
      chai.spy.on(_db.collections.test, 'aggregate', () => Promise.resolve([{ total: 1 }]));
      chai.spy.on(_db.collections.test, 'update', () => Promise.resolve({ fakeId: 1 }));
      chai.spy.on(_db.collections.test, 'insert', () => Promise.resolve({ fakeId: 1 }));
    });
    afterEach(() => {
      chai.spy.restore(utils.datetime, 'now');
      chai.spy.restore(_db.collections.test, 'find');
      chai.spy.restore(_db.collections.test, 'findOne');
      chai.spy.restore(_db.collections.test, 'deleteOne');
      chai.spy.restore(_db.collections.test, 'aggregate');
      chai.spy.restore(_db.collections.test, 'update');
      chai.spy.restore(_db.collections.test, 'insert');
    });

    describe('Basic', () => {
      it("should be defined", async () => {
        const repo = new BaseRepository({
          db: fakeDb(['test'])
        });
        expect(repo).not.to.be.undefined;
      });
    });

    describe('find()', () => {
      it("should call collection.find()", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.find({});
        expect(_db.collections.test.find).to.have.been.called.with({});
      });
    });
    describe('findOne()', () => {
      it("should call collection.findOne()", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.findOne({});
        expect(_db.collections.test.findOne).to.have.been.called.with({});
      });
    });
    describe('update()', () => {
      it("should call collection.update()", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.update({});
        expect(_db.collections.test.update).to.have.been.called;
      });
    });

    describe('deleteById()', () => {
      it("should call collection.deleteById()", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.deleteById('123');
        expect(_db.collections.test.deleteOne).to.have.been.called.with({ _id: '123' });
      });
    });
    describe('insert()', () => {
      it("should call collection.insert()", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.insert({ x: 1, y: 2 });
        expect(_db.collections.test.insert).to.have.been.called.with({ x: 1, y: 2 });
      });
    });
    describe('aggregate()', () => {
      it("should call collection.aggregate() with $match", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.aggregate({
          match: { a: 1 }
        });
        expect(_db.collections.test.aggregate).to.have.been.called.with([{ $match: { a: 1 } }]);
      });
      it("should call collection.aggregate() with $sort", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.aggregate({
          sort: { a: 1 }
        });
        expect(_db.collections.test.aggregate).to.have.been.called.with([{ $sort: { a: 1 } }]);
      });
      it("should call collection.aggregate() with $sort", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.aggregateMongo([{
          $sort: { a: 1 }
        }]);
        expect(_db.collections.test.aggregate).to.have.been.called.with([{ $sort: { a: 1 } }]);
      });
      it("should call collection.aggregate() with $group", async () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        await repo.aggregate({
          group: { _id: 1 }
        });
        expect(_db.collections.test.aggregate).to.have.been.called.with([{ $group: { _id: 1 } }]);
      });
    });
  });
  describe('-ve Scenario', () => {
    var _db;
    beforeEach(() => {
      _db = fakeDb(['test']);
      chai.spy.on(utils.datetime, 'now', () => utils.datetime.new('2020-01-12T10:00:00.000Z'));
      chai.spy.on(_db.collections.test, 'find', () => Promise.resolve({ error: 1 }));
      chai.spy.on(_db.collections.test, 'update', () => Promise.reject({ error: 1 }));
      chai.spy.on(_db.collections.test, 'insert', () => Promise.reject({ error: 1 }));
      chai.spy.on(_db.collections.test, 'aggregate', () => Promise.reject({ error: 1 }));
    });
    afterEach(() => {
      chai.spy.restore(utils.datetime, 'now');
      chai.spy.restore(_db.collections.test, 'find');
      chai.spy.restore(_db.collections.test, 'insert');
      chai.spy.restore(_db.collections.test, 'update');
      chai.spy.restore(_db.collections.test, 'aggregate');
    });
    describe('update() throws error', () => {
      it('should return db failed error', () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        return repo.update({}).catch((ex) => {
          expect(ex.key).to.equal('DB_FAILED');
        });
      })
    });
    describe('insert() throws error', () => {
      it('should return db failed error', () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        return repo.insert({}).catch((ex) => {
          expect(ex.key).to.equal('DB_FAILED');
        });
      })
    });
    describe('aggregate() throws error', () => {
      it('should return db failed error', () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        return repo.aggregate({}).catch((ex) => {
          expect(ex.key).to.equal('DB_FAILED');
        });
      })
    });
    describe('aggregateMongo() throws error', () => {
      it('should return db failed error', () => {
        const repo = new BaseRepository({
          db: _db,
          collection: 'test'
        });
        return repo.aggregateMongo({}).catch((ex) => {
          expect(ex.key).to.equal('DB_FAILED');
        });
      })
    });
  });
});
