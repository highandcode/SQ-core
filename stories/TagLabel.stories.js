import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import TagLabel from '../web/components/ui/TagLabel';

export default {
  title: 'Example/TagLabel',
  component: TagLabel,
  argTypes: {
  }
};

const Template = (args) => <TagLabel {...args} />;

export const NormalTag = Template.bind({});
NormalTag.args = {
 value: 'SampleData'
};

export const TagWithIcon = Template.bind({});
TagWithIcon.args = {
 iconName: 'home',
 value: 'SampleData'
};
