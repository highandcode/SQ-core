import React from 'react';
import Wrapper from '../web/components/Wrapper';

export default {
  title: 'Example/Wrapper',
  component: Icon,
  argTypes: {},
};

const Template = (args) => <Wrapper {...args} />;

export const DefaultWrapper = Template.bind({});
DefaultWrapper.args = {
  items: [
    {
      component: 'Input',
      label: 'test',
    },
  ],
};
