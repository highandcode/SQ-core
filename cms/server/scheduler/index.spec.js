const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var Scheduler = require('./index');

describe('Scheduler', function () {
  it('should exists', () => {
    expect(Scheduler).not.to.undefined;
  });
  it('should be able to create instnace', () => {
    expect(new Scheduler()).not.to.undefined;
  });
  describe('schedule()', () => {
    let inst, initalied, params;
    before(() => {
      function fakeLib(_params) {
        params = _params;
        this.init = function () {
          initalied = true;
        };
      }
      inst = new Scheduler({
        interval: fakeLib,
        jobs: {
          '/test': {
            type: 'interval',
            run: function () {}
          }
        }
      });
      inst.schedule();
    });

    it('should call init', () => {
      expect(initalied).to.equal(true);
    });
    it('should have name', () => {
      expect(params.name).to.equal('/test');
    });
    it('should have type', () => {
      expect(params.type).to.equal('interval');
    });
  });
});
