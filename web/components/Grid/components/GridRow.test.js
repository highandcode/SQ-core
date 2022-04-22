import React from 'react';
import { shallow, mount } from 'enzyme';
import GridRow from './GridRow';
import GridCell from './GridCell';

const columns = [
  {
    name: 'name',
    className: 'col-name',
    headerText: 'Name',
    cmpType: 'Input'
  },
  {
    name: 'designation',
    className: 'col-designation',
    headerText: 'Designation',
    cmpType: 'Input'
  }
];

describe("GridRow", () => {
  it("should render", () => {
    const wrapper = shallow(<GridRow />);
    expect(wrapper.find('.sq-grid__data-row').length).toBe(1);
  });

  describe('GridRow:Columns', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<GridRow columns={columns} data={{ name: 'Hello', designation: 'Desig' }} />);
    });
    it('should render apply given class on column', () => {
      expect(wrapper.find(GridCell).length).toBe(2);
    });

  });
  describe('GridRow:onRowChange', () => {
    let wrapper, onRowChange = jest.fn();
    beforeEach(() => {
      wrapper = mount(<GridRow columns={columns} data={{ name: 'Hello', designation: 'Desig' }} onRowChange={onRowChange} />);
      wrapper.find('input').at(0).simulate('change', { target: { value: 'dssf' } });
      wrapper.find('input').at(0).simulate('blur');
    });

    it('should render given columns', () => {
      expect(onRowChange).toHaveBeenCalled();
    });

  });
  describe('GridRow:onColumnChange', () => {
    let wrapper, onColumnChange = jest.fn();
    beforeEach(() => {
      wrapper = mount(<GridRow columns={columns} data={{  name: 'Hello', designation: 'Desig' }} onColumnChange={onColumnChange} />);
      wrapper.find('input').at(0).simulate('change', { target: { value: 'dssf' } });
      wrapper.find('input').at(0).simulate('blur');
    });

    it('should call onColumnChange', () => {
      expect(onColumnChange).toHaveBeenCalled();
    });

  });
  describe('GridRow:onFieldBlur', () => {
    let wrapper, onFieldBlur = jest.fn();
    beforeEach(() => {
      wrapper = mount(<GridRow columns={columns} data={{ name: 'Hello', designation: 'Desig' }} onFieldBlur={onFieldBlur} />);
      wrapper.find('input').at(0).simulate('change', { target: { value: 'dssf' } });
      wrapper.find('input').at(0).simulate('blur');
    });

    it('should call on onFieldBlur()', () => {
      expect(onFieldBlur).toHaveBeenCalled();
    });

  });
});