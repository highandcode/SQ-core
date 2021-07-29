const { chai } = require('../../../tests/setup');
var expect = chai.expect;
const { ParamsValidator } = require('./params-validator');

describe('params:ParamValidator', function () {
  describe('#ParamValidator', function () {
    
    describe('checking validators required params', function () {
      let result;

      beforeEach(() => {
        result = new ParamsValidator({
          originalUrl: '/user/info',
          method: 'POST',
          body: {
            categoryName: 'Test'
          },
          url: '/user/info',
          rules: {
            '/user/info': {
              POST: {
                params: {
                  required: ['categoryName', 'uid']
                }
              }
            }
          }
        }).validate();
      });
      it('should have uid error as true', () => {
        expect(result.uid.error).to.equal(true);
      });
      it('should have uid errorMessage ', () => {
        expect(result.uid.errorMessage).to.equal('Parameter required');
      });
    });

    describe('checking validators optional params', function () {
      let result;

      beforeEach(() => {
        result = new ParamsValidator({
          originalUrl: '/user/info',
          method: 'POST',
          body: {
            categoryName: 'Test',
            gold: '',
            test: 'test'
          },
          url: '/user/info',
          rules: {
            '/user/info': {
              POST: {
                params: {
                  required: ['categoryName', 'uid'],
                  optional: ['gold', 'test']
                }
              }
            }
          }
        }).validate();
      });

      it('should not have gold errorMessage ', () => {
        expect(result.gold).to.be.undefined;
      });
      it('should not have gold errorMessage ', () => {
        expect(result.test).to.be.undefined;
      });
    });

    describe('checking validators unknown params', function () {
      let result;

      beforeEach(() => {
        result = new ParamsValidator({
          originalUrl: '/user/info',
          method: 'POST',
          body: {
            categoryName: 'Test',
            gold2: '',
            test2: 'test'
          },
          url: '/user/info',
          rules: {
            '/user/info': {
              POST: {
                params: {
                  required: ['categoryName', 'uid'],
                  optional: ['gold', 'test']
                }
              }
            }
          }
        }).validate();
      });

      it('should have gold2 error as true ', () => {
        expect(result.gold2.error).to.equal(true);
      });
      it('should have gold2 errorMessage ', () => {
        expect(result.gold2.errorMessage).to.equal('Unknown parameter');
      });
      it('should have test2 errorMessage ', () => {
        expect(result.test2.errorMessage).to.equal('Unknown parameter');
      });
    });

    describe('checking validators unknown params exists in validatory', function () {
      let result;

      beforeEach(() => {
        result = new ParamsValidator({
          originalUrl: '/user/info',
          method: 'POST',
          body: {
            categoryName: 'Test',
            uid: 'test1',
            gold2: 'gg',
            test: ''
          },
          url: '/user/info',
          rules: {
            '/user/info': {
              POST: {
                params: {
                  required: ['categoryName', 'uid'],
                  optional: ['gold', 'test']
                },
                validators: {
                  gold2: {
                    type: 'required'
                  }
                }
              }
            }
          }
        }).validate();
      });

      it('should not have gold2 error', () => {
        expect(result.gold2).to.be.undefined;
      });
    });

    describe('checking validators fail scenario', function () {
      let result;

      beforeEach(() => {
        result = new ParamsValidator({
          originalUrl: '/user/info',
          method: 'POST',
          body: {},
          url: '/user/info',
          rules: {
            '/user/info': {
              POST: {
                validators: {
                  categoryName: {
                    validators: [
                      {
                        type: 'required'
                      }
                    ]
                  }
                }
              }
            }
          }
        }).validate();
      });
      it('should have categoryName error as true', () => {
        expect(result.categoryName.error).to.equal(true);
      });
      it('should have categoryName errorMessage ', () => {
        expect(result.categoryName.errorMessage).to.equal('This field is required');
      });
    });

    describe('checking validators fail scenario', function () {
      let result;

      beforeEach(() => {
        result = new ParamsValidator({
          originalUrl: '/user/info',
          method: 'POST',
          body: {
            categoryName: 'Hell0'
          },
          url: '/user/info',
          rules: {
            '/user/info': {
              POST: {
                validators: {
                  categoryName: {
                    validators: [
                      {
                        type: 'required'
                      }
                    ]
                  }
                }
              }
            }
          }
        }).validate();
      });
      it('should not have categoryName', () => {
        expect(result.categoryName).to.be.undefined;
      });
    });
  });
});
