import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getMap } from '../ui/index';
import Dialog from '../Dialog';
import { getValue } from '../../utils/properties';

import './actions.scss';

const Actions = ({ actions = [], className = '', onClick, onAction, onAnalytics, row, column, beforeRender }) => {
  const compMap = getMap();
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentAction, setCurrentAction] = useState(null);
  const handleOnClick = (event, action) => {
    const { analytics = {} } = action;
    const { click } = analytics;
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (action.confirm) {
      setShowConfirm(true);
      setCurrentAction(action);
      return;
    }
    action.onClick && action.onClick(event, action);
    onClick && onClick(action);
    onAction && onAction(event, action);
    onAnalytics && click && onAnalytics(click);
  };
  const handleAction = (dialgAction, action) => {
    const { analytics = {} } = action;
    const { click, dialog } = analytics;
    onAnalytics && dialog && onAnalytics(dialog);
    if (dialgAction.action === 'ok') {
      onClick && onClick(action);
      onAction && onAction(dialgAction, action);
      onAnalytics && click && onAnalytics(click);
    }
    setTimeout(() => {
      setShowConfirm(false);
      setCurrentAction(null);
    });
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
    <div className={`sq-actions ${className}`}>
      {finalActions.map((action, idx) => {
        const { cmpType, beforeRender, ...rest } = action;
        const ActionToRender = compMap[cmpType] || compMap.LinkButton;
        const result = beforeRender && beforeRender(action, column, row);
        if (result === false) {
          return <React.Fragment key={idx}></React.Fragment>;
        }
        const overridingProps = {
          ...rest,
          ...result,
        };
        return (
          <React.Fragment key={idx}>
            <div className={`sq-actions__action ${action.cmpType}`}>
              <ActionToRender
                {...overridingProps}
                onClick={(event) => {
                  handleOnClick(event, action);
                }}
              />
            </div>
          </React.Fragment>
        );
      })}
      {currentAction?.confirm && (
        <Dialog
          title={currentAction.confirm.title}
          content={currentAction.confirm.content}
          classes={{
            body: 'sq-dialog__content-body--confirm',
          }}
          closeButton={false}
          open={showConfirm}
          onAction={(value, dialgAction) => handleAction(dialgAction, currentAction)}
          actions={[
            {
              buttonText: 'Yes',
              action: 'ok',
            },
            {
              buttonText: 'No',
              variant: 'outlined',
              action: 'cancel',
            },
          ]}
        />
      )}
    </div>
  );
};

Actions.propTypes = {
  className: PropTypes.string,
  row: PropTypes.object,
  column: PropTypes.object,
  onClick: PropTypes.func,
  onAction: PropTypes.func,
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
};

export default Actions;
