import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import FloatingActionButton from '../web/components/FloatingActionButton';

export default {
  title: 'Example/FloatingActionButton',
  component: FloatingActionButton,
  argTypes: {
  }
};

const Template = (args) => <FloatingActionButton {...args} />;

export const BottomRightFloatingButton = Template.bind({});
BottomRightFloatingButton.args = {
    label: 'Sample',
    buttonText: 'Click',
    
};

export const BottomRightFloatingButtonDisabled = Template.bind({});
BottomRightFloatingButtonDisabled.args = {
    label: 'Sample',
    buttonText: 'Click',
    disabled: 'true'
    
};