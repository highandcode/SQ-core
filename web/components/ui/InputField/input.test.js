import React from 'react';
import { mount } from 'enzyme';
import Input from './index';


describe("Input", () => {
  it("should render Input component without crash", () => {
    const wrapper = mount(<Input />);
  });
  describe('Input:focus', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<Input />);
    });
    it('should have "sq-input-field--focused" class while on focus', () => {
      wrapper.find('input').simulate('focus');
      expect(wrapper.find('.sq-input-field.sq-input-field--focused').length).toBe(1);
    });
  });
  describe('Input:onBlur()', () => {
    let wrapper,
      onBlur = jest.fn();
    beforeEach(() => {
      wrapper = mount(<Input onBlur={onBlur} />);
      wrapper.find('input').simulate('focus');
    });
    it('should call onBlur with entered value', () => {
      wrapper.find('input').simulate('change', { target: { value: 'hello' } });
      wrapper.find('input').simulate('blur');
      expect(onBlur).toHaveBeenCalledWith({ value: 'hello' });
    });
  });
  describe('Input:onChange()', () => {
    let wrapper,
      onChange = jest.fn();
    beforeEach(() => {
      wrapper = mount(<Input onChange={onChange} />);
      wrapper.find('input').simulate('focus');
    });
    it('should call onChange with entered value', () => {
      wrapper.find('input').simulate('change', { target: { value: 'hello' } });
      wrapper.find('input').simulate('blur');
      expect(onChange).toHaveBeenCalledWith({ value: 'hello' });
    });
  });
  describe('Input:onKeyPress()', () => {
    let wrapper,
      onKeyPress = jest.fn();
    beforeEach(() => {
      wrapper = mount(<Input onKeyPress={onKeyPress} />);
      wrapper.find('input').simulate('focus');
    });
    it('should call onKeyPress with entered value', () => {
      wrapper.find('input').simulate('change', { target: { value: 'hello' } });
      expect(onKeyPress).toHaveBeenCalledWith({ value: 'hello' });
    });
  });
});