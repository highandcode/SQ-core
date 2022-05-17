import React from 'react';
import DataField from '../web/components/ui/DataField';

export default {
  title: 'Example/DataField',
  component: DataField,
  argTypes: {}
};

const Template = (args) => <DataField {...args} />;

export const DataFieldDefault = Template.bind({});
DataFieldDefault.args = {
  label: 'Email',
  value: 'test@s.com'
};

export const DataFieldLongText = Template.bind({});
DataFieldLongText.args = {
  label: 'Name',
  value: 'Name Your Home Name Your Home Name Your Home'
};

export const DataFieldWithoutData = Template.bind({});
DataFieldWithoutData.args = {
  label: 'Test'
};
