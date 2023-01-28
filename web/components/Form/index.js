import React from 'react';
import PropTypes from 'prop-types';
import './form.scss';

import { getMap } from '../ui/index';
import { Validator } from '../../utils/validator';
import ErrorBoundry from '../ErrorBoundry';
let supportedComponents = getMap();

export const registerComponents = (newComps) => {
  supportedComponents = {
    ...supportedComponents,
    ...newComps,
  };
};

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {},
      validated: false,
      lastAction: null,
    };
    this.form_onKeyPress = this.form_onKeyPress.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  form_onKeyPress(evt) {
    if (this.props.submitOnEnter !== false && evt.key === 'Enter') {
      evt.stopPropagation();
      const { defaultAction = this.props.actions && this.props.actions[0] } = this.props;
      setTimeout(() => defaultAction && this.handleAction(evt, defaultAction));
      this.setState({
        lastAction: defaultAction,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        data: {
          ...this.props.value,
        },
      });
    }
  }

  onClick(e, field, data) {
    const { onClick } = this.props;
    onClick && onClick(e, field, data);
  }
  onChange(field, selectedValue, data) {
    const { onChange, onFieldChange } = this.props;
    const updatedData = {
      ...this.state.data,
      ...this.props.value,
      [field.name]: selectedValue.value,
    };
    this.setState({
      data: {
        ...this.state.data,
        [field.name]: selectedValue.value,
      },
    });
    onChange &&
      onChange(
        {
          value: updatedData,
          orignField: selectedValue.orignField || field,
          formTrace: selectedValue.formTrace && field.cmpType === 'Form' ? [field, ...selectedValue.formTrace] : [],
        },
        field,
        data
      );
    onFieldChange &&
      onFieldChange(
        {
          ...selectedValue,
        },
        field,
        data
      );
  }

  render() {
    const { className = '', fields = [], value = {}, actions = [], errors = {}, actionConfig = {} } = this.props;
    return (
      <div className={`sq-form ${className}`} onKeyPress={this.form_onKeyPress}>
        <div className="sq-form_fields">
          {fields.map((field, index) => {
            return this.renderComp(field, value[field.name], errors[field.name], value, index);
          })}
        </div>
        {actions.length > 0 && (
          <div className={`sq-form_actions ${actionConfig.className || ''}`}>
            {actions.map((action, index) => {
              return this.renderAction(action, index, actionConfig);
            })}
          </div>
        )}
      </div>
    );
  }

  renderComp(field, value, error, data, index) {
    const { onAnalytics, userData = {} } = this.props;
    const { cmpType, containerClass = '', beforeRender, ...options } = field;
    const supportedComponents = getMap();
    const Comp = supportedComponents[cmpType] || supportedComponents.Input;
    let finalOptions = {
      ...options,
    };
    let isRender = true;
    if (field.match) {
      const validator = new Validator(field.match);
      validator.setValues({ ...userData, ...data });
      isRender = validator.validateAll();
    }

    if (isRender && typeof beforeRender === 'function') {
      const result = beforeRender(field, value, { ...userData, ...data });
      if (result === false) {
        isRender = result;
      } else {
        const { isRender: returnIsRender, ...overrides } = result;
        isRender = !(returnIsRender === false);
        finalOptions = {
          ...finalOptions,
          ...overrides,
        };
      }
    }
    return (
      isRender && (
        <div className={`sq-form__field ${containerClass}`} key={index}>
          {
            <ErrorBoundry>
              <Comp
                {...finalOptions}
                value={value}
                row={data}
                userData={userData}
                onClick={(e) => {
                  this.onClick(e, field, data);
                }}
                onAction={(dialgAction, action) => {
                  this.handleAction(dialgAction, action);
                }}
                onChange={(fieldData) => this.onChange(field, fieldData, data)}
                onKeyPress={(fieldData) => this.handleOnKeyPress(field, fieldData, data)}
                onAnalytics={onAnalytics}
                {...error}
              />
            </ErrorBoundry>
          }
        </div>
      )
    );
  }

  handleAction(evt, action) {
    const { onAction, value } = this.props;

    onAction &&
      onAction(
        {
          ...value,
          ...this.state.data,
        },
        action
      );
  }

  handleOnKeyPress(field, selectedValue, data) {
    const { onFieldKeyPress } = this.props;
    onFieldKeyPress &&
      onFieldKeyPress(
        {
          ...selectedValue,
        },
        field,
        data
      );
  }

  renderAction(action, index, config) {
    const { onAnalytics, row } = this.props;
    const { cmpType, actionType, className, actionClassName = '', beforeRender, ...options } = action;
    const supportedComponents = getMap();
    const result = beforeRender && beforeRender(action, row);
    const Comp = supportedComponents[cmpType] || supportedComponents.Button;
    return (
      <React.Fragment key={`sq-fa-${index}`}>
        {result !== false ? (
          <div className={`sq-form__action ${actionClassName}`}>
            <Comp
              key={index}
              className={className}
              {...options}
              onClick={(evt) => {
                if (this.state.lastAction === action) {
                  this.setState({
                    lastAction: null,
                  });
                } else {
                  this.handleAction(evt, action);
                }
              }}
              onAnalytics={onAnalytics}
            />
          </div>
        ) : (
          <></>
        )}
      </React.Fragment>
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
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  onFieldChange: PropTypes.func,
  onFieldKeyPress: PropTypes.func,
  onAction: PropTypes.func,
  onValidate: PropTypes.func,
  errorMessage: PropTypes.func,
};

export default Form;
