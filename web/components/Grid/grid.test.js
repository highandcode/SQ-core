import React from 'react';
import { shallow } from 'enzyme';
import Grid from './index';
import GridHeader from './components/GridHeaderRow';
import GridRow from './components/GridRow';
import Button from '../ui/Button';

const columns = [
  {
    name: 'test',
    className: 'col-test'
  }
];
const data1 = [
  {
    test: 'Hello'
  },
  {
    test: 'Hello2'
  }
]

describe("Grid", () => {
  it("should render Grid with defaults", () => {
    const wrapper = shallow(<Grid />);
    expect(wrapper.find('.sq-grid').length).toBe(1);
  });

  describe('Grid:No Data View', () => {

    it('should render no columns as no data view', () => {
      const wrapper = shallow(<Grid fields={columns} />);
      expect(wrapper.find('.sq-grid').length).toBe(1);
    });

  });

  describe('Grid:Data View', () => {
    let wrapper;
    describe('Basic Data View', () => {
      beforeEach(() => {
        wrapper = shallow(<Grid columns={columns} data={data1} />);
      });
      it('should render header', () => {
        expect(wrapper.find(GridHeader).length).toBe(1);
      });

      it('should render body wrapper', () => {
        expect(wrapper.find('.sq-grid__body').length).toBe(1);
      });
      it('should render two rows', () => {
        expect(wrapper.find(GridRow).length).toBe(2);
      });
    });
    describe('Grid:Add new', () => {
      let wrapper, onAddNew = jest.fn();
      describe('AddNew Button', () => {
        beforeEach(() => {
          wrapper = shallow(<Grid columns={columns} onAddNew={onAddNew} showAdd={true} />);
        });
        it('should have button to add', () => {
          expect(wrapper.find(Button).length).toBe(1);
        });
        it('should have button to add', () => {
          expect(wrapper.find(Button).length).toBe(1);
        });
        it('should raise onAddNew event on click of add button', () => {
          wrapper.find(Button).simulate('click');
          expect(onAddNew).toHaveBeenCalled();
        });
      });
      describe('Grid:onChange', () => {
        let wrapper, onChange = jest.fn();
        describe('onChange', () => {
          beforeEach(() => {
            wrapper = shallow(<Grid columns={columns} onChange={onChange} />);
          });
          it('should call row change with given row', () => {
            wrapper.instance().handleRowChange({ col: '1' }, { value: '1' }, { row: '1' });
            expect(onChange).toHaveBeenCalledWith({ value: '1' }, { col: '1' }, { row: '1' });
          });
        });
      });
    });
    describe('Grid:Custom wrapper class', () => {

      it('should have button to add', () => {
        let wrapper = shallow(<Grid className="custom-class" columns={columns} data={data1} />);
        expect(wrapper.find('.custom-class').length).toBe(1);
      });

    });
    describe('Grid:showHeader={true/false}', () => {
      it('should have header by default', () => {
        let wrapper = shallow(<Grid columns={columns} data={data1} />);
        expect(wrapper.find('.sq-grid__header').length).toBe(1);
      });
      it('should  have no header with showHeader={false} ', () => {
        let wrapper = shallow(<Grid columns={columns} showHeader={false} data={data1} />);
        expect(wrapper.find('.sq-grid__header').length).toBe(0);
      });
      it('should have header howHeader={true}', () => {
        let wrapper = shallow(<Grid columns={columns} showHeader={true} data={data1} />);
        expect(wrapper.find('.sq-grid__header').length).toBe(1);
      });

    });
  });

});