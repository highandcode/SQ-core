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
      href: '/content/home',
      children: []
    },
    {
      title: 'Games',
      href: '/content/games',
      children: [
        {
          title: '3Patti Play',
          href: '/content/games/3pattiplay'
        },
        {
          title: 'Mind reader',
          href: '/content/games/mind-reader'
        },
        {
          title: 'Uno',
          href: '/content/games/uno'
        },
        {
          title: 'Contact us',
          href: '/content/contact'
        }
      ]
    },
    {
      title: 'About us',
      href: '/content/about'
    },
    {
      title: 'Contact us',
      href: '/content/contact'
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
      href: '/content/home',
      children: []
    },
    {
      title: 'Games',
      href: '/content/games',
      children: [
        {
          title: '3Patti Play',
          href: '/content/games/3pattiplay'
        },
        {
          title: 'Mind reader',
          href: '/content/games/mind-reader'
        },
        {
          title: 'Uno',
          href: '/content/games/uno'
        },
        {
          title: 'Contact us',
          href: '/content/contact'
        }
      ]
    },
    {
      title: 'About us',
      href: '/content/about'
    },
    {
      title: 'Contact us',
      href: '/content/contact'
    }
  ]
};
