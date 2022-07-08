import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import DataList from '../web/components/DataList';

export default {
  title: 'Example/DataList',
  component: DataList,
  argTypes: {
  }
};

const Template = (args) => <DataList {...args} />;


export const DataListWithIcon = Template.bind({});
DataListWithIcon.args = {
   items: [
       {
           iconName: 'home',
           title: 'Home',
           subtitle: 'Hom',
           items: [{
            iconName: 'car',
            title: 'Car',
            subtitle: 'Car'
        },{
            iconName: 'money',
            title: 'Money',
            subtitle: 'Mon'
        },
        {
            iconName: 'login',
            title: 'Login',
            subtitle: 'Log'
        },
        {
            iconName: 'mail',
            title: 'Mail',
            subtitle: 'Mail'
        }

        ]
       }
   ]

};