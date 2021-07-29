import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  displayColumn: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  displayInline: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap'
  }

};


const RadioField = ({ classes, name, options = [], defaultValue = '', className = '', value = '', label = '', onChange, errorMessage, display = 'Column', valueField = 'value', textField = 'text' }) => {
  const handleChange = (input) => {
    onChange && onChange({
      value: input.target.value
    });
  };
  return <div className={`sq-radio ${className}`}>
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup aria-label={name} name={name} className={`${classes['display' + display]}`} value={value || defaultValue} onChange={handleChange}>
        {options && options.map((option, index) => {
          return <FormControlLabel key={index} value={option[valueField]} disabled={option.disabled} control={<Radio />} label={option[textField]} />;
        })}
      </RadioGroup>
      {<div className="sq-error sq-select-field--error">{errorMessage}</div>}
    </FormControl>
  </div>;
};

RadioField.propTypes = {
  defaultValue: PropTypes.string,
  name: PropTypes.string,
  valueField: PropTypes.string,
  textField: PropTypes.string,
  display: PropTypes.string,
  classes: PropTypes.object,
  errorMessage: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default withStyles(styles)(RadioField);