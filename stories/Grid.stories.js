import React, { useState } from 'react';
import Grid from '../web/components/Grid';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import './styles.scss';

export default {
  title: 'Example/Grid',
  component: Grid,
  argTypes: {},
};

const data = [
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
  {
    name: 'John Doe',
    icon: 'user',
    designation: 'Developer',
    country: 'United States',
  },
  {
    name: 'Oliver Queen',
    icon: 'user',
    designation: 'QA',
    country: 'United States',
  },
  {
    name: 'Wayne Bruce',
    icon: 'user',
    designation: 'Sales Lead',
    country: 'United States',
  },
];

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
  icon: 'user',
  showHeader: true,
  columns: [
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
  ],

  data: data,
};
export const WithIconAtFirst = Template.bind({});
WithIconAtFirst.args = {
  className: 'sq-grid--fixed',
  icon: 'user',
  showHeader: true,
  columns: [
    {
      cmpType: 'Icon',
      name: 'icon',
      className: 'col-icon',
      icon: 'user',
      component: {
        textIcon: (row) => row.name.substr(0, 1),
        size: 'sm'
      },
      headerText: 'Icon',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
    {
      name: 'name',
      icon: 'user',
      headerText: 'Full Name',
    },
    {
      name: 'designation',
      icon: 'user',
      headerText: 'Designation',
    },
    {
      name: 'country',
      icon: 'user',
      headerText: 'Country',
    },
  ],

  data: data,
};