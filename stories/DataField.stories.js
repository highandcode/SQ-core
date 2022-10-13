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


export const DataFieldInlineStyle = Template.bind({});
DataFieldInlineStyle.args = {
  label: 'Name',
  value: 'John Doe',
  className: 'sq-data-field--inline'
};

export const DataFieldInlineStyleIcon = Template.bind({});
DataFieldInlineStyleIcon.args = {
  labelIcon: 'call',
  value: '+919999999191',
  className: 'sq-data-field--inline'
};

export const DataFieldInlineStyleIconText = Template.bind({});
DataFieldInlineStyleIconText.args = {
  label: 'Call',
  labelIcon: 'call',
  value: '+919999999191',
  className: 'sq-data-field--inline'
};


export const DataFieldInlineStyleIconTextSpacing = Template.bind({});
DataFieldInlineStyleIconTextSpacing.args = {
  label: 'Call',
  labelIcon: 'call',
  value: '+919999999191',
  labelIconColor: 'primary',
  className: 'sq-data-field--inline space-between'
};


