import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import List from '../web/components/ui/List';

export default {
  title: 'Example/List',
  component: List,
  argTypes: {},
};

const Template = (args) => <List {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  value: [
    {
      text: 'The Godfather',
    },
    {
      text: 'Superman',
    },
    { text: 'Batman' },
  ],
};
