import { Validator } from './validator';

describe.only('Validator', () => {
  it('should be defined', () => {
    expect(Validator).toBeDefined();
  });
  it('should be able to create object', () => {
    expect(new Validator()).toBeDefined();
  });

  describe('custom parseMessage()', () => {
    let validator;
    beforeEach(
      function () {
        validator = new Validator({
          test: {
            validator: { type: 'required' }
          }
        },{ emptyObject: false });
        validator.setValues({
          test: '',
          test1: 'valid'
        });
        validator.validate('test');
        validator.validate('test1');
      }
    );

    it('should have "error" property with invalid value', function () {
      expect(validator.errors.test.error).toBe(true);
    });
    it('should have "errorMessage" property with invalid value', function () {
      expect(validator.errors.test.errorMessage).toBeDefined();
    });
    it('should have "error" property with valid value', function () {
      expect(validator.errors.test1).not.toBeDefined();
    });
  });
});
