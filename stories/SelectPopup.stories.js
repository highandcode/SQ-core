import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import SelectPopup from '../web/components/ui/SelectPopup';

export default {
  title: 'Example/SelectPopup',
  component: SelectPopup,
  argTypes: {
  }
};

const Template = (args) => <SelectPopup {...args} />;

export const Default = Template.bind({});
Default.args = {
   
};