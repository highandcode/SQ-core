import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fake } from 'config_ui';
import { DynamicContent } from './index';

describe('DynamicContent', () => {
  console.log('@@@');
  console.log(fake);
  let mockProps;
  beforeEach(() => {
    mockProps = {
      location: fake.location.create({
        pathname: '/content/en',
      }),
      contentActions: fake.contentActions.create(),
      store: fake.store.create(),
    };
  });
  it('should render DynamicContent with defaults', async () => {
    let _container;
    jest.useFakeTimers();
    await act(() => {
      const { container } = render(<DynamicContent {...mockProps} />);
      _container = container;
      jest.advanceTimersByTime(2000);
    });
    expect(_container.getElementsByClassName('dynamic-content').length).toBe(1);
  });
});
