import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@mui/material';
import InputField from '../../ui/InputField';
import Grouper from '../../Grouper';
import Button from '../../ui/Button';
import Text from '../../ui/Text';
import Default from '../../ui/Default';
import Icon from '../../Icon';
import TextFields from '../../ui/TextFields';
import LinkButton from '../../ui/LinkButton';
import MoreActions from '../../MoreActions';
import Select from '../../ui/SelectField';
import CheckboxField from '../../ui/CheckboxField';
import CheckboxList from '../../ui/CheckboxList';
import Radio from '../../ui/Radio';
import Datepicker from '../../ui/DatePicker';
import Form from '../../Form';
import Actions from '../../Actions';
import { getFormatters } from '../../../utils/format';
import { getValue } from '../../../utils/properties';
import { getMap } from '../../ui';

const GridCell = ({ column = {}, row, value, onChange, style, onClick, onAction, onAnalytics, onBlur, errors, onKeyPress, formatter = {} }) => {
  const CompMap = {
    Default,
    Text,
    InputField,
    Button,
    Select,
    LinkButton,
    Form,
    Grouper,
    Radio,
    Checkbox: CheckboxField,
    CheckboxList,
    Datepicker,
    TextFields,
    Icon,
    Actions,
    MoreActions,
    ...getMap(),
  };
  const _onChange = (newValue) => {
    onChange && onChange(column, newValue);
  };
  const _onClick = (newValue) => {
    onClick && onClick(column, newValue);
  };
  const _onAction = (evt, newValue) => {
    onAction && onAction(column, newValue);
  };
  const _Blur = (value) => {
    onBlur && onBlur(column, value);
  };
  const _onKeyPress = (value) => {
    onKeyPress && onKeyPress(column, value);
  };
  const focusedProps = column.beforeRender && column.beforeRender(column, value, row);
  const { cmpType, className = '', component, render, tooltip = {} } = { ...column, ...focusedProps };
  const CellComponent = CompMap[cmpType] || CompMap.Text;
  const { type, ...restFormatter } = formatter;
  let customValue = value;
  if (render) {
    customValue = render(value, column, row);
  }
  const formatters = getFormatters();
  const newValue = (type && formatters[type] && formatters[type](customValue, restFormatter)) || customValue;
  const { title, ...tooltipProps } = tooltip;
  const finalValTitle = getValue(this, title, row);
  return (
    <div className={`sq-grid__data-cell ${getValue(this, className, row)}`} role="grid-cell" style={style}>
      {finalValTitle && <Tooltip disableFocusListener disableTouchListener title={finalValTitle} {...tooltipProps}>
        <span>
          <CellComponent {...errors} value={newValue} {...component} row={row} column={column} onClick={_onClick} onChange={_onChange} onAnalytics={onAnalytics} onAction={_onAction} onKeyPress={_onKeyPress} onBlur={_Blur} />
        </span>
      </Tooltip>}
      {!finalValTitle &&
        <CellComponent {...errors} value={newValue} {...component} row={row} column={column} onClick={_onClick} onChange={_onChange} onAnalytics={onAnalytics} onAction={_onAction} onKeyPress={_onKeyPress} onBlur={_Blur} />
      }
    </div>
  );
};

GridCell.propTypes = {
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

export default GridCell;
