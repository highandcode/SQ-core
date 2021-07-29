const { chai, fakeDb } = require('../../tests/setup');
const _ = require('lodash');
const Errors = require('./Error');
const utils = require('./utils');
const { expect } = chai;


describe("Error", () => {

  describe('nodata()', () => {
    it('should return  "no data found" message', () => {
      expect(Errors.nodata()).eql({
        code: 400,
        message: 'no data found',
        key: 'NO_DATA'
      });
    });
  });
  describe('invalidcred() throws error', () => {
    it('should return "username/password did not match" message', () => {
      expect(Errors.invalidcred()).eql({
        code: 401,
        message: 'username/password did not match',
        key: 'INVALID_CREDENTIALS'
      });
    });
  });
  describe('duprecord() throws error', () => {
    it('should return "record already exists" message', () => {
      expect(Errors.duprecord()).eql({
        code: 400,
        message: 'record already exists',
        key: 'DUPLICATE_RECORD'
      });
    });
  });
  describe('dbfailed() throws error', () => {
    it('should return "db operation failed" message', () => {
      expect(Errors.dbfailed()).eql({
        code: 400,
        message: 'db operation failed',
        key: 'DB_FAILED'
      });
    });
  });
});
