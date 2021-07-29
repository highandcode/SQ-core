const { chai, fakeDb } = require('../../tests/setup');
const _ = require('lodash');
const BaseEntityCollection = require('./BaseEntityCollection');
const BaseEntity = require('./BaseEntity');
const utils = require('./utils');
const { expect } = chai;
class TestEntity extends BaseEntity {
  constructor(raw, options = {}) {
    super(
      {
        raw: raw,
        entityType: TestEntity
      },
      { ...options }
    );
  }
}

describe('BaseEntityCollection', () => {
  beforeEach(() => {});
  afterEach(() => {});

  describe('Basic', () => {
    it('should be defined', () => {
      const obj = new BaseEntityCollection();
      expect(obj).not.to.be.undefined;
    });
  });

  describe('toArray()', () => {
    it('should return array with TestEntity object', () => {
      const obj = new BaseEntityCollection(
        [
          { uid: 'e5ks', text: 'Hallo 3' },
          { uid: 'e5ks1', text: 'Hallo 4' },
          { uid: 'e5ks2', text: 'Hallo 3' }
        ],
        TestEntity
      );
      expect(obj.toArray().length).to.equal(3);
    });
  });
  describe('toObject()', () => {
    let entityColl,
    objectReturn;
    beforeEach(() => {
      entityColl = new BaseEntityCollection(
        [
          { uid: 'e5ks', text: 'Hallo 3' },
          { uid: 'e5ks1', text: 'Hallo 4' },
          { uid: 'e5ks2', text: 'Hallo 3' }
        ],
        TestEntity
      );
      objectReturn = entityColl.toObject('uid', 'text');
    });
    it('should convert array to an object with given field', () => {
      expect(objectReturn.e5ks).to.equal('Hallo 3');
    });
    it('should able to access via get() method', () => {
      expect(objectReturn.get('e5ks')).to.equal('Hallo 3');
    });
    it('should return NoValue in case there is no value', () => {
      expect(objectReturn.get('e5k333s')).to.equal('NoValue');
    });
  });
  describe('toObject() with defaultValue', () => {
    let entityColl,
    objectReturn;
    beforeEach(() => {
      entityColl = new BaseEntityCollection(
        [
          { uid: 'e5ks', text: 'Hallo 3' },
          { uid: 'e5ks1', text: 'Hallo 4' },
          { uid: 'e5ks2', text: 'Hallo 3' }
        ],
        TestEntity
      );
      objectReturn = entityColl.toObject('uid', 'text', 'N/A');
    });

    it('should return NoValue in case there is no value', () => {
      expect(objectReturn.get('e5k333s')).to.equal('N/A');
    });
  });
});
