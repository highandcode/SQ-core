import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import TextFields from '../web/components/ui/TextFields';

export default {
  title: 'Example/TextFields',
  component: TextFields,
  argTypes: {
  }
};

const Template = (args) => <TextFields {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 10,
  fields: [
    {
      defaultValue: 'Text 1' ,
      name: '',
      tag: 'h1',
      parentTag: 'div',
      className: 'sq-text-field-1',
      value: 'Text 1'
},
    {defaultValue: 'Text 2', tag: 'h2'},
    {defaultValue: 'Text 3', tag: 'h3'},
    {defaultValue: 'Text 4', tag: 'h4'},
    {defaultValue: 'Text 5', tag: 'h5'},
    {defaultValue: 'Text 6', tag: 'h6'},
  ],
  row: 10
};