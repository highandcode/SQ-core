import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import AutoComplete from '../web/components/ui/Autocomplete';

export default {
  title: 'Example/AutoComplete',
  component: AutoComplete,
  argTypes: {
  }
};

const Template = (args) => <AutoComplete {...args} />;

export const WithOptions = Template.bind({});
WithOptions.args = {
    label: 'Search here',
    options: [{
      text: 'The Godfather',
      value: 'text1'
    },
    {
      text: 'Batman',
      value: 'text2'
    }]
    
};

export const WithFixedOptions = Template.bind({});
WithFixedOptions.args = {
    label: 'Search here',
    options: [{
      text: 'The Godfather',
      value: 'text1'
    },
    {
      text: 'Batman',
      value: 'text2'
    }],
    fixedOptions: [{
      text: 'Hero',
      value: 'new'
    },
    
    ],
    multiple: true,
    value: ['text1', 'text2']
    
};

