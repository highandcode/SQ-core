import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Progress from '../Progress';
import Icon from '../Icon';
import './dialog.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const IconSets = {
  default: '',
  error: 'erroroutline',
  warning: 'warning',
  info: 'info',
};
const TitleClasses = {
  default: 'default',
  error: 'error',
  warning: 'warning',
  info: 'info',
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
}) => {
  const customStyle = {};
  const handleClose = () => {
    onClose && onClose();
  };
  const handleAction = (action) => {
    onAction && onAction(action);
  };
  let dialogClasses = {};
  if (customStyle.overridePaper) {
    const { container, paper } = customStyle;
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
        <DialogTitle>
          {title}
          {!customStyle.isBackStyle && closeButton && (
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              aria-label="close"
            >
              <Icon name={'close'} size="large"></Icon>
            </IconButton>
          )}
        </DialogTitle>
        {/* <AppBar className={customStyle[customStyle.appBar]}>
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
        </AppBar> */}
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
              const {
                actionType,
                buttonText,
                variant = 'contained',
                color = 'primary',
                className = '',
                ...rest
              } = action;
              return (
                <Button
                  key={idx}
                  onClick={() => handleAction(action)}
                  variant={variant}
                  size="small"
                  className={className}
                  color={color}
                >
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
  onClose: PropTypes.func,
};
export default SQDialog;
