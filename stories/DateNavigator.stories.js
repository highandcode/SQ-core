import React from 'react';

import DateNavigator from '../web/components/ui/DateNavigator';

export default {
  title: 'Example/DateNavigator',
  component: DateNavigator,
};

const Template = (args) => <DateNavigator {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  user: {},
};

export const Advanced = Template.bind({});
Advanced.args = {};
