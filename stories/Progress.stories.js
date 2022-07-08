import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Progress from '../web/components/Progress';

export default {
  title: 'Example/Progress',
  component: Progress,
  argTypes: {
  }
};

const Template = (args) => <><Progress {...args} /><h1>Hello World</h1><button>Submit</button> </>;


export const Default = Template.bind({});
Default.args = {
    text: 'Loading',

};

export const WithoutOverlay = Template.bind({});
WithoutOverlay.args = {
    text: 'Loading',
    overlay: false,
};

export const CubeProgressBar = Template.bind({});
CubeProgressBar.args = {
    text: 'Loading',
    type: 'cube'
};

export const RippleProgressBar = Template.bind({});
RippleProgressBar.args = {
    text: 'Loading',
    type: 'ripple'
};

export const LinearProgressBar = Template.bind({});
LinearProgressBar.args = {
    text: 'Loading',
    type: 'circle'
};


