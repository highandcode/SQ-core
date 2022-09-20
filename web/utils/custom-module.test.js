import CustomModule from './custom-module';

describe('utils:CustomModule', () => {
  describe('CustomModule()', function () {
    it('should have defined', async () => {
      expect(CustomModule).toBeDefined();
    });
  });
  describe('CustomModule: Add Module', function () {
    let module;
    beforeEach(() => {
      module = new CustomModule();
      module.add('test', {
        addUser: (p1, p2) => {
          return 'test';
        },
      });
    });
    it('should be able to add module', async () => {
      expect(module.modules.test).toBeDefined();
    });
    it('should be able to add module', async () => {
      var result = await module.execute('test.addUser', 'test', 'in');
      expect(result).toEqual('test');
    });
  });
  describe('CustomModule: Add Async Module', function () {
    let module;
    beforeEach(() => {
      module = new CustomModule();
      module.add('test', {
        addUser: (response, action) => {
          return new Promise((resolve) => {
            setTimeout(() => resolve({ test: true, p1: response, p2: action }), 100);
          });
        },
      });
    });
    it('should be able to execute async module', async () => {
      var result = await module.execute('test.addUser', 'test', 'in');
      expect(result.test).toEqual(true);
      expect(result.p1).toEqual('test');
    });
  });
});
