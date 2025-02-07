import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/material/styles';
import SpeedDial from '@mui/lab/SpeedDial';
import SpeedDialIcon from '@mui/lab/SpeedDialIcon';
import SpeedDialAction from '@mui/lab/SpeedDialAction';

import { getValue } from '../../utils/properties';


const SQSpeedDial = ({ actions = [], className = '', label = '', onClick, onAction, row, column }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const finalActions = getValue(this, actions, row, column) || [];

  return (
    <div className={`sq-speed-dial ${className}`}>
      <SpeedDial
        ariaLabel={label}
        className={`sq-speed-dial__speed-dial`}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction={'up'}
      >
        {finalActions.map((action) => (
          <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={handleClose} />
        ))}
      </SpeedDial>
    </div>
  );
};

SQSpeedDial.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  row: PropTypes.object,
  column: PropTypes.object,
  onClick: PropTypes.func,
  onAction: PropTypes.func,
  actions: PropTypes.oneOfType([PropTypes.array, PropTypes.func])
};

export default SQSpeedDial;
