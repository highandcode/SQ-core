import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import CardButtonList from '../web/components/CardButtonList';

export default {
  title: 'Example/CardButtonList',
  component: CardButtonList,
  argTypes: {
  }
};

const Template = (args) => <CardButtonList {...args} />;


export const DefaultWithoutColor = Template.bind({});
DefaultWithoutColor.args = {
   options: [{
    eyebrow: 'eyebrow',
    header: 'iPhone 11',
    subHeader: '$1,000',
  },
  {
    eyebrow: 'eyebrow',
    header: 'iPhone 12',
    subHeader: '$1,100',
  },
  {
    eyebrow: 'eyebrow',
    header: 'iPhone 13',
    subHeader: '$1,500',
  },
   ],
   
};

export const DefaultWithColor = Template.bind({});
DefaultWithColor.args = {
   options: [{
    eyebrow: 'eyebrow',
    header: 'iPhone 11',
    subHeader: '$1,000',
  },
  {
    eyebrow: 'eyebrow',
    header: 'iPhone 12',
    subHeader: '$1,100',
  },
  {
    eyebrow: 'eyebrow',
    header: 'iPhone 13',
    subHeader: '$1,500',
  },
  
   ],
   value: true
};

