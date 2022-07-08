import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import ErrorBoundry from '../web/components/ErrorBoundry';

export default {
  title: 'Example/ErrorBoundry',
  component: ErrorBoundry,
  argTypes: {
  }
};

const Template = (args) => <ErrorBoundry {...args} />;


export const DefaultErrorBoundry = Template.bind({});
DefaultErrorBoundry.args = {
   

};