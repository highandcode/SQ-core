import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Link from '../web/components/ui/Link';

export default {
  title: 'Example/Link',
  component: Link,
  argTypes: {
  }
};

const Template = (args) => <Link {...args} />;

export const BasicOnNormalSizeCarIcon = Template.bind({});
BasicOnNormalSizeCarIcon.args = {
    iconName: 'car',
    size: 'small',
    color: 'blue'
};



export const BasicOnLargeSizeHomeIcon = Template.bind({});
BasicOnLargeSizeHomeIcon.args = {
    iconName: 'home',
    size: 'large',
    color: 'blue'
};