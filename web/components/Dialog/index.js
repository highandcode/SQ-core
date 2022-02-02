import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Progress from '../Progress';
import Icon from '../Icon';
import './dialog.scss';

const useStyles = makeStyles((theme) => {
  return {
    titleLeft: {
      flexGrow: 1
    },
    appBar: {
      position: 'relative'
    },
    iosStyle: {
      position: 'relative',
      background: 'white',
      color: theme.palette.primary.dark,
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px'
    },
    container: {
      height: 'calc(100% - 20px)',
      marginTop: '20px'
    },
    paper: {
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px'
    }
  };
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IconSets = {
  default: '',
  error: 'erroroutline',
  warning: 'warning',
  info: 'info'
};
const TitleClasses = {
  default: 'default',
  error: 'error',
  warning: 'warning',
  info: 'info'
};

const getCustomStyles = (style) => {
  switch (style) {
    case 'ios':
      return {
        appBar: 'iosStyle',
        isBackStyle: true,
        backIcon: 'arrow-left',
        overridePaper: true,
        iconColor: 'primary'
      };
    case 'default':
    default:
      return {
        appBar: 'appBar',
        isBackStyle: false,
        backIcon: 'close',
        overridePaper: false,
        iconColor: 'white'
      };
      return;
  }
};

const SQDialog = ({
  closeButton = true,
  classes: overrideClasses = {},
  fullScreen = false,
  open = false,
  isLoading = false,
  title,
  content,
  onClose,
  severity = 'default',
  actions = [],
  onAction,
  style = 'default'
}) => {
  const classes = useStyles();
  const customStyle = getCustomStyles(style);
  const handleClose = () => {
    onClose && onClose();
  };
  const handleAction = (action) => {
    onAction && onAction(action);
  };
  let dialogClasses = {};
  if (customStyle.overridePaper) {
    const { container, paper } = classes;
    dialogClasses = { container, paper };
  }
  return (
    <div className={`sq-dialog ${overrideClasses.root}`}>
      <Dialog
        TransitionComponent={Transition}
        classes={dialogClasses}
        open={open}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby={title}
        aria-describedby={title}
      >
        <AppBar className={classes[customStyle.appBar]}>
          <Toolbar>
            {customStyle.isBackStyle && closeButton && (
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Icon name={customStyle.backIcon} size="xl" variant={customStyle.iconColor}></Icon>
              </IconButton>
            )}
            <h2 className="sq-dialog__title">
              {IconSets[severity] && (
                <span className={`sq-dialog__d-icon`}>
                  <Icon size={'large'} variant={TitleClasses[severity]} name={IconSets[severity]} />
                </span>
              )}
              {title}
            </h2>
            {!customStyle.isBackStyle && closeButton && (
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <Icon name={customStyle.backIcon} size="large" variant={customStyle.iconColor}></Icon>
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className={`sq-dialog__content-body ${overrideClasses.body}`}>
            {isLoading && (
              <div className="sq-dialog__loader">
                <Progress />
              </div>
            )}
            {content}
          </div>
        </DialogContent>
        <DialogActions>
          {actions &&
            actions.map((action, idx) => {
              const { actionType, buttonText, variant = 'contained', color = 'primary', className = '', ...rest } = action;
              return (
                <Button key={idx} onClick={() => handleAction(action)} variant={variant} size="small" className={className} color={color}>
                  {buttonText}
                </Button>
              );
            })}
        </DialogActions>
      </Dialog>
    </div>
  );
};
SQDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  content: PropTypes.any,
  actions: PropTypes.array,
  onAction: PropTypes.func,
  onClose: PropTypes.func
};
export default SQDialog;
