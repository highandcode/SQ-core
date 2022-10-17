import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Grid from './index';

const columns = [
  {
    name: 'test',
    className: 'col-test',
  },
];
const data1 = [
  {
    test: 'Hello',
  },
  {
    test: 'Hello2',
  },
];

describe('Grid', () => {
  it('should render Grid with defaults', () => {
    const { container } = render(<Grid />);
    expect(container.getElementsByClassName('sq-grid').length).toBe(1);
  });

  describe('Grid:No Data View', () => {
    it('should render no columns as no data view', () => {
      const { container } = render(<Grid fields={columns} />);
      expect(container.getElementsByClassName('sq-grid').length).toBe(1);
    });
  });

  describe('Grid:Data View', () => {
    let wrapper;
    describe('Basic Data View', () => {
      beforeEach(() => {
        const { container } = render(<Grid columns={columns} data={data1} />);
        wrapper = container;
      });
      it('should render header', () => {
        expect(wrapper.getElementsByClassName('sq-grid__header').length).toBe(1);
      });

      it('should render body wrapper', () => {
        expect(wrapper.getElementsByClassName('sq-grid__body').length).toBe(1);
      });
      it('should render two rows', () => {
        expect(screen.getAllByRole('row').length).toBe(2);
      });
    });
  });
  describe('Grid:Custom wrapper class', () => {
    it('should have button to add', () => {
      let { container } = render(<Grid className="custom-class" columns={columns} data={data1} />);
      expect(container.getElementsByClassName('custom-class').length).toBe(1);
    });
  });
});
