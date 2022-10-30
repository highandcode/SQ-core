import { masks } from './mask';
describe('utils:format', () => {
  describe('currency()', function () {
   test('should return format default in USD', async () => {
      expect(masks.currency.mask(1)).toEqual('$1');
    });
   test('should return -$ in case ', async () => {
      expect(masks.currency.mask('-')).toEqual('$-');
    });
   test('should return -$15 in case ', async () => {
      expect(masks.currency.mask('-15')).toEqual('-$15');
    });
   test('should return -$15. in case ', async () => {
      expect(masks.currency.mask('-15.')).toEqual('-$15.');
    });
   test('should return -$15.0 in case ', async () => {
      expect(masks.currency.mask('-15.0')).toEqual('-$15.0');
    });
  });
  describe('number()', function () {
   test('should number in format', async () => {
      expect(masks.number.mask('24234324', {pattern: 'DDDDD DD'})).toEqual('24234 32');
    });
   test('should number in format', async () => {
      expect(masks.number.mask('24234324', {pattern: '(DDDDD) DD'})).toEqual('(24234) 32');
    });
    
  });
  describe('phone()', function () {
   test('should return (991) 0', async () => {
      expect(masks.phone.mask(9910)).toEqual('(991) 0');
    });
   test('should return (991) 070', async () => {
      expect(masks.phone.mask(991070)).toEqual('(991) 070');
    });
   test('should return (991) 070 2765', async () => {
      expect(masks.phone.mask(9910702765)).toEqual('(991) 070-2765');
    });
  });
});
