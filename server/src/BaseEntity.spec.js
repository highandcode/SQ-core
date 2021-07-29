const { chai, fakeDb } = require('../../tests/setup');
const _ = require('lodash');
const BaseEntity = require('./BaseEntity');
const utils = require('./utils');
const { expect } = chai;

describe('BaseEntity', () => {
  beforeEach(() => {});
  afterEach(() => {});

  describe('Basic', () => {
    it('should be defined', () => {
      const obj = new BaseEntity();
      expect(obj).not.to.be.undefined;
    });
  });

  describe('field set', () => {
    it('should set all fields except', () => {
      const obj = new BaseEntity({
        _id: 'testguid',
        rocket: 1,
        league: 2
      });
      expect(obj.rocket).to.equal(1);
      expect(obj.league).to.equal(2);
    });
  });

  describe('toObject should filter out excluded keys ( _doc)', () => {
    it('should set all fields except', () => {
      const obj = new BaseEntity({
        _id: 'testguid',
        rocket: 1,
        league: 2
      }).toObject();
      expect(obj._doc).to.be.undefined;
      expect(obj.excludeKeys).to.be.undefined;
    });
  });

  describe('uid field handling', () => {
    it('should set _id as uid', () => {
      const obj = new BaseEntity({
        _id: 'testguid'
      });
      expect(obj.uid).to.equal('testguid');
    });
    it('should take uid if uid is present', () => {
      const obj = new BaseEntity({
        uid: 'localuid',
        otherF: '1'
      });
      expect(obj.uid).to.equal('localuid');
    });
    it('should not set _id field', () => {
      const obj = new BaseEntity({
        _id: 'testguid',
        uid: 'localuid'
      });
      expect(obj._id).to.be.undefined;
    });
  });
});
