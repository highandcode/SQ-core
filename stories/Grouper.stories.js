import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Grouper from '../web/components/Grouper';

export default {
  title: 'Example/Grouper',
  component: Grouper,
  argTypes: {
  }
};

const Template = (args) => <Grouper {...args} />;


export const SampleUserInfoGrouper = Template.bind({});
SampleUserInfoGrouper.args = {
fields: [{
  name: 'name',
  cmpType: 'Text',
  parentTag: 'div',
}]
}