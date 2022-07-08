import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Switch from '../web/components/ui/Switch';

export default {
  title: 'Example/Switch',
  component: Switch,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = React.useState('');
  return <Switch {...args} value={value || args.value} onChange={(val) => setValue(val.value)} />;
};

export const WithChecked = Template.bind({});
WithChecked.args = {
  label: 'Click Here',
  value: true,
};

export const WithUnchecked = Template.bind({});
WithUnchecked.args = {
  label: 'Click Here',
  value: false,
};

export const WithStringBlankAndStringCheck = Template.bind({});
WithStringBlankAndStringCheck.args = {
  label: 'Click Here',
  value: 'YES',
  defaultValue: 'NO',
  selectedValue: 'YES',
};
export const WithStringBlankAndStringUncheck = Template.bind({});
WithStringBlankAndStringUncheck.args = {
  label: 'Click Here',
  value: 'NO',
  defaultValue: 'NO',
  selectedValue: 'YES',
};
