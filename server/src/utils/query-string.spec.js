const { chai } = require('../../../tests/setup');
const QueryString = require('./query-string');
const { expect } = chai;

describe('Utils:QueryString', () => {

  describe('toString()', () => {

    it('should return params in string with ?', () => {
      expect(new QueryString({
        x: '1',
        y: '2'
      }).toString()).to.equal('?x=1&y=2')
    });
    it('should return blank string if there is no params', () => {
      expect(new QueryString({
      }).toString()).to.equal('')
    });

  });
  describe('toObject()', () => {

    it('should convert from string to object', () => {
      expect(new QueryString('?x=1&y=2').toObject()).to.eql({
        x: '1',
        y: '2'
      })
    });
    it('should return blank object if there is no params', () => {
      expect(new QueryString({
      }).toObject('')).to.eql({})
    });
    it('should be able to handle full url', () => {
      expect(new QueryString('http://gssg.com/?query=1233').toObject()).to.eql({ query: '1233' })
    });

  });


});