import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import DropSelection from '../web/components/ui/DropSelection';

export default {
  title: 'Example/DropSelection',
  component: DropSelection,
  argTypes: {
  }
};

const Template = (args) => <DropSelection {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  options: [{
    text: 'The Godfather',
    value: 'text1'
  },
  {
    text: 'Batman',
    value: 'text2'
  },
  {
    text: 'Superman',
    value: 'text3'
  }
  ]
};