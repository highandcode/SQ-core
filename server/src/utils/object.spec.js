const { chai } = require('../../../tests/setup');
var expect = chai.expect;
const object = require('./object');

describe('utils:number', function () {
  describe('#object.clone(obj)', function () {
    describe('checking copy of object', function () {
      let obj1, cloneObj;

      beforeEach(() => {
        obj1 = { value: '12', nest: { value: 3 } };
        cloneObj = object.clone(obj1);
      });
      it('should return copy of object', () => {
        expect(cloneObj.value).to.equal('12');
      });
      it('should not affect obj1', () => {
        cloneObj.value = '13';
        expect(obj1.value).to.equal('12');
      });
      it('should check nesting objects', () => {
        cloneObj.nest.value = '13';
        expect(obj1.nest.value).to.equal(3);
      });
    });
  });
  describe('#object.getDataFromKey(obj, key, default)', function () {
    it('should return ""', () => {
      expect(object.getDataFromKey({ test: '12' }, 'test2')).to.equal('');
    });
    it('should return null', () => {
      expect(object.getDataFromKey({ test: '12' }, 'test2', null)).to.equal(null);
    });

    it('should return value from nested object', () => {
      expect(object.getDataFromKey({ test: '12', nest: { okay: true } }, 'nest.okay'), '').to.equal(true);
    });
    it('should return value from nested object', () => {
      expect(object.getDataFromKey({ test: '12', nest: { okay: true } }, 'nest.okay.test.ter'), '').to.equal('');
    });

    it('should return value', () => {
      expect(object.getDataFromKey({ test: '12' }, 'test'), '').to.equal('12');
    });

    it('should return value', () => {
      expect(object.getDataFromKey({ test: '12' }, 'test'), '').to.equal('12');
    });
  });
});
