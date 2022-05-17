import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import green from '@mui/material/colors/green';
import amber from '@mui/material/colors/amber';
import IconButton from '@mui/material/IconButton';
// import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import WarningIcon from '@mui/icons-material/Warning';
import { makeStyles } from '@mui/material/styles';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

// const useStyles1 = makeStyles(theme => ({
//   success: {
//     backgroundColor: green[600]
//   },
//   error: {
//     backgroundColor: theme.palette.error.dark
//   },
//   info: {
//     backgroundColor: theme.palette.primary.dark
//   },
//   warning: {
//     backgroundColor: amber[700]
//   },
//   icon: {
//     fontSize: 20
//   },
//   iconVariant: {
//     opacity: 0.9,
//     marginRight: theme.spacing(1)
//   },
//   message: {
//     display: 'flex',
//     alignItems: 'center'
//   }
// }));

function PopupMessage(props) {
  const classes = {};
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={`${classes[variant]} ${className}`}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={`${classes.icon} ${classes.iconVariant}`} />
          {message}
        </span>
      }
      action={[
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

PopupMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired
};

export default PopupMessage;