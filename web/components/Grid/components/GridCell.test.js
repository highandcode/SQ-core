import React from 'react';
import { shallow, mount } from 'enzyme';
import GridCell from './GridCell';
import Input from '../../../components/ui/InputField';
import Button from '../../../components/ui/Button';

const columns = [
  {
    name: 'test',
    cmpType: 'Input',
    className: 'col-test',
    headerText: 'Test'
  },
  {
    name: 'test1',
    className: 'col-test1',
    cmpType: 'Input',
    headerText: 'Test1',

  },
  {
    name: 'test2',
    className: 'col-test2',
    cmpType: 'Input',
    headerText: 'Test2',
    beforeRender: jest.fn(() => { return { className: 'col-override', cmpType: 'Button', component: { buttonText: 'hello' } }; })
  }
];

describe("GridCell", () => {
  it("should render", () => {
    const wrapper = shallow(<GridCell />);
    expect(wrapper.find('.sq-grid-cmp__data-cell').length).toBe(1);
  });

  describe('GridCell:Column', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<GridCell column={columns[0]} />);
    });

    it('should render input component', () => {
      expect(wrapper.find(Input).length).toBe(1);
    });
    it('should render apply given class on column', () => {
      expect(wrapper.find('.col-test').length).toBe(1);
    });
  });
  describe('GridCell:Input Component', () => {
    let wrapper, onChange = jest.fn(), onKeyPress = jest.fn(), onBlur = jest.fn();
    beforeEach(() => {
      wrapper = mount(<GridCell column={columns[1]} onChange={onChange} onKeyPress={onKeyPress} onBlur={onBlur} />);
    });
    it('should render input component', () => {
      expect(wrapper.find(Input).length).toBe(1);
    });
    it('should render raise onChange event with child component', () => {
      wrapper.find('input').simulate('change', { target: { value: '1' } });
      expect(onKeyPress).toHaveBeenCalledWith(columns[1], { value: '1' });
    });
    it('should render raise onBlur with child component', () => {
      wrapper.find('input').simulate('change', { target: { value: '12' } });
      wrapper.find('input').simulate('blur');
      expect(onBlur).toHaveBeenCalledWith(columns[1], { value: '12' });
    });
  });

  describe('GridCell:beforeRender', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<GridCell column={columns[2]} />);
    });
    it('should render Button component', () => {
      expect(wrapper.find(Button).length).toBe(1);
    });
  });

});