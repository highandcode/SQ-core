import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { amber, green } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import WarningIcon from '@mui/icons-material/Warning';
import { makeStyles } from '@mui/material/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

function MySnackbarContentWrapper(props) {
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={''}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={''} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func
};

const NotificationBar = ({ vertical = 'top', horizontal = 'center', className = '', open, onClose, duration = 6000, variant = 'info', message = 'No message' }) => {

  return (<Snackbar
    anchorOrigin={{
      vertical: vertical,
      horizontal: horizontal
    }}
    open={open}
    autoHideDuration={duration}
    onClose={onClose}
  >
    <MySnackbarContentWrapper
      className={className}
      onClose={onClose}
      variant={variant}
      message={message}
    />
  </Snackbar>);
};
NotificationBar.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  horizontal: PropTypes.string,
  vertical: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  duration: PropTypes.number,
  open: PropTypes.bool
};

export default NotificationBar;