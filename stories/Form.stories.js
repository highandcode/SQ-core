import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Form from '../web/components/Form';

export default {
  title: 'Example/Form',
  component: Form,
  argTypes: {
  }
};

const Template = (args) => <Form {...args} />;


export const SampleUserInfoForm = Template.bind({});
SampleUserInfoForm.args = {
    fields: [
        {
            name: 'name',
            label: 'Full Name',
            type: 'text',

        },
        {
            name: 'address',
            label: 'Address',
            type: 'text',

        },
        {
            name: 'pin',
            label: 'Pin Code',
            type: 'text',

        },
        {
            name: 'city',
            label: 'City',
            type: 'text',

        },
        {
            name: 'state',
            label: 'State',
            type: 'text',

        },
        {
            name: 'count',
            label: 'Country',
            type: 'text',

        }
        ],
        cmpType: 'button'

        }
    