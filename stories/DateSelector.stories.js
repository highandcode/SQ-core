import React, { useState } from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import './styles.scss';
import DateSelector from '../web/components/ui/DateSelector';
import { datetime } from '../web/utils/datetime';

export default {
  title: 'Example/DateSelector',
  component: DateSelector,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = useState();

  const onChange = (value) => {
    setValue(value.value);
  };
  return (
    <div className="">
      <DateSelector {...args} onChange={onChange} value={value} />
      Value: {value}
    </div>
  );
};

export const WithDefaultStyle = Template.bind({});
WithDefaultStyle.args = {
  label: 'Date of birth (MM/DD/YYYY)',
  placeholder: 'MM/DD/YYYY',
};

export const WithCustomOutputFormat = Template.bind({});
WithCustomOutputFormat.args = {
  label: 'Date of birth (MM/DD/YYYY)',
  placeholder: 'MM/DD/YYYY',
  valueFormat: 'YYYY-MM-DD',
};
export const WithCustomFormat = Template.bind({});
WithCustomFormat.args = {
  label: 'Date of birth with custom format',
  outputFormat: 'MM/DD/YYYY hh:mm A',
};
export const WithTimePickerExample = Template.bind({});
WithTimePickerExample.args = {
  label: 'Date of birth with custom format',
  inputFormat: 'hh:mm a',
  outputFormat: 'hh:mm A',
  instanceType: 'TimePicker',
};
export const WithDateTimerPickerExample = Template.bind({});
WithDateTimerPickerExample.args = {
  label: 'Date of birth with custom format',
  inputFormat: 'dd/mm/yyyy hh:mm a',
  outputFormat: 'hh:mm A',
  instanceType: 'DateTimePicker',
};
export const WithMobileDateTimePicker = Template.bind({});
WithMobileDateTimePicker.args = {
  label: 'Date picker mobile',
  inputFormat: 'dd/mm/yyyy',
  outputFormat: 'hh:mm A',
  instanceType: 'MobileDatePicker',
};
export const WithDesktopDatePicker = Template.bind({});
WithDesktopDatePicker.args = {
  label: 'Date desktop datepicker',
  inputFormat: 'dd/mm/yyyy',
  outputFormat: 'hh:mm A',
  instanceType: 'DesktopDatePicker',
};
export const WithMinMaxDate = Template.bind({});
WithMinMaxDate.args = {
  label: 'Date desktop datepicker',
  inputFormat: 'dd/mm/yyyy',
  outputFormat: 'hh:mm A',
  instanceType: 'DesktopDatePicker',
  minDate: datetime.new().toISO(),
  maxDate: datetime.new().addDays(5).toISO(),
};
