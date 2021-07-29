import React from 'react';
import FeaturedContent from '../web/components/ui/FeaturedContent';

export default {
  title: 'Example/Content/FeaturedContent',
  component: FeaturedContent,
  argTypes: {}
};

const Template = (args) => <FeaturedContent {...args} />;

export const FeaturedContentWithHeader = Template.bind({});
FeaturedContentWithHeader.args = {
  items: [
    {
      icon: 'account',
      title: 'Awesome Game',
      description: 'Lorem ipsusm'
    },
    {
      icon: 'account',
      title: 'Mind Reader',
      description: 'Lorem ipsusm'
    },
    {
      icon: 'account',
      title: 'Phase 3',
      description: 'Lorem ipsusm'
    }
  ]
};

export const FeaturedContentWithEyebrow = Template.bind({});
FeaturedContentWithEyebrow.args = {
  eyebrow: 'eyebrow',
  header: 'This is header',
  subHeader: 'This is sub header'
};
