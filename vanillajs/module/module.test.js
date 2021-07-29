import Module from './module';

describe('Module', () => {
  describe('Basic', () => {
    test('should have Module class', () => {
      expect(Module).toBeDefined();
    });
  });

  describe('Create custom module', () => {
    class FakeModule extends Module {
      constructor() {
        super();
      }
    }

    describe('Creating instance of module', () => {
      let instance;
      beforeEach(() => {
        instance = new FakeModule();
      });

      test('should have $ dom finder object', () => {
        expect(instance.$).toBeDefined();
      });
      test('should have events', () => {
        expect(instance.events).toBeDefined();
      });
    });
  });
});
