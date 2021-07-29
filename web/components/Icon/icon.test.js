import React from 'react';
import Icon from './index';
import { shallow } from 'enzyme';

describe('Icon', () => {

  describe('Icon:Defaults', () => {
    it('should render default icon', () => {
      const icon = shallow(<Icon />)
      expect(icon.find('.sq-icon.sq-icon--default').length).toBe(1);
    });
    it('should render given varient', () => {
      const icon = shallow(<Icon name='help' variant={`error`} />)
      expect(icon.find('.sq-icon.sq-icon--error').length).toBe(1);
    });
    it('should render given size', () => {
      const icon = shallow(<Icon name='help' size={`large`} />)
      expect(icon.find('.sq-icon.sq-icon--large').length).toBe(1);
    });
  });
});