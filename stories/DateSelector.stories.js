import React, { useState } from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import './styles.scss';
import DateSelector from '../web/components/ui/DateSelector';

export default {
  title: 'Example/DateSelector',
  component: DateSelector,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = useState(new Date());

  const onChange = (value) => {
    setValue(value.value);
  };
  return (
    <div className="">
      <DateSelector {...args} onChange={onChange} value={value} />
    </div>
  );
};

export const WithDefaultStyle = Template.bind({});
WithDefaultStyle.args = {
  label: 'Date of birth (MM/DD/YYYY)',
  placeholder: 'MM/DD/YYYY',
};
export const WithCustomFormat = Template.bind({});
WithCustomFormat.args = {
  label: 'Date of birth with custom format',
  format: 'MM/DD/YYYY hh:mm A',
  outputFormat: 'MM/DD/YYYY hh:mm A',
};
