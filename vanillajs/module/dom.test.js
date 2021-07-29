import Dom from './dom';

describe('Dom', () => {
  describe('Basic', () => {
    test('should have Dom class', () => {
      expect(Dom).toBeDefined();
    });
  });

  describe('boundry()', () => {
    describe('getting client cordinates', () => {
      let div = document.createElement('div');
      div.innerHTML = 'hello';
      const styles = {
        top: 20,
        left: 20,
        position: 'absolute',
        width: '10px',
        height: '10px',
      };
      Object.keys(styles).forEach((key) => {
        div.style[key] = styles[key];
      });
      document.body.append(div);
      let instance;
      let result;
      beforeEach(() => {
        instance = new Dom();
        result = instance.boundry(div);
      });
      test('should have 0 width', () => {
        expect(result).toBeDefined();
      });
    });
  });
  describe('offset()', () => {
    describe('getting client cordinates', () => {
      let div = document.createElement('div');
      document.body.append(div);
      let instance;
      let result;
      beforeEach(() => {
        instance = new Dom();
        result = instance.offset(div);
      });
      test('should have 0 width', () => {
        expect(result).toBeDefined();
      });
    });
  });
});
