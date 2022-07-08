import React from 'react';
import '../web/styles/core/_fonts.scss';
import '../web/styles/index.scss';
import Dialog from '../web/components/Dialog';

export default {
  title: 'Example/Dialog',
  component: Dialog,
  argTypes: {
  }
};

const Template = (args) => <Dialog {...args} />;


export const DefaultDialog = Template.bind({});
DefaultDialog.args = {
   title: 'Title',
   open: true,
   

};

export const DialogWhenLoading = Template.bind({});
DialogWhenLoading.args = {
   title: 'Title',
   open: true,
   isLoading: true,
   
  
};

export const DialogWhenLoadingWithContent = Template.bind({});
DialogWhenLoadingWithContent.args = {
   title: 'Title',
   open: true,
   isLoading: true,
   content: 'Content Goes Here',
  
};

export const DialogWhenLoadingWithContentFullScreen = Template.bind({});
DialogWhenLoadingWithContentFullScreen.args = {
   title: 'Title',
   open: true,
   isLoading: true,
   content: 'Content Goes Here',
   fullScreen: true,
  
};

