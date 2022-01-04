const { chai } = require('../../../tests/setup');
var expect = chai.expect;
var { formatters, setDefaults } = require('./format');
const datetime = require('./datetime');

describe('utils::Format', function () {
  describe('#currency()', function () {
    it('should format numeric value to USD as default', () => {
      expect(formatters.currency(2000)).be.equal('$2,000.00');
    });
    it('should format numeric value negative to USD as default', () => {
      expect(formatters.currency(-2000)).be.equal('-$2,000.00');
    });
    it('should format string numeric value to USD as default', () => {
      expect(formatters.currency('2000')).be.equal('$2,000.00');
    });
    it('should be able to override configuration', () => {
      expect(
        formatters.currency('2000', {
          decimals: 0
        })
      ).be.equal('$2,000');
    });
    it('should override sign', () => {
      expect(
        formatters.currency('200000', {
          decimals: 2,
          currency: 'USD'
        })
      ).be.equal('$200,000.00');
    });
    it('should return blank in case of undefined value', () => {
      expect(
        formatters.currency(undefined, {
          decimals: 2,
          currency: 'USD'
        })
      ).be.equal('');
    });
    it('should return -$ in case of - only ', () => {
      expect(
        formatters.currency('-', {
          decimals: 2,
          input: true
        })
      ).be.equal('$-');
    });
    it('should return dot (.) in case of input = true ', () => {
      expect(
        formatters.currency('24.', {
          decimals: 2,
          input: true
        })
      ).be.equal('$24.');
    });
    it('should return 1 decimal case of input = true ', () => {
      expect(
        formatters.currency('24.3', {
          decimals: 2,
          input: true
        })
      ).be.equal('$24.3');
    });

    it('should return 2 decimal case of input = true ', () => {
      expect(
        formatters.currency('24.3467', {
          decimals: 2,
          input: true
        })
      ).be.equal('$24.35');
    });
  });

  describe('#currencyAbr()', function () {
    it('should return 3 digit $2,000.00', () => {
      expect(formatters.currencyAbr(2000)).be.equal('$2,000.00');
    });
    it('should format as $2 mn', () => {
      expect(formatters.currencyAbr('2000000')).be.equal('$2 mn');
    });
    it('should return $10 mn', () => {
      expect(formatters.currencyAbr('10000000')).be.equal('$10 mn');
    });
    it('should return 10 cr', () => {
      expect(
        formatters.currencyAbr('100000000', {
          decimals: 2,
          currency: 'USD'
        })
      ).be.equal('$100 mn');
    });
    it('should return blank in case of undefined value', () => {
      expect(formatters.currencyAbr()).be.equal('');
    });
    it('should return Rs.3,12,000.00 ', () => {
      expect(
        formatters.currencyAbr(312000, {
          decimals: 2,
          setName: 'crabove',
          currency: 'INR'
        })
      ).be.equal('₹3,12,000.00');
    });
    it('should return $3.12 mn', () => {
      expect(
        formatters.currencyAbr(3120000, {
          decimals: 2
        })
      ).be.equal('$3.12 mn');
    });
    it('should return -$3.12 mn', () => {
      expect(
        formatters.currencyAbr(-3120000, {
          decimals: 2
        })
      ).be.equal('-$3.12 mn');
    });
  });

  describe('#date()', function () {
    beforeEach(() => {
      chai.spy.on(datetime, 'new', () => ({ toString: () => 'FakeToString' }));
    });
    afterEach(() => {
      chai.spy.restore(datetime, 'new');
    });
    it('should call date.toString() method', () => {
      expect(formatters.date(new Date())).be.equal('FakeToString');
    });
  });
  describe('#strFix()', function () {
    it('should postfix given value', () => {
      expect(formatters.strFix('20')).be.equal('20');
    });
    it('should postfix given value', () => {
      expect(formatters.strFix('20', { postfix: '/-' })).be.equal('20/-');
    });
    it('should prefix given value', () => {
      expect(formatters.strFix('10', { prefix: '$' })).be.equal('$10');
    });
    it('should handled undefined value', () => {
      expect(formatters.strFix(undefined, { prefix: '$' })).be.equal('$');
    });
  });
  describe('#percentage()', function () {
    it('should return value with default % sign', () => {
      expect(formatters.percentage('20')).be.equal('20.00%');
    });
    it('should be able to override default sign', () => {
      expect(formatters.percentage('20', { sign: '$%' })).be.equal('20.00$%');
    });
    it('should be able to override default sign', () => {
      expect(formatters.percentage('20', { sign: '$%', fixed: 0 })).be.equal('20$%');
    });
  });
  describe('#keyValue()', function () {
    it('should return blank if there is no config', () => {
      expect(formatters.keyValue('INPROGRESS')).be.equal('');
    });
    it('should return for the given key', () => {
      expect(formatters.keyValue('INPROGRESS', { options: { INPROGRESS: 'In Progress' } })).be.equal('In Progress');
    });
    it('should return blank if key is not matching', () => {
      expect(formatters.keyValue('INPROGRESS2', { options: { INPROGRESS: 'In Progress' } })).be.equal('');
    });
    it('should return defaultValue if key is not matching and given default value', () => {
      expect(formatters.keyValue('INPROGRESS2', { defaultValue: 'N/A' })).be.equal('N/A');
    });
    it('should be able to pass options as function', () => {
      expect(formatters.keyValue('INPROGRESS', { options: () => ({ INPROGRESS: 'In Progress' }) })).be.equal('In Progress');
    });
    it('should return defaultValue if key is not matching and given default value', () => {
      expect(formatters.keyValue('INPROGRESS2', { defaultValue: 'N/A', options: () => ({ INPROGRESS: 'In Progress' }) })).be.equal('N/A');
    });
  });
});
