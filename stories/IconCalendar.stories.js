import React from 'react';
import IconCalendar from '../web/components/IconCalendar';

export default {
  title: 'Example/IconCalendar',
  component: IconCalendar,
  argTypes: {}
};

const Template = (args) => <IconCalendar {...args} />;

export const IconDefault = Template.bind({});
IconDefault.args = {
  value: '02-FEB-1978'
};
