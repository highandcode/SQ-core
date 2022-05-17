import React from 'react';
import IconSelector from '../web/components/IconSelector';

export default {
  title: 'Example/IconSelector',
  component: IconSelector,
  argTypes: {}
};

const Template = (args) => <IconSelector {...args} />;

export const IconDefault = Template.bind({});
IconDefault.args = {
  value: 'home'
};
