import { parseCustomModule, processParams } from './index';
import { processor } from '../../utils';
processor.add('test', {
  getOption: (value, options) => {
    return value;
  },
  testParams: (value, options, defaultValue, state) => {
    return { value, options, defaultValue, state };
  },
});
describe('reducer:content', () => {
  describe('parseCustomModule()', function () {
    it('should have defined', async () => {
      expect(parseCustomModule).toBeDefined();
    });
    describe('parseCustomModule(): parsing plain string', function () {
      it('should be able to return blank params with module name', async () => {
        expect(parseCustomModule('globals.options')).toMatchObject({
          module: 'globals.options',
          params: {},
        });
      });
    });
    describe('parseCustomModule(): parsing with function params string', function () {
      it('should be able to return blank params with module name', async () => {
        expect(parseCustomModule('globals.filterOptions(valueField: text, textField: item)')).toMatchObject({
          module: 'globals.filterOptions',
          params: {
            valueField: 'text',
            textField: 'item',
          },
        });
      });
    });
  });

  describe('processParams()', () => {
    it('should return hard coded data', () => {
      expect(
        processParams(
          {},
          {
            test: 'gotcha',
          }
        )
      ).toMatchObject({
        test: 'gotcha',
      });
    });
    it('should return nested data properly if not found', () => {
      const result = processParams(
        {
          app: {
            local: true,
          },
          content: {
            a: {
              b: true,
              c: {
                d: 1,
              },
            },
          },
          c: true,
          d: {
            b: true,
          },
        },
        {
          newTest: {
            k1: '.k1',
            k2: '.k2',
            k3: '.k3',
          },
          a: {
            test: {
              app1: '.gotcha',
              app2: {
                a: '.gotcha',
              },
              app3: '.d',
            },
          },
        }
      );
      console.log(result);
      expect(result).toMatchObject({
        newTest: {},
        a: {
          test: {
            app2: {},
            app3: {
              b: true,
            },
          },
        },
      });
    });
    it('should return data from userData matched key', () => {
      expect(
        processParams(
          {
            gotcha: 'value 2',
          },
          {
            test: '.gotcha',
          }
        )
      ).toMatchObject({
        test: 'value 2',
      });
    });
    it('should return data from userData matched key', () => {
      expect(
        processParams(
          {
            gotcha: 'value 2',
            user: {
              fName: 'John',
              lName: 'Cena',
              dept: 'WWE',
            },
          },
          {
            test: '.gotcha',
            nested: {
              param1: '.gold',
            },
            user: '.user',
          }
        )
      ).toMatchObject({
        test: 'value 2',
        nested: {},
        user: {
          fName: 'John',
          lName: 'Cena',
          dept: 'WWE',
        },
      });
    });
    describe('match validator', () => {
      it('should execute set result of match', () => {
        expect(
          processParams(
            {
              gotcha: 'value 2',
              user: {
                fName: 'John',
                lName: 'Cena',
                dept: 'WWE',
              },
            },
            {
              result: {
                value: {
                  match: {
                    gotcha: [
                      {
                        type: 'equals',
                        matchValue: 'value 2',
                      },
                    ],
                  },
                },
              },
            }
          )
        ).toMatchObject({
          result: {
            value: true,
          },
        });
      });
    });
    describe('custom parser', () => {
      it('should execute set result of match', () => {
        expect(
          processParams(
            {
              dynamicValue: 'dyno',
            },
            {
              result: '::test.getOption::test',
              resultWithDynamic: '::test.getOption::.dynamicValue',
            }
          )
        ).toMatchObject({
          result: 'test',
          resultWithDynamic: 'dyno',
        });
      });
      it('should pass params and options to parser function ', () => {
        expect(
          processParams(
            {
              dynamicValue: 'dyno',
              'obj.nest.timer': 12,
            },
            {
              result: '::test.testParams(p1: gold)::test',
              resultWithDynamic: '::test.testParams(p2: gold)::.dynamicValue',
              keysWithDot: '.obj.nest.timer',
            }
          )
        ).toMatchObject({
          result: {
            value: 'test',
            options: {
              p1: 'gold',
            },
          },
          keysWithDot: 12,
          resultWithDynamic: {
            value: 'dyno',
            options: {
              p2: 'gold',
            },
          },
        });
      });
    });
  });
});
