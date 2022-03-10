import React from 'react';
import PropTypes from 'prop-types';
import './form.scss';

import { getMap } from '../ui/index';
import { Validator } from '../../utils/validator';
let supportedComponents = getMap();

export const registerComponents = (newComps) => {
  supportedComponents = {
    ...supportedComponents,
    ...newComps
  };
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      validated: false,
      lastAction: null
    };
    this.form_onKeyPress = this.form_onKeyPress.bind(this);
  }

  form_onKeyPress(evt) {
    if (evt.key === 'Enter') {
      evt.stopPropagation();
      const { defaultAction = this.props.actions && this.props.actions[0] } = this.props;
      setTimeout(() => defaultAction && this.handleAction(defaultAction));
      this.setState({
        lastAction: defaultAction
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        data: {
          ...this.props.value
        }
      });
    }
  }

  onChange(field, selectedValue, data) {
    const { onChange, onFieldChange } = this.props;
    const updatedData = {
      ...this.state.data,
      ...this.props.value,
      [field.name]: selectedValue.value
    };
    this.setState({
      data: {
        ...this.state.data,
        [field.name]: selectedValue.value
      }
    });
    onChange &&
      onChange(
        {
          value: updatedData
        },
        field,
        data
      );
    onFieldChange &&
      onFieldChange(
        {
          ...selectedValue
        },
        field,
        data
      );
  }

  render() {
    const { className = '', fields = [], value = {}, actions = [], errors = {}, actionConfig = {} } = this.props;
    return (
      <div className={`sq-form-cmp ${className}`} onKeyPress={this.form_onKeyPress}>
        <div className="sq-form-cmp_fields">
          {fields.map((field, index) => {
            return this.renderComp(field, value[field.name], errors[field.name], value, index);
          })}
        </div>
        <div className={`sq-form-cmp_actions ${actionConfig.className || ''}`}>
          {actions.map((action, index) => {
            return this.renderAction(action, index, actionConfig);
          })}
        </div>
      </div>
    );
  }

  renderComp(field, value, error, data, index) {
    const { onAnalytics, userData = {} } = this.props;
    const { cmpType, containerClass = '', beforeRender, ...options } = field;
    const supportedComponents = getMap();
    const Comp = supportedComponents[cmpType] || supportedComponents.Input;
    let finalOptions = {
      ...options
    };
    let isRender = true;
    if (field.match) {
      const validator = new Validator(field.match);
      validator.setValues({...userData, ...data});
      isRender = validator.validateAll();
    }

    if (isRender && typeof beforeRender === 'function') {
      const result = beforeRender(field, value, {...userData, ...data});
      if (result === false) {
        isRender = result;
      } else {
        const { isRender: returnIsRender, ...overrides } = result;
        isRender = !(returnIsRender === false);
        finalOptions = {
          ...finalOptions,
          ...overrides
        };
      }
    }
    return (
      isRender && (
        <div className={`sq-form-cmp__field ${containerClass}`} key={index}>
          {
            <Comp
              {...finalOptions}
              value={value}
              row={data}
              onChange={(fieldData) => this.onChange(field, fieldData, data)}
              onKeyPress={(fieldData) => this.handleOnKeyPress(field, fieldData, data)}
              onAnalytics={onAnalytics}
              {...error}
            />
          }
        </div>
      )
    );
  }

  handleAction(action) {
    const { onAction, value } = this.props;
    onAction &&
      onAction(
        {
          ...value,
          ...this.state.data
        },
        action
      );
  }

  handleOnKeyPress(field, selectedValue, data) {
    const { onFieldKeyPress } = this.props;
    onFieldKeyPress &&
      onFieldKeyPress(
        {
          ...selectedValue
        },
        field,
        data
      );
  }

  renderAction(action, index, config) {
    const { onAnalytics } = this.props;
    const { cmpType, actionType, className, actionClassName = '', ...options } = action;
    const supportedComponents = getMap();

    const Comp = supportedComponents[cmpType] || supportedComponents.Button;
    return (
      <div className={`sq-form-cmp__action ${actionClassName}`} key={`sq-fa-${index}`}>
        <Comp
          key={index}
          className={className}
          {...options}
          onClick={(evt) => {
            if (this.state.lastAction === action) {
              this.setState({
                lastAction: null
              });
            } else {
              this.handleAction(action);
            }
          }}
          onAnalytics={onAnalytics}
        />
      </div>
    );
  }
}

Form.propTypes = {
  defaultAction: PropTypes.object,
  value: PropTypes.object,
  errors: PropTypes.object,
  userData: PropTypes.object,
  fields: PropTypes.array,
  actions: PropTypes.array,
  onChange: PropTypes.func,
  onFieldChange: PropTypes.func,
  onFieldKeyPress: PropTypes.func,
  onAction: PropTypes.func,
  onValidate: PropTypes.func,
  errorMessage: PropTypes.func
};

export default Form;
