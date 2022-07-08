import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import './styles.scss';
import Card from '../web/components/ui/Card';

export default {
  title: 'Example/Card',
  component: Card,
  argTypes: {},
};

const Template = (args) => (
  <div className=" bg-gray-container">
    <Card {...args} />
  </div>
);

export const WithHeaderSimple = Template.bind({});
WithHeaderSimple.args = {
  header: 'Unresolved',
  value: 200,
};

export const WithCurrencyFormatter = Template.bind({});
WithCurrencyFormatter.args = {
  header: 'Open',
  value: 34253434,
  formatter: {
    type: 'currency',
  },
};
export const WithNumberFormatter = Template.bind({});
WithNumberFormatter.args = {
  header: 'Closed',
  value: 34040,
  formatter: {
    type: 'numberAbr',
    setName: 'lowest',
  },
};
