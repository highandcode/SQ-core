import React from 'react';
import HeroContent from '../web/components/ui/HeroContent';
import imageFile from './assets/sample1.jpg';
import imageFile2 from './assets/sample2.jpg';

export default {
  title: 'Example/Content/HeroContent',
  component: HeroContent,
  argTypes: {}
};

const Template = (args) => <HeroContent {...args} />;

export const HeroContentWithHeader = Template.bind({});
HeroContentWithHeader.args = {
  header: 'Blast past fast',
  subHeader:
    '5G speed. A14 Bionic, the fastest chip in a smartphone. An edge-to-edge OLED display. Ceramic Shield with four times better drop performance. And Night mode on every camera. iPhone 12 has it all — in two perfect sizes.'
};

export const HeroContentWithEyebrow = Template.bind({});
HeroContentWithEyebrow.args = {
  eyebrow: "it's leap year",
  header: 'iPhone 12 Pro',
  subHeader: 'Shop early online to get all your gifts in time for the holidays. And get Specialist help, free no‑contact delivery, and more.'
};

export const HeroContentDarkTheme = Template.bind({});
HeroContentDarkTheme.args = {
  eyebrow: "it's leap year",
  header: 'iPhone 12 Pro',
  className: 'sq-hero-content--dark',
  subHeader: 'Shop early online to get all your gifts in time for the holidays. And get Specialist help, free no‑contact delivery, and more.'
};

export const HeroContentWithImageOnLeft = Template.bind({});
HeroContentWithImageOnLeft.args = {
  eyebrow: "it's leap year",
  header: 'iPhone 12 Pro',
  imageUrl:imageFile,
  className: 'sq-hero-content--left-aligned',
  subHeader: 'Shop early online to get all your gifts in time for the holidays. And get Specialist help, free no‑contact delivery, and more.'
};
export const HeroContentWithImageOnRight= Template.bind({});
HeroContentWithImageOnRight.args = {
  eyebrow: "it's leap year",
  header: 'iPhone 12 Pro',
  imageUrl:imageFile,
  className: 'sq-hero-content--right-aligned',
  subHeader: 'Shop early online to get all your gifts in time for the holidays. And get Specialist help, free no‑contact delivery, and more.'
};

export const HeroContentWithBackgroundLeftAligned = Template.bind({});
HeroContentWithBackgroundLeftAligned.args = {
  eyebrow: '#welcomeexpo',
  header: 'Expo 2020',
  subHeader: 'ESPN presents new expo in dubai',
  className: 'sq-hero-content--left-aligned',
  template: 'with-background',
  background: imageFile
};

export const HeroContentWithBackgroundRightAligned = Template.bind({});
HeroContentWithBackgroundRightAligned.args = {
  eyebrow: 'right',
  header: 'Expo 2020 Right aligned',
  subHeader: 'ESPN presents new expo in dubai',
  className: 'sq-hero-content--right-aligned',
  template: 'with-background',
  background: imageFile2
};
export const HeroContentWithBackground = Template.bind({});
HeroContentWithBackground.args = {
  eyebrow: '#awesomesite',
  header: 'Here it comes with new features',
  subHeader: 'Description goes here',
  template: 'with-background',
  background: imageFile2
};
