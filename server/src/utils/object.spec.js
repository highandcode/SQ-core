const { chai } = require('../../../tests/setup');
var expect = chai.expect;
const { object } = require('./index');

describe('utils:object', function () {
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
    it('should not throw error', () => {
      expect(
        object.getDataFromKey(
          { test: '12' },
          {
            test: 'test',
            key: {
              type: {
                obje: true,
              },
            },
          },
          null
        )
      ).to.eqls({
        test: 'test',
        key: {
          type: {
            obje: true,
          },
        },
      });
    });

    it('should not return root object if not found', () => {
      expect(object.getDataFromKey({ test: '12', id: '1', id2: '1' }, 'id23')).to.equal('');
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

    it('should return value blank', () => {
      expect(object.getDataFromKey({ app: { test: true }, test: '12' }, 'test2')).to.equal('');
    });
    it('should return value null', () => {
      expect(object.getDataFromKey({ app: { test: true }, test: '12' }, 'test2', null)).to.equal(null);
    });

    it('should return value', () => {
      expect(object.getDataFromKey({ app: { test: true }, test: '12' }, { a: true })).to.eqls({ a: true });
    });
  });

  describe('#processMessage()', function () {
    it('should convert ##field## to values', () => {
      expect(
        object.processMessage('You are an absolute ##value##.', {
          value: 'test',
        })
      ).to.equal('You are an absolute test.');
    });
    it('should convert ##nested.field## to values', () => {
      expect(
        object.processMessage('You are an absolute ##nest.value## ##other.test##.', {
          value: 'test',
          nest: { value: 'ok' },
          other: { test: 'new' },
        })
      ).to.equal('You are an absolute ok new.');
    });
    it('should call formatter ##currency|nested.field## to values', () => {
      expect(
        object.processMessage('You are an absolute ##currency|nest.value##.', {
          value: 'test',
          nest: { value: 2000 },
          other: { test: 'new' },
        })
      ).to.equal('You are an absolute $2,000.00.');
    });
    it('should not print undefined if value is not available', () => {
      expect(object.processMessage('You are an absolute ##data.choice1##.', {}, { removePrefix: 'data.' })).to.equal('You are an absolute .');
    });
  });
  describe('#processBlock(block, data)', function () {
    describe('simple inject dynamic data to target block at root level', () => {
      let targetObj;
      let result;
      beforeEach(() => {
        targetObj = {
          cmpType: 'Input',
          inject: {
            value: 'textValue',
          },
          nested: {
            obj: {
              inject: {
                nestInj: 'textValue2',
              },
            },
          },
        };
        result = object.processBlock(targetObj, {
          userData: { textValue: 'newValue', textValue2: 'value 2' },
        });
      });
      it('should have value as "newValue"', () => {
        expect(result.value).to.equal('newValue');
      });
      it('should have target.nested.obj.nestInj as "value 2"', () => {
        expect(result.nested.obj.nestInj).to.equal('value 2');
      });
    });

    it('should inject data from nested objects', () => {
      const targetObj = {
        component: 'Form',
        fields: {
          cmpType: 'Date',
          className: 'test',
          inject: {
            disabled: 'form.isSubmitting',
          },
        },
      };
      object.processBlock(targetObj, {
        userData: { form: { isSubmitting: true } },
      });
      expect(targetObj.fields.disabled).to.equal(true);
    });

    it('should inject data in array of objects', () => {
      const targetObj = {
        component: 'Form',
        fields: [
          {
            cmpType: 'Date',
            className: 'test',
            inject: {
              disabled: 'isSubmitting',
            },
          },
        ],
      };
      object.processBlock(targetObj, {
        userData: { isSubmitting: false },
      });
      expect(targetObj.fields[0].disabled).to.equal(false);
    });

    it('should inject validate result ', () => {
      const targetObj = {
        component: 'Form',
        fields: [
          {
            cmpType: 'Date',
            className: 'test',
            inject: {
              disabled: {
                match: {
                  custom: {
                    validators: [
                      {
                        type: 'or',
                        validations: [
                          {
                            type: 'equals',
                            fieldName: 'field1',
                            matchValue: true,
                          },
                          {
                            type: 'equals',
                            fieldName: 'field2',
                            matchValue: true,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
      };
      object.processBlock(targetObj, {
        userData: { field1: false, field2: true },
      });
      expect(targetObj.fields[0].disabled).to.equal(true);
    });

    it('should not throw error if options and data is not passed ', () => {
      const targetObj = {
        component: 'Form',
        fields: [
          {
            cmpType: 'Date',
            className: 'test',
            inject: {
              disabled: {
                match: {
                  custom: {
                    validators: [
                      {
                        type: 'or',
                        validations: [
                          {
                            type: 'equals',
                            fieldName: 'field1',
                            matchValue: true,
                          },
                          {
                            type: 'equals',
                            fieldName: 'field2',
                            matchValue: true,
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        ],
      };
      object.processBlock(targetObj);
      expect(targetObj.fields[0].disabled).to.equal(false);
    });
  });

  describe('#extendData(block, data)', function () {
    it('should inject data from nested objects', () => {
      const defaultObj = {
        test: {
          nest: {
            obj: null,
            obj1: {
              got: true,
            },
          },
        },
      };
      const targetObj = {
        test: {
          nest: {
            obj1: {
              obj2: null,
              got: true,
              got: 1,
            },
          },
        },
      };
      const result = object.extendData(defaultObj, targetObj);
      expect(result).to.eqls({
        test: {
          nest: {
            obj: null,
            obj1: {
              obj2: null,
              got: 1,
            },
          },
        },
      });
    });
  });
});
