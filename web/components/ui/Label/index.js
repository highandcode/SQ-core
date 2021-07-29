import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { TextField } from '@material-ui/core';

// import { withStyles } from '@material-ui/core/styles';


const InputField = ({ value, className, ...rest }) => {
  return (<label className={`${className}`} {...rest} >{value}</label>);
};
InputField.propTypes = {
  children:PropTypes.node,
  className:PropTypes.string
};

export default InputField;