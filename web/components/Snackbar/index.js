import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/lab/Alert';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const SQSnackbar = ({
  open = false,
  message = '',
  autoHideDuration = 4000,
  onClose,
  variant = 'filled',
  severity = 'success',
  anchorOrigin = {}
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      anchorOrigin={{ vertical: 'top', horizontal: 'center', ...anchorOrigin }}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant={variant}
        action={
          <React.Fragment>
            <IconButton aria-label="close" color="inherit" size="small" onClick={onClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

SQSnackbar.propTypes = {
  open: PropTypes.bool,
  autoHideDuration: PropTypes.number,
  onClose: PropTypes.string,
  onClose: PropTypes.func
};

export default SQSnackbar;
