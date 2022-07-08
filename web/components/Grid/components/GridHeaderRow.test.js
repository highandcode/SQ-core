import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GridHeaderRow from './GridHeaderRow';

const columns = [
  {
    name: 'test',
    className: 'col-test',
    headerText: 'Test',
  },
];

describe('GridHeaderRow', () => {
  it('should render', () => {
    const { container } = render(<GridHeaderRow />);
    expect(container.getElementsByClassName('sq-grid__header-row').length).toBe(
      1
    );
  });

  describe('GridHeaderRow:Columns', () => {
    let wrapper;
    beforeEach(() => {
      const { container } = render(<GridHeaderRow columns={columns} />);
      wrapper = container;
    });

    it('should render given columns', () => {
      expect(
        wrapper.getElementsByClassName('sq-grid__header-row-cell').length
      ).toBe(1);
    });
    it('should render apply given class on column', () => {
      expect(wrapper.getElementsByClassName('col-test').length).toBe(1);
    });
    it('should have text "Test"', async () => {
      expect(await screen.findByText('Test')).toBeVisible();
    });
  });
});
