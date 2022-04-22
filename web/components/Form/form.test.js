import React from 'react';
import Form, { registerComponents } from './index';
import { createFakeComponent } from '../../../tests/utils/fakeComp';
import { mount } from 'enzyme';

let fakeInput, fakeSelect;

const setupFakeComps = () => {
  fakeInput = createFakeComponent();
  fakeSelect = createFakeComponent();
  registerComponents({
    Input: fakeInput.component,
    Select: fakeSelect.component
  });
}



describe("Form", () => {
  beforeEach(() => {
    setupFakeComps();
  });

  it("should not throw any error", function () {
    let wrap = mount(<Form />);
    expect(wrap.find('.sq-form').length).toBe(1);
  });

  // describe("Form:rendering fields", function () {
  //   const formConfig = {
  //     fields: [
  //       {
  //         name: 'test',
  //         cmpType: 'Input',
  //         type: 'text'
  //       },
  //       {
  //         name: 'test1',
  //         cmpType: 'Select',
  //         options: [{
  //           value: 'en',
  //           text: 'English'
  //         }]
  //       }
  //     ]
  //   };
  //   let wrapper;
  //   beforeEach(() => {
  //     wrapper = mount(<Form fields={formConfig.fields} />);
  //   });
  //   it('should have "sq-form" as wrapper class', () => {
  //     expect(wrapper.find('.sq-form').length).toBe(1);
  //   })
  //   it('should call Input component with provided props', () => {
  //     expect(fakeInput.props().name).toEqual('test');
  //   });
  //   it('should call Select component with provided name property', () => {
  //     console.log('@@@', fakeSelect);
  //     expect(fakeSelect.props().name).toEqual('test1');
  //   });
  //   it('should call Select component with provided options property', () => {
  //     expect(fakeSelect.props().options.length).toBe(1);
  //   });
  // });

  // describe("Form:rendering actions", function () {
  //   let wrapper, actionParams, formData;
  //   const formConfig = {
  //     fields: [
  //       {
  //         name: 'test',
  //         cmpType: 'Input',
  //         className: 'test-comp',
  //         type: 'text'
  //       },
  //       {
  //         name: 'test1',
  //         cmpType: 'Select',
  //         options: [{
  //           value: 'en',
  //           text: 'English'
  //         }]
  //       }
  //     ],
  //     actions: [{
  //       cmpType: 'Button',
  //       actionType: 'submit'
  //     }],
  //     onAction: jest.fn((data, action) => {
  //       formData = data;
  //       actionParams = action;
  //     }),
  //     onChange: jest.fn()
  //   };
  //   beforeEach(() => {
  //     wrapper = mount(<Form
  //       fields={formConfig.fields}
  //       actions={formConfig.actions}
  //       onAction={formConfig.onAction}
  //       onChange={formConfig.onChange}
  //     />);
  //   });
  //   it('should have "sq-form__action" as wrapper class of actions', () => {
  //     expect(wrapper.find('.sq-form__action').length).toBe(1);
  //   })
  //   it('should render button as action', () => {
  //     expect(wrapper.find('.sq-form__action button').length).toBe(1);
  //   });
  //   it('should call onAction on action click', () => {
  //     wrapper.find('.sq-form__action button').simulate('click');
  //     expect(formConfig.onAction).toHaveBeenCalled();
  //   });
  //   it('should call onAction with action object', () => {
  //     wrapper.find('.sq-form__action button').simulate('click');
  //     expect(actionParams.actionType).toBe('submit');
  //   });
  //   it('should call onAction with form data', () => {
  //     fakeInput.props().onChange({ value: 'test' }, formConfig.fields[0]);
  //     fakeSelect.props().onChange({ value: 'test1' }, formConfig.fields[1]);
  //     wrapper.find('.sq-form__action button').simulate('click');
  //     expect(formData.test).toBe('test');
  //   });
  // });

  // describe("Form:onFieldChange(data, field)", () => {
  //   let wrapper, fieldInfo, formData;
  //   const formConfig = {
  //     fields: [
  //       {
  //         name: 'test',
  //         cmpType: 'Input',
  //         className: 'test-comp',
  //         type: 'text'
  //       },
  //       {
  //         name: 'test1',
  //         cmpType: 'Select',
  //         options: [{
  //           value: 'en',
  //           text: 'English'
  //         }]
  //       }
  //     ],
  //     onFieldChange: jest.fn((data, field) => {
  //       formData = data;
  //       fieldInfo = field;
  //     }),
  //   };
  //   beforeEach(() => {
  //     wrapper = mount(<Form
  //       fields={formConfig.fields}
  //       onFieldChange={formConfig.onFieldChange}
  //     />);
  //   });
  //   it('should call onFieldChange with test value', () => {
  //     fakeInput.props().onChange({ value: 'test' }, formConfig.fields[0]);
  //     expect(formData.value).toBe('test');
  //   });
  //   it('should call onFieldChange with test field', () => {
  //     fakeInput.props().onChange({ value: 'test' }, formConfig.fields[0]);
  //     expect(fieldInfo.name).toBe('test');
  //   });
  //   it('should call onFieldChange with test1 field', () => {
  //     fakeSelect.props().onChange({ value: 'test1' }, formConfig.fields[1]);
  //     expect(formData.value).toBe('test1');
  //   });
  //   it('should call onFieldChange with test field', () => {
  //     fakeSelect.props().onChange({ value: 'test1' }, formConfig.fields[1]);
  //     expect(fieldInfo.name).toBe('test1');
  //   });
  // });
  
  // describe("Form:Action Defaults", function () {
  //   let wrapper, actionParams, formData;
  //   const formConfig = {
  //     actions: [{
  //       actionType: 'submit'
  //     }]
  //   };
  //   beforeEach(() => {
  //     wrapper = mount(<Form
  //       actions={formConfig.actions}
  //     />);
  //   });
  //   it('should have "sq-form__action" as wrapper class of actions', () => {
  //     expect(wrapper.find('.sq-form__action').length).toBe(1);
  //   })
  //   it('should render button as default action component', () => {
  //     expect(wrapper.find('.sq-form__action button').length).toBe(1);
  //   });

  // });

});
