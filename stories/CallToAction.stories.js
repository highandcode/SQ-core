import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import CallToAction from '../web/components/CallToAction';

export default {
  title: 'Example/CallToAction',
  component: CallToAction,
  argTypes: {
  }
};

const Template = (args) => <CallToAction {...args} />;

export const Default = Template.bind({});
Default.args = {
    header: 'Nature',
    body: 'It is the art of God',
    links: [{
        text:'Sun'
    },
    {
        text:'Moon'
    }
    ],
    imageUrl: 'https://i.pinimg.com/originals/60/c1/43/60c143c5a7e8c9cccae51f5aebda73c0.jpg'
};