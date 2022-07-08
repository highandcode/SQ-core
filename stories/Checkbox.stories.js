import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import { CheckboxField } from '../web/components/ui/Checkbox';

export default {
  title: 'Example/CheckboxField',
  component: CheckboxField,
  argTypes: {},
};

const Template = (args) => <CheckboxField {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Checkbox',
  text: 'Checkbox',
  selectedValue: 'new',
  value: 'new',
};

export const WithStringValues = Template.bind({});
WithStringValues.args = {
  label: 'Checkbox',
  text: 'Checkbox',
  defaultValue: 'NO',
  selectedValue: 'YES',
  value: 'NO',
};

export const WithBooleanValuesChecked = Template.bind({});
WithBooleanValuesChecked.args = {
  label: 'Checkbox',
  text: 'Checkbox',
  defaultValue: false,
  selectedValue: true,
  value: true,
};

export const WithBooleanValuesUnChecked = Template.bind({});
WithBooleanValuesUnChecked.args = {
  label: 'Checkbox',
  text: 'Checkbox',
  defaultValue: false,
  selectedValue: true,
  value: false,
};
