import React from 'react';
import '../web/styles/index.scss';
import GlobalNavigation from '../web/components/ui/GlobalNavigation';

export default {
  title: 'Example/Content/GlobalNavigation',
  component: GlobalNavigation,
  argTypes: {}
};

const Template = (args) => <GlobalNavigation {...args} />;

export const GlobalNavigationWithHeader = Template.bind({});
GlobalNavigationWithHeader.args = {
  logo: {
    className:'text-primary',
    name: 'account',
    variant: 'none',
    text: 'Test'
  },
  items: [
    {
      title: 'Home',
      href: '/content/in/home',
      children: []
    },
    {
      title: 'Games',
      href: '/content/in/games',
      children: [
        {
          title: '3Patti Play',
          href: '/content/in/games/3pattiplay'
        },
        {
          title: 'Mind reader',
          href: '/content/in/games/mind-reader'
        },
        {
          title: 'Uno',
          href: '/content/in/games/uno'
        },
        {
          title: 'Contact us',
          href: '/content/in/contact'
        }
      ]
    },
    {
      title: 'About us',
      href: '/content/in/about'
    },
    {
      title: 'Contact us',
      href: '/content/in/contact'
    }
  ]
};

export const GlobalNavigationDark = Template.bind({});
GlobalNavigationDark.args = {
  logo: {
    className:'text-white',
    name: 'account',
    variant: 'none',
    text: 'Test'
  },
  className: 'sq-global-navigation--dark',
  items: [
    {
      title: 'Home',
      href: '/content/in/home',
      children: []
    },
    {
      title: 'Games',
      href: '/content/in/games',
      children: [
        {
          title: '3Patti Play',
          href: '/content/in/games/3pattiplay'
        },
        {
          title: 'Mind reader',
          href: '/content/in/games/mind-reader'
        },
        {
          title: 'Uno',
          href: '/content/in/games/uno'
        },
        {
          title: 'Contact us',
          href: '/content/in/contact'
        }
      ]
    },
    {
      title: 'About us',
      href: '/content/in/about'
    },
    {
      title: 'Contact us',
      href: '/content/in/contact'
    }
  ]
};
