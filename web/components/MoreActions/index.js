import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '../Icon';
import Dialog from '../Dialog';

import { getValue } from '../../utils/properties';

import './more-actions.scss';

const MoreActions = ({ actions = [], className = '', onClick, onAction, row, column, beforeRender }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const handleOnClick = (event, action) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setAnchorEl(null);
    if (action.confirm) {
      setShowConfirm(true);
      return;
    }
    onClick && onClick(action);
    onAction && onAction(action);
    setAnchorEl(null);
  };
  const handleAction = (dialgAction, action) => {
    if (dialgAction.action === 'ok') {
      onClick && onClick(action);
      onAction && onAction(action);
    }
    setTimeout(() => {
      setShowConfirm(false);
      handleClose();
    });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    setAnchorEl(null);
  };

  const finalActions = getValue(this, actions, row, column) || [];
  let result = true;
  if (beforeRender) {
    result = beforeRender && beforeRender(actions, column, row);
  }
  if (!result) {
    return <></>;
  }

  return (
    <div className={`sq-more-actions ${className}`}>
      <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
        <Icon name="more" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '20ch'
          }
        }}
      >
        {finalActions.map((action) => {
          const disabled = getValue(this, action.disabled, row);
          return (
            <MenuItem key={action.action} disabled={disabled} onClick={(event) => handleOnClick(event, action)}>
              {action.buttonText}
              {action.confirm && (
                <Dialog
                  title={action.confirm.title}
                  content={action.confirm.content}
                  classes={{
                    body: 'sq-dialog__content-body--confirm'
                  }}
                  closeButton={false}
                  open={showConfirm}
                  onAction={(dialgAction) => handleAction(dialgAction, action)}
                  actions={[
                    {
                      buttonText: 'Yes',
                      action: 'ok'
                    },
                    {
                      buttonText: 'Cancel',
                      variant: 'outlined',
                      action: 'cancel'
                    }
                  ]}
                />
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};

MoreActions.propTypes = {
  className: PropTypes.string,
  row: PropTypes.object,
  column: PropTypes.object,
  onClick: PropTypes.func,
  onAction: PropTypes.func,
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.func])
};

export default MoreActions;
