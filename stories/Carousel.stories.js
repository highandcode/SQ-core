import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Carousel from '../web/components/Carousel';

export default {
  title: 'Example/Carousel',
  component: Carousel,
  argTypes: {
  }
};

const Template = (args) => <Carousel {...args} />;


export const DefaultWithoutColor = Template.bind({});
DefaultWithoutColor.args = {
   items: [{
    eyebrow: 'eyebrow',
    header: 'iPhone 11',
    subHeader: '$1,000',
    imageUrl: 'https://via.placeholder.com/300x300',
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



