const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var Interval = require('./interval');

describe('scheduler:Interval', function () {
  it('should exists', () => {
    expect(Interval).not.to.undefined;
  });
  it('should be able to create instnace', () => {
    expect(new Interval()).not.to.undefined;
  });

  describe('init()', () => {
    let inst,
      reuslt = '';
    before(() => {
      inst = new Interval({
        scheduler: { log: () => {} },
        run: () => {
          result = 'run';
        },
        frequency: '1h'
      });
      chai.spy.on(inst.options, 'run');
      inst.init();
    });

    it('should return not call run once', () => {
      expect(inst.options.run).not.to.called.once;
    });
  });
  describe('init() with .runAtStart = true', () => {
    let inst,
      reuslt = '';
    before(() => {
      inst = new Interval({
        scheduler: { log: () => {} },
        run: () => {},
        frequency: '1h',
        runAtStart: true
      });
      chai.spy.on(inst.options, 'run');
      inst.init();
    });

    it('should call run once', () => {
      expect(inst.options.run).to.called.once;
    });
  });
});
