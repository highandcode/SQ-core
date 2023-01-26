import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Slide from '@mui/material/Slide';
import Progress from '../Progress';
import Icon from '../Icon';
import './dialog.scss';

const TransitionUp = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TransitionLeft = React.forwardRef((props, ref) => {
  return <Slide direction="left" ref={ref} {...props} />;
});
const TransitionRight = React.forwardRef((props, ref) => {
  return <Slide direction="right" ref={ref} {...props} />;
});
const TransitionBottom = React.forwardRef((props, ref) => {
  return <Slide direction="bottom" ref={ref} {...props} />;
});

const transitionOptions = {
  left: TransitionLeft,
  up: TransitionUp,
  right: TransitionRight,
  bottom: TransitionBottom,
};

const SQDialog = ({ closeButton = true, headerTag, transitionDir = 'up', classes: overrideClasses = {}, fullScreen = false, open = false, isLoading = false, title, content, children, onClose, actions = [], onAction }) => {
  const handleClose = () => {
    onClose &&
      onClose(
        {
          cancel: true,
        },
        { actionType: 'close' }
      );
  };
  const handleAction = (action) => {
    onAction && onAction({}, action);
  };
  return (
    <div className={`sq-dialog ${overrideClasses.root || ''}`}>
      <Dialog TransitionComponent={transitionOptions[transitionDir]} classes={overrideClasses.dialog} open={open} fullScreen={fullScreen} onClose={handleClose}>
        <DialogTitle>
          {headerTag && <Typography variant={headerTag}>{title}</Typography>}
          {!headerTag && title}
          {closeButton && (
            <IconButton
              edge="start"
              color="inherit"
              className="sq-dialog__close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
              aria-label="close"
            >
              <Icon name={'close'} size="normal"></Icon>
            </IconButton>
          )}
        </DialogTitle>
        <DialogContent>
          <div className={`sq-dialog__content-body ${overrideClasses.body}`}>
            {isLoading && (
              <div className="sq-dialog__loader">
                <Progress />
              </div>
            )}
            {content || children}
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
  title: PropTypes.any,
  isLoading: PropTypes.bool,
  type: PropTypes.string,
  content: PropTypes.any,
  actions: PropTypes.array,
  onAction: PropTypes.func,
  onClose: PropTypes.func,
};
export default SQDialog;
