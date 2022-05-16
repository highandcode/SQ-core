import React from 'react';
import DataFieldList from '../web/components/ui/DataFieldList';

export default {
  title: 'Example/DataFieldList',
  component: DataFieldList,
  argTypes: {},
};

const Template = (args) => <DataFieldList {...args} />;

export const DataFieldListDefault = Template.bind({});
DataFieldListDefault.args = {
  fields: [
    {
      label: 'Name',
      fieldName: 'name',
    },
    {
      label: 'Gender',
      fieldName: 'gender',
    },
    {
      label: 'Email',
      fieldName: 'email',
    },
  ],
  value: {
    email: 'example@dot.com',
    gender: 'Male',
    name: 'John Doe',
  },
};

export const DataFieldListWithFlex = Template.bind({});
DataFieldListWithFlex.args = {
  className: 'sq-data-field-list--columns',
  fields: [
    {
      label: 'Name',
      fieldName: 'name',
    },
    {
      label: 'Gender',
      fieldName: 'gender',
    },
    {
      label: 'Email',
      fieldName: 'email',
    },
  ],
  value: {
    email: 'example@dot.com',
    gender: 'Male',
    name: 'John Doe',
  },
};

