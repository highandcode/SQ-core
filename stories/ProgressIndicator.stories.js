import React from 'react';

import ProgressIndicator from '../web/components/ui/ProgressIndicator';

export default {
  title: 'Example/ProgressIndicator',
  component: ProgressIndicator,
};

const Template = (args) => <ProgressIndicator {...args} />;

export const Orange = Template.bind({});
Orange.args = {
  className: 'sq-progress-indicator--orange',
  value: 50
  
};

export const Red = Template.bind({});
Red.args = {
  className: 'sq-progress-indicator--red',   
  value: 80
};



export const Green = Template.bind({});
Green.args = {
  className: 'sq-progress-indicator--green',   
  value: 100
};




