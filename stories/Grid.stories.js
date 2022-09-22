import React, { useState } from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import './styles.scss';
import Grid from '../web/components/Grid';

export default {
  title: 'Example/Grid',
  component: Grid,
  argTypes: {},
};

const Template = (args) => {
  const [value, setValue] = useState(new Date());

  const onChange = (value) => {
    setValue(value.value);
  };
  return (
    <div className="" style={{ height: '400px' }}>
      <Grid {...args} onChange={onChange} value={value} />
    </div>
  );
};

export const WithDefaultStyle = Template.bind({});
WithDefaultStyle.args = {
  className: 'sq-grid--fixed',
  showHeader: true,
  columns: [
    {
      name: 'name',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      headerText: 'Designation',
    },
    {
      name: 'country',
      headerText: 'Country',
    },
    {
      name: 'name',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      headerText: 'Designation',
    },
    {
      name: 'country',
      headerText: 'Country',
    },
    {
      name: 'name',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      headerText: 'Designation',
    },
    {
      name: 'country',
      headerText: 'Country',
    },
    {
      name: 'name',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      headerText: 'Designation',
    },
    {
      name: 'country',
      headerText: 'Country',
    },
    {
      name: 'name',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      headerText: 'Designation',
    },
    {
      name: 'country',
      headerText: 'Country',
    },
    {
      name: 'name',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      headerText: 'Designation',
    },
    {
      name: 'country',
      headerText: 'Country',
    },
  ],

  data: [
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
    {
      name: 'John Doe',
      designation: 'Developer',
      country: 'United States',
    },
    {
      name: 'Oliver Queen',
      designation: 'QA',
      country: 'United States',
    },
    {
      name: 'Wayne Bruce',
      designation: 'Sales Lead',
      country: 'United States',
    },
  ],
};
export const WithCustomFormat = Template.bind({});
WithCustomFormat.args = {
  label: 'Date of birth with custom format',
  format: 'MM/DD/YYYY hh:mm A',
  outputFormat: 'MM/DD/YYYY hh:mm A',
};
