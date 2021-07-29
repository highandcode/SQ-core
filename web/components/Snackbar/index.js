import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  close: {
    padding: theme.spacing(0.5)
  }
}));

const SQSnackbar = ({
  open = false,
  message = '',
  autoHideDuration = 4000,
  onClose,
  variant = 'filled',
  severity = 'success',
  anchorOrigin = {}
}) => {
  const classes = useStyles();
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
            <IconButton aria-label="close" color="inherit" size="small" className={classes.close} onClick={onClose}>
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
