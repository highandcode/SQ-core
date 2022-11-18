import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { getFormatters } from '../../utils/format';
import { getValue } from '../../utils/properties';
import { getMap, addComp } from '../ui';
import Button from '../ui/Button';
import Icon from '../Icon';
import './_editable-field.scss';

const EditableField = ({ column, row, viewType = 'Text', editType = 'Input', editProps = {}, className = '', onChange, onClick, onAction, onAnalytics, onBlur, errors, onKeyPress, formatter = {}, ...rest }) => {
  const CompMap = {
    ...getMap(),
  };

  const CmpToRender = CompMap[viewType] || CompMap.Text;
  const CmpToEdit = CompMap[editType] || CompMap.Input;

  return (
    <div className={`sq-editable-field ${getValue(this, className, row)}`} role="grid-cell">
      <div className="sq-editable-field__cmp">
        <PopupState variant="popover">
          {(popupState) => (
            <div>
              {<CmpToRender {...rest} />}
              {<Icon className="sq-editable-field__edit" name="edit" size="xs" {...bindTrigger(popupState)} />}
              <Popover
                {...bindPopover(popupState)}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    boxShadow: '0px 4px 16px rgba(25, 25, 25, 0.12)',
                    borderRadius: '8px',
                    padding: '20px',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                  },
                }}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                {<CmpToEdit {...rest} {...editProps} />}
                <div className="sq-editable-field__actions">
                  <IconButton>
                    <Icon name="check" color={'success'} />
                  </IconButton>
                  <IconButton>
                    <Icon name="close" color={'error'} />
                  </IconButton>
                </div>
              </Popover>
            </div>
          )}
        </PopupState>
      </div>
    </div>
  );
};
addComp({
  EditableField,
});

EditableField.propTypes = {
  errors: PropTypes.object,
  column: PropTypes.object,
  value: PropTypes.any,
  row: PropTypes.object,
  formatter: PropTypes.object,
  onAction: PropTypes.func,
  onChange: PropTypes.func,
  onAnalytics: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func,
  onClick: PropTypes.func,
  beforeRender: PropTypes.func,
};

export default EditableField;
