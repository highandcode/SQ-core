import classes from './classes';

describe('Classes', () => {
  describe('Basic', () => {
    test('should have generate method', () => {
      expect(classes.generate).toBeDefined();
    });
    test('should have generateClasses method', () => {
      expect(classes.generateClasses).toBeDefined();
    });
  });

  describe('Create BEM stucture', () => {
    describe('BEM with element and modifier', () => {
      let result;
      beforeEach(() => {
        result = classes.generate({
          slider: {
            prefix: 'sq-slider',
            container: 'container',
            disabled: 'm:disabled',
          },
        });
      });

      test('should have disabled as modifier', () => {
        expect(result.slider.disabled).toBe('sq-slider--disabled');
      });
      test('should have main class', () => {
        expect(result.slider.main).toBe('sq-slider__main');
      });
      test('should have container as element class', () => {
        expect(result.slider.container).toBe('sq-slider__container');
      });
      test('should have root class', () => {
        expect(result.slider.root).toBe('sq-slider');
      });
      test('should not have prefix class', () => {
        expect(result.slider.perfix).not.toBeDefined();
      });
    });
  });
});
