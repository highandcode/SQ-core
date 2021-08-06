import React from 'react';
import TextColumnWithLinks from '../web/components/ui/TextColumnWithLinks';

export default {
  title: 'Example/Content/TextColumnWithLinks',
  component: TextColumnWithLinks,
  argTypes: {}
};

const Template = (args) => <TextColumnWithLinks {...args} />;

export const TextColumnWithLinksDefault = Template.bind({});
TextColumnWithLinksDefault.args = {
  items: [
    {
      iconName: 'wifi',
      iconSize: 'large',
      header: 'Test Header',
      subHeader: 'lorem ipsume i will be there whenever you need me'
    },
    {
      iconName: 'wifi',
      iconSize: 'large',
      header: 'Test Header',
      subHeader: 'lorem ipsume i will be there whenever you need me'
    },
    {
      iconName: 'wifi',
      iconSize: 'large',
      header: 'Test Header',
      subHeader: 'lorem ipsume i will be there whenever you need me'
    }
  ]
};

export const TextColumnWithLinksCenterAligned = Template.bind({});
TextColumnWithLinksCenterAligned.args = {
  className:'sq-text-column-links--center',
  items: [
    {
      iconName: 'wifi',
      iconSize: 'large',
      iconColor: 'success',
      header: 'Test Header',
      subHeader: 'lorem ipsume i will be there whenever you need me'
    },
    {
      iconName: 'wifi',
      iconColor: 'secondary',
      iconSize: 'large',
      header: 'Test Header',
      subHeader: 'lorem ipsume i will be there whenever you need me'
    },
    {
      iconName: 'wifi',
      iconSize: 'large',
      header: 'Test Header',
      subHeader: 'lorem ipsume i will be there whenever you need me'
    }
  ]
};
