import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

import { getValue } from '../../utils/properties';

import './speed-dial.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    transform: 'translateZ(0px)',
    flexGrow: 1
  },
  exampleWrapper: {
    position: 'relative',
    marginTop: theme.spacing(3),
    height: 380
  },
  radioGroup: {
    margin: theme.spacing(1, 0)
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2)
    }
  }
}));

const SQSpeedDial = ({ actions = [], className = '', label = '', onClick, onAction, row, column }) => {
  const classes = useStyles();
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
        className={`${classes.speedDial} sq-speed-dial__speed-dial`}
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
