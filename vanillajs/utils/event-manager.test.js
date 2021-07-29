import EventManager from './event-manager';

describe('EventManager', () => {
  describe('Basic', () => {
    test('should create object', () => {
      expect(new EventManager()).toBeDefined();
    });
  });

  describe('on/off', () => {
    describe('on()', () => {
      let mgr;
      beforeEach(() => {
        mgr = new EventManager();
      });

      test('should on() function', () => {
        expect(typeof mgr.on).toBe('function');
      });
      test('should bind given funciton', () => {
        let spyFn = jest.fn();
        mgr.on('customEvent', spyFn);
        mgr.emit('customEvent');
        expect(spyFn).toHaveBeenCalled();
      });
    });
    describe('off()', () => {
      let mgr;
      beforeEach(() => {
        mgr = new EventManager();
      });

      test('should off() function', () => {
        expect(typeof mgr.off).toBe('function');
      });
      test('should unbind given funciton', () => {
        let spyFn = jest.fn();
        mgr.on('customEvent', spyFn);
        mgr.off('customEvent', spyFn);
        mgr.emit('customEvent');
        expect(spyFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('enable()/disable()', () => {
    describe('enable()', () => {
      let mgr;
      beforeEach(() => {
        mgr = new EventManager();
      });

      test('should enable() function', () => {
        expect(typeof mgr.enable).toBe('function');
      });
      test('should enable the events', () => {
        let spyFn = jest.fn();
        mgr.on('customEvent', spyFn);
        mgr.enable();
        mgr.emit('customEvent');
        expect(spyFn).toHaveBeenCalled();
      });
    });
    describe('disable()', () => {
      let mgr;
      beforeEach(() => {
        mgr = new EventManager();
      });

      test('should disable() function', () => {
        expect(typeof mgr.disable).toBe('function');
      });
      test('should disable all events funciton', () => {
        let spyFn = jest.fn();
        mgr.on('customEvent', spyFn);
        mgr.disable();
        mgr.emit('customEvent');
        expect(spyFn).not.toHaveBeenCalled();
      });
    });
  });

  describe('Multiple events', () => {
    describe('on()', () => {
      let mgr;
      let spyFn;
      let spyFn2;
      let spyFn3;
      beforeEach(() => {
        mgr = new EventManager();
        spyFn = jest.fn();
        spyFn2 = jest.fn();
        spyFn3 = jest.fn();
        mgr.on('customEvent', spyFn);
        mgr.on('customEvent', spyFn2);
        mgr.on('customEvent', spyFn3);
        mgr.emit('customEvent');
      });

      test('should call spnFn', () => {
        expect(spyFn).toHaveBeenCalled();
      });
      test('should call spyFn2', () => {
        expect(spyFn2).toHaveBeenCalled();
      });
      test('should call spyFn3', () => {
        expect(spyFn2).toHaveBeenCalled();
      });
    });
    describe('off() with multiple events', () => {
      let mgr;
      let spyFn;
      let spyFn2;
      let spyFn3;
      beforeEach(() => {
        mgr = new EventManager();
        spyFn = jest.fn();
        spyFn2 = jest.fn();
        spyFn3 = jest.fn();
        mgr.on('customEvent', spyFn);
        mgr.on('customEvent', spyFn2);
        mgr.on('customEvent', spyFn3);
      });
      test('should remove 2 events funcitons', () => {
        mgr.off('customEvent', spyFn2);
        mgr.emit('customEvent');
        expect(spyFn).toHaveBeenCalled();
        expect(spyFn2).not.toHaveBeenCalled();
        expect(spyFn3).toHaveBeenCalled();
      });
      test('should remove all events funcitons', () => {
        mgr.off('customEvent');
        mgr.emit('customEvent');
        expect(spyFn).not.toHaveBeenCalled();
        expect(spyFn2).not.toHaveBeenCalled();
        expect(spyFn3).not.toHaveBeenCalled();
      });
    });

    describe('off() with multiple events', () => {
      let mgr;
      let spyFn;
      let spyFn2;
      let spyFn3;
      beforeEach(() => {
        mgr = new EventManager();
        spyFn = jest.fn(() => true);
        spyFn2 = jest.fn(() => false);
        spyFn3 = jest.fn(() => false);
        mgr.on('customEvent', spyFn);
        mgr.on('customEvent', spyFn2);
        mgr.on('customEvent', spyFn3);
      });
      test('should stop once false is returned', () => {
        mgr.emit('customEvent');
        expect(spyFn).toHaveBeenCalled();
        expect(spyFn2).toHaveBeenCalled();
        expect(spyFn3).not.toHaveBeenCalled();
      });
    });
  });

  describe('Passing events in constructor', () => {
    describe('events object', () => {
      let mgr;
      let onRender;
      let onChange;
      let onKeyClick;
      beforeEach(() => {
        onKeyClick = jest.fn();
        onChange = jest.fn();
        onRender = jest.fn();
        mgr = new EventManager({
          events: {
            onRender,
            onKeyClick,
            onChange,
          },
        });
      });

      test('should have onRender binded', () => {
        mgr.emit('onRender');
        expect(onRender).toHaveBeenCalled();
      });
      test('should have onKeyClick binded', () => {
        mgr.emit('onKeyClick');
        expect(onKeyClick).toHaveBeenCalled();
      });
      test('should have onChange binded', () => {
        mgr.emit('onChange');
        expect(onChange).toHaveBeenCalled();
      });
    });
  });
});
