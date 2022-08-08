import { masks } from './mask';
describe('utils:format', () => {
  describe('currency()', function () {
    it('should return format default in USD', async () => {
      expect(masks.currency.mask(1)).toEqual('$1');
    });
    it('should return -$ in case ', async () => {
      expect(masks.currency.mask('-')).toEqual('$-');
    });
    it('should return -$15 in case ', async () => {
      expect(masks.currency.mask('-15')).toEqual('-$15');
    });
    it('should return -$15. in case ', async () => {
      expect(masks.currency.mask('-15.')).toEqual('-$15.');
    });
    it('should return -$15.0 in case ', async () => {
      expect(masks.currency.mask('-15.0')).toEqual('-$15.0');
    });
  });
  describe('number()', function () {
    it('should number in format', async () => {
      expect(masks.number.mask('24234324', {pattern: 'DDDDD DD'})).toEqual('24234 32');
    });
    it('should number in format', async () => {
      expect(masks.number.mask('24234324', {pattern: '(DDDDD) DD'})).toEqual('(24234) 32');
    });
    
  });
  describe('phone()', function () {
    it('should return (991) 0', async () => {
      expect(masks.phone.mask(9910)).toEqual('(991) 0');
    });
    it('should return (991) 070', async () => {
      expect(masks.phone.mask(991070)).toEqual('(991) 070');
    });
    it('should return (991) 070 2765', async () => {
      expect(masks.phone.mask(9910702765)).toEqual('(991) 070-2765');
    });
  });
});
