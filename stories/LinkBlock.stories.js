import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import LinkBlock from '../web/components/ui/LinkBlock';

export default {
  title: 'Example/LinkBlock',
  component: LinkBlock,
  argTypes: {},
};

const Template = (args) => <LinkBlock {...args} />;

export const BasicOnNormalSizeCarIcon = Template.bind({});
BasicOnNormalSizeCarIcon.args = {
  iconName: 'car',
  iconDirection: 'left',
  buttonText: 'Button 1',
  size: 'normal',
  color: 'blue',
};

export const BasicOnLargeSizeCarIcon = Template.bind({});
BasicOnLargeSizeCarIcon.args = {
  iconName: 'car',
  buttonText: 'Button 2',
  iconDirection: 'left',
  size: 'large',
  color: 'blue',
};
