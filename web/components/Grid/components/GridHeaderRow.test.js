import React from 'react';
import { shallow } from 'enzyme';
import GridHeaderRow from './GridHeaderRow';

const columns = [
  {
    name: 'test',
    className: 'col-test',
    headerText: 'Test'
  }
];

describe("GridHeaderRow", () => {
  it("should render", () => {
    const wrapper = shallow(<GridHeaderRow />);
    expect(wrapper.find('.sq-grid-cmp__header-row').length).toBe(1);
  });

  describe('GridHeaderRow:Columns', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<GridHeaderRow columns={columns} />);
    })

    it('should render given columns', () => {
      expect(wrapper.find('.sq-grid-cmp__header-row-cell').length).toBe(1);
    });
    it('should render apply given class on column', () => {
      expect(wrapper.find('.col-test').length).toBe(1);
    });
    it('should have text "Test"', () => {
      expect(wrapper.find('.col-test').text()).toBe('Test');
    })

  });


});