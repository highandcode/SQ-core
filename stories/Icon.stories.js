import React from 'react';
import Icon from '../web/components/Icon';

export default {
  title: 'Example/Content/Icon',
  component: Icon,
  argTypes: {}
};

const Template = (args) => <Icon {...args} />;

export const IconDefault = Template.bind({});
IconDefault.args = {
  name: 'home'
};

export const IconSmall = Template.bind({});
IconSmall.args = {
  name: 'home',
  size: 'small'
};

export const IconLarge = Template.bind({});
IconLarge.args = {
  name: 'home',
  size: 'large'
};
