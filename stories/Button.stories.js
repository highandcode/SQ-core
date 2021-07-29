import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Button from '../web/components/ui/Button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
  }
};

const Template = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  buttonText: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  buttonText: 'Button',
  variant: 'secondary'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  buttonText: 'Button'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  buttonText: 'Button'
};

export const ButtonWithIcon = Template.bind({});
ButtonWithIcon.args = {
  iconName: 'home',
  buttonText: 'Button'
};
