import React from 'react';

import DatePicker from '../web/components/ui/DatePicker';

export default {
  title: 'Example/DatePicker',
  component: DatePicker
};

const Template = (args) => <DatePicker {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  value: '01/01/1984'
};

export const WithDateFormat = Template.bind({});
WithDateFormat.args = {
  value: '01/01/1984',
  format: 'DD MMM, YYYY'
};

export const WithErrorState = Template.bind({});
WithErrorState.args = {
  value: '01/01/1984',
  format: 'DD MMM, YYYY',
  error: true,
  errorMessage: 'Date should be at least after 1988'
};
