import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import {CheckboxList} from '../web/components/ui/Checkbox';

export default {
  title: 'Example/CheckboxList',
  component: CheckboxList,
  argTypes: {
  }
};

const Template = (args) => <CheckboxList {...args} />;

export const Default = Template.bind({});
Default.args = {
    options: [{
        text: 'text1',
        value: 'The Godfather'
      },
      {
        text: 'text2',
        value: 'Batman'
      }]
};
