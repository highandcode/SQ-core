import React from 'react';
import ImageInfoSlider from '../web/components/ui/ImageInfoSlider';

export default {
  title: 'Example/Content/ImageInfoSlider',
  component: ImageInfoSlider,
  argTypes: {}
};

const Template = (args) => <ImageInfoSlider {...args} />;
import imageFile from './assets/sample1.jpg';

export const ImageInfoSliderDefault = Template.bind({});
ImageInfoSliderDefault.args = {
  items: [
    {
      imageUrl: imageFile,
      iconName: 'wifi',
      iconSize: 'large',
      header: 'Test Header',
      eyebrow: 'AWESOME',
      classes: {
        banner: 'info'
      }
    },
    {
      iconName: 'wifi',
      imageUrl: imageFile,
      iconSize: 'large',
      header: 'Test Header',
      eyebrow: 'COLD',
      classes: {
        banner: 'success'
      }
    },
    {
      imageUrl: imageFile,
      iconName: 'wifi',
      iconSize: 'large',
      header: 'Test Header',
      eyebrow: 'FEET'
    }
  ]
};
