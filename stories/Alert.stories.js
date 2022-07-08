import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Alert from '../web/components/Alert';

export default {
  title: 'Example/Alert',
  component: Alert,
  argTypes: {
  }
};

const Template = (args) => <Alert {...args} />;


export const info = Template.bind({});
info.args = {
  type: 'info',
  header: 'Info',
  message: 'This is an info alert.'
};

export const error = Template.bind({});
error.args = {
  type: 'error',
  header: 'Error',
  message: 'This is an error alert.'
};

export const success = Template.bind({});
success.args = {
  type: 'success',
  header: 'Success',
  message: 'This is an success alert.'
};

export const warning = Template.bind({});
warning.args = {
  type: 'warning',
  header: 'Warning',
  message: 'This is an warning alert.'
};

export const OutlinedWarning = Template.bind({});
OutlinedWarning.args = {
  type: 'warning',
  header: 'Warning',
  message: 'This is an warning alert.',
  variant: 'outlined',
};

export const InlineWarning = Template.bind({});
InlineWarning.args = {
  type: 'warning',
  header: 'Warning',
  message: 'This is an warning alert.',
  variant: 'inline',
};

