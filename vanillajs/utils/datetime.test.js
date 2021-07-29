import MDateTime from './datetime';
const date = '2020-01-01T12:34:00.00Z';

describe('MDateTime', () => {
  describe('Basic', () => {
    test('should be able to create object', () => {
      expect(new MDateTime(date)).toBeDefined();
    });
    test('should add days', () => {
      let obj = new MDateTime(date);
      obj.add(1, 'day');
      expect(obj.day()).toBe(2);
    });
  });
});
