import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { fake } from 'config_ui';
import { DynamicContent } from './index';

describe('DynamicContent', () => {
  describe('Loading page from server', () => {
    let mockProps;
    let _container;
    beforeEach(async () => {
      mockProps = {
        location: fake.location.create({
          pathname: '/content/en',
        }),
        contentActions: fake.contentActions.create(),
        store: fake.store.create(),
      };
      jest.useFakeTimers();
      await act(() => {
        const { container } = render(<DynamicContent {...mockProps} />);
        jest.advanceTimersByTime(2000);
        _container = container;
      });
    });
    it('should render DynamicContent with defaults', async () => {
      expect(_container.getElementsByClassName('dynamic-content').length).toBe(1);
    });
    it('should call fetchPageContent', async () => {
      expect(mockProps.contentActions.fetchContentPage).toHaveBeenCalled();
    });
  });

  describe('Rendering content page', () => {
    let mockProps;
    let _container;
    beforeEach(async () => {
      mockProps = {
        location: fake.location.create({
          pathname: '/content/en',
        }),
        contentActions: fake.contentActions.create({
          fetchContentPage: {
            data: {
              pageData: {
                items: [
                  {
                    component: 'Form',
                    name: 'test',
                    fields: [
                      {
                        cmpType: 'Input',
                        name: 'name1',
                        label: 'Test Label 1',
                      },
                    ],
                  },
                ],
              },
            },
          },
        }),
        store: fake.store.create(),
      };
      jest.useFakeTimers();
      await act(() => {
        const { container } = render(<DynamicContent {...mockProps} />);
        jest.advanceTimersByTime(2000);
        _container = container;
      });
    });
    it('should render Form with defaults', async () => {
      expect(_container.getElementsByClassName('sq-form').length).toBe(1);
    });
    it('should call update state onChange() event', async () => {
      await fireEvent.change(screen.getByTestId('test_label_1_input'), { target: { value: 'test' } });
      expect(mockProps.contentActions.updateUserData).toHaveBeenCalledWith({
        test: {
          name1: 'test',
        },
      });
      expect(mockProps.contentActions.mergeUserData).toHaveBeenCalledWith(undefined);
    });
  });

  describe('Form with failed validations', () => {
    let mockProps;
    let _container;
    beforeEach(async () => {
      mockProps = {
        location: fake.location.create({
          pathname: '/content/en',
        }),
        contentActions: fake.contentActions.create({
          fetchContentPage: {
            data: {
              pageData: {
                items: [
                  {
                    component: 'Form',
                    name: 'test2',
                    fields: [
                      {
                        cmpType: 'Input',
                        name: 'name2',
                        label: 'Test Label 2',
                        validators: [
                          {
                            type: 'required',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    component: 'Button',
                    buttonText: 'Submit',
                    actionType: 'submit',
                  },
                ],
              },
            },
          },
        }),
        store: fake.store.create(),
      };
      jest.useFakeTimers();
      await act(() => {
        const { container } = render(<DynamicContent {...mockProps} />);
        jest.advanceTimersByTime(2000);
        _container = container;
      });
    });
    it('should create error object if validaitons are not passed', async () => {
      await fireEvent.change(screen.getByTestId('test_label_2_input'), { target: { value: ' ' } });
      expect(mockProps.contentActions.updateUserData).toHaveBeenNthCalledWith(2, {
        test2_errors: {
          name2: {
            error: true,
            errorMessage: 'This field is required',
          },
        },
      });
      expect(mockProps.contentActions.updateUserData).toHaveBeenNthCalledWith(3, {
        test2: {
          name2: ' ',
        },
      });
      expect(mockProps.contentActions.mergeUserData).toHaveBeenCalledWith(undefined);
    });
    it('should not call to postApi()', async () => {
      await fireEvent.click(screen.getByTestId('submit_button'));
      expect(mockProps.contentActions.postApi).not.toHaveBeenCalled();
    });
  });

  describe('Form with correct  data', () => {
    let mockProps;
    let _container;
    beforeEach(async () => {
      mockProps = {
        location: fake.location.create({
          pathname: '/content/en',
        }),
        contentActions: fake.contentActions.create({
          fetchContentPage: {
            data: {
              pageData: {
                items: [
                  {
                    component: 'Form',
                    name: 'test2',
                    fields: [
                      {
                        cmpType: 'Input',
                        name: 'name2',
                        label: 'Test Label 2',
                        validators: [
                          {
                            type: 'required',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    component: 'Button',
                    buttonText: 'Submit',
                    actionType: 'submit',
                  },
                ],
              },
            },
          },
        }),
        store: fake.store.create({
          userData: {
            test2: {
              name2: 'hi',
            },
          },
        }),
      };
      jest.useFakeTimers();
      await act(() => {
        const { container } = render(<DynamicContent {...mockProps} />);
        jest.advanceTimersByTime(2000);
        _container = container;
      });
    });
    it('should call to postApi()', async () => {
      await fireEvent.click(screen.getByTestId('submit_button'));
      expect(mockProps.contentActions.postApi).toHaveBeenCalledWith({
        actionType: 'submit',
        buttonText: 'Submit',
        component: 'Button',
      });
    });
  });
});
