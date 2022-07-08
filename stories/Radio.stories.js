import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Radio from '../web/components/ui/Radio';

export default {
  title: 'Example/Radio',
  component: Radio,
  argTypes: {},
};

const Template = (args) => <Radio {...args} />;

export const OneSelected = Template.bind({});
OneSelected.args = {
  name: 'radio',
  label: 'Select one',
  value: 'text1',
  textField: 'value',
  valueField: 'text',
  options: [
    {
      text: 'text1',
      value: 'The Godfather',
    },
    {
      text: 'text2',
      value: 'Batman',
    },
    {
      text: 'text3',
      value: 'The Shawshank Redemption',
    },
  ],
  defaultValue: 'text1',
};

export const NoneSelected = Template.bind({});
NoneSelected.args = {
  name: 'radio',
  label: 'Select one',
  value: 0,
  textField: 'value',
  valueField: 'text',
  options: [
    {
      text: 'text1',
      value: 'The Godfather',
    },
    {
      text: 'text2',
      value: 'Batman',
    },
    {
      text: 'text3',
      value: 'The Shawshank Redemption',
    },
  ],
};

export const DifferentTextAndValueField = Template.bind({});
DifferentTextAndValueField.args = {
  name: 'radio',
  label: 'Select one',
  value: 0,
  options: [
    {
      text: 'text1',
      value: 'The Godfather',
    },
    {
      text: 'text2',
      value: 'Batman',
    },
    {
      text: 'text3',
      value: 'The Shawshank Redemption',
    },
  ],
};
