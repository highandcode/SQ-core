import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { getValue } from '../../../utils/properties';
import { masks } from '../../../utils/mask';
import { validators } from '../../../utils/validator';
import './input-field.scss';

class InputField extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      valueBeforeKeyUp: '',
      focused: false,
      hasChanged: false
    };
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
    this.handleOnKeyUp = this.handleOnKeyUp.bind(this);
  }

  handleOnChange(evt) {
    const { keyup = {} } = this.props;
    const { type, ...rest } = keyup;
    const keyUpValidator = validators[type];
    let value = this.removeMask(evt.target.value);
    if (keyUpValidator && value && keyUpValidator(value, rest) === false) {
      value = this.removeMask(this.state.valueBeforeKeyUp);
    }
    this.setState({
      value: value,
      hasChanged: true
    });
    const { onKeyPress, onAnalytics, analytics = {} } = this.props;
    onKeyPress &&
      onKeyPress({
        value: value
      });
    const { keypress } = analytics;
    keypress &&
      onAnalytics &&
      onAnalytics({
        ...keypress
      });
  }

  componentDidMount() {
    this.setState({
      value: this.props.value !== undefined ? this.removeMask(this.props.value) : ''
    });
  }

  applyMask(value = '') {
    const { mask = {} } = this.props;
    const { type, ...rest } = mask;
    return masks[type]
      ? masks[type].mask(value, {
          input: this.state.focused,
          ...rest
        })
      : value;
  }

  removeMask(value = '') {
    const { mask = {} } = this.props;
    const { type, ...rest } = mask;
    return masks[type]
      ? masks[type].unmask(value, {
          input: this.state.focused,
          ...rest
        })
      : value;
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.removeMask(this.props.value)
      });
    }
  }

  handleFocus() {
    this.setState({
      focused: true
    });
    const { onAnalytics, analytics = {} } = this.props;
    const { focus } = analytics;
    focus &&
      onAnalytics &&
      onAnalytics({
        ...focus
      });
  }

  handleBlur() {
    const { onBlur, onChange, onAnalytics, analytics = {} } = this.props;
    const { change } = analytics;
    this.setState({
      focused: false
    });
    if (this.state.value != this.props.value || this.state.value === '') {
      onBlur &&
        onBlur({
          value: this.state.value
        });
      onChange &&
        onChange({
          value: this.state.value
        });
      change &&
        onAnalytics &&
        onAnalytics({
          ...change
        });
    }
  }
  handleOnKeyDown(e) {
    this.setState({
      valueBeforeKeyUp: e.target.value
    });
  }
  handleOnKeyUp(e) {
    if (e.key === 'Enter') {
      this.handleOnChange(e);
      this.handleBlur();
    }
  }

  render() {
    const { focused } = this.state;
    const { errorMessage, className = '', formatter, onAnalytics, onAction, mask = {}, sideAction, row, ...rest } = this.props;
    const finalAction = getValue(this, sideAction, row);
    let formattedValue = this.applyMask(this.state.value);
    return (
      <div className={`sq-input-field${focused ? ' sq-input-field--focused' : ''} ${className}`}>
        <div className="sq-input-field__container">
          <TextField
            className="sq-input-field__input"
            variant="outlined"
            {...rest}
            error={rest.error}
            value={formattedValue}
            onChange={this.handleOnChange}
            onKeyPress={this.handleOnKeyUp}
            onKeyDown={this.handleOnKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
          {finalAction && <div className="sq-input-field__side-actions">{finalAction}</div>}
        </div>
        {!focused && errorMessage && <div className="sq-input-field--error">{errorMessage}</div>}
      </div>
    );
  }
}

InputField.propTypes = {
  errorMessage: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.any,
  formatter: PropTypes.object,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onBlur: PropTypes.func
};
export { TextField as StyledTextField };
export default InputField;
