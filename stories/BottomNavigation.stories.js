import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import BottomNavigation from '../web/components/BottomNavigation';

export default {
  title: 'Example/BottomNavigation',
  component: BottomNavigation,
  argTypes: {
  }
};

const Template = (args) => <BottomNavigation {...args} />;

export const DefaultNavigationBar = Template.bind({});
DefaultNavigationBar.args = {
    links: [{
        label: 'Home',
        value: 'home',
        icon: 'home',
       
    },
    {
        label: 'Money',
        value: 'Money',
        icon: 'money',

    },
    {
        label: 'Car',
        value: 'Car',
        icon: 'car'
    }],
    onChange: {},
    onAnalytics: {},
    value: 'Test'
};