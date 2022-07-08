import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Pricing from '../web/components/ui/Pricing';

export default {
  title: 'Example/Pricing',
  component: Pricing,
  argTypes: {
  }
};

const Template = (args) => <Pricing {...args} />;

export const CardList = Template.bind({});
CardList.args = {
    header: 'Pricing',
    subHeader: 'Choose your plan',
    items: [{
      header: 'Free',
      subHeader: 'Free for community',
      icon: 'home',
      price: '$0',
      features: [{
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      }],
      actions: [{
        buttonText : 'Select',
        type: 'Button'
      }]
    },{
      header: 'Pro',
      subHeader: 'Professional plan',
      icon: 'dashboard',
      price: '$100',
      features: [{
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      }],
      actions: [{
        buttonText : 'Select',
        type: 'Button'
      }]
    },{
      header: 'Enterprise',
      subHeader: 'for large organization',
      icon: 'settings',
      price: '$1990',
      features: [{
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      },
      {
        icon: 'check',
        text: 'Feature 1'
      }],
      actions: [{
        buttonText : 'Select',
        type: 'Button'
      }]
    }]
};