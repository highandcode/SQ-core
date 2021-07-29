
import React from 'react';
import PropTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';
// import Icon from '../Icon';
import './alert.scss';

const errorMapping = {
  info: {
    icon: 'info',
    alertClass: 'info'
  },
  error: {
    icon: 'error',
    alertClass: 'error'
  }
};

const Alert = ({ className = '', message = '', header = '', icon = '', type = 'info' }) => {
  const mapping = errorMapping[type] || errorMapping.info;
  return (
    <div className={`sq-alert ${className} sq-alert-${mapping.alertClass}`}>
      <MuiAlert severity={type} >
        {header && <AlertTitle>{header}</AlertTitle>}
        {message}</MuiAlert>
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
  header: PropTypes.string,
  icon: PropTypes.string,
  type: PropTypes.string
};

export default Alert;