const { chai } = require('../../../tests/setup');
const { ValidatorCast } = require('./validator-cast');
const { expect } = chai;

describe.only('ValidatorCast', () => {
  it('should be defined', () => {
    expect(ValidatorCast).not.to.be.undefined;
  });
  it('should be able to create object', () => {
    expect(new ValidatorCast()).not.to.be.undefined;
  });

  describe('ValidatorCast:Basic without configuration', () => {
    let validator;
    beforeEach(() => {
      validator = new ValidatorCast();
    });
    it('cast(config) with mobile no. should return "phone"', () => {
      expect(
        validator.cast(
          {
            email: {
              value: 'email'
            },
            internationalphone: {
              value: 'phone'
            }
          },
          '+919910702765'
        )
      ).to.equal('phone');
    });

    it('cast(config) with mobile no. should return "email"', () => {
      expect(
        validator.cast(
          {
            email: {
              value: 'email'
            },
            internationalphone: {
              value: 'phone'
            }
          },
          'navneetabh@gmail.com'
        )
      ).to.equal('email');
    });
    it('cast(config) with invalid should return ""', () => {
      expect(
        validator.cast(
          {
            email: {
              value: 'email'
            },
            internationalphone: {
              value: 'phone'
            }
          },
          'navneetagmail.com'
        )
      ).to.equal('');
    });
  });
});
