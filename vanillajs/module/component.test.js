import Component from './comonent';
class FakeComponent extends Component {
  constructor(el, config) {
    super(el, config);
  }
}
describe('Component', () => {
  describe('Basic', () => {
    test('should have Component class', () => {
      expect(Component).toBeDefined();
    });
  });

  describe('Create custom module', () => {
    describe('Creating instance of module', () => {
      let instance;
      let dom = document.createElement('div');
      beforeEach(() => {
        instance = new FakeComponent(dom, {
          test: true,
        });
      });

      test('should have $ dom finder object', () => {
        expect(instance.$).toBeDefined();
      });
      test('should have events', () => {
        expect(instance.events).toBeDefined();
      });
    });
  });
  describe('getConfig(key)', () => {
    describe('get config settings by key', () => {
      let instance;
      let dom = document.createElement('div');
      beforeEach(() => {
        instance = new FakeComponent(dom, {
          test: false,
        });
      });

      test('should return true if key exists', () => {
        expect(instance.getConfig('test')).toBe(false);
      });
      test("should return null if key doesn't exists", () => {
        expect(instance.getConfig('test2')).toBe(null);
      });
    });
  });
  describe('setConfig(key)', () => {
    describe('set config settings by key', () => {
      let instance;
      let dom = document.createElement('div');
      beforeEach(() => {
        instance = new FakeComponent(dom, {
          test: false,
        });
      });

      test('should return true if key exists', () => {
        instance.setConfig('test', true);
        expect(instance.getConfig('test')).toBe(true);
      });
      test("should return null if key doesn't exists", () => {
        instance.setConfig('test2', 'GOLD');
        expect(instance.getConfig('test2')).toBe('GOLD');
      });
    });
  });
});
