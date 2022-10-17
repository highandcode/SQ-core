import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicContent from './index';

describe('DynamicContent', () => {
  it('should render DynamicContent with defaults', () => {
    const { container } = render(<DynamicContent />);
    expect(container.getElementsByClassName('dynamic-content').length).toBe(1);
  });

  //   describe('No Data View', () => {
  //     it('should render no columns as no data view', () => {
  //       const { container } = render(<DynamicContent />);
  //       expect(container.getElementsByClassName('sq-grid').length).toBe(1);
  //     });
  //   });
});
