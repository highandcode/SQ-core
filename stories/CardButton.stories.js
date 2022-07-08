import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import CardButton from '../web/components/CardButton';

export default {
  title: 'Example/CardButton',
  component: CardButton,
  argTypes: {
  }
};

const Template = (args) => <CardButton {...args} />;

export const DefaultWithoutEyebrow = Template.bind({});
DefaultWithoutEyebrow.args = {
   header: 'iPhone 11',
   subHeader: '$1,000',
};

export const DefaultWithEyebrow = Template.bind({});
DefaultWithEyebrow.args = {
    eyebrow: 'eyebrow',
   header: 'iPhone 12',
   subHeader: '$1,100',
};