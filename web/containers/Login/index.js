import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { redirectTo } from '../../utils/redirect';
import { Validator } from '../../utils/validator';
import Link from '../../components/ui/Link';
import { translate } from '../../utils/translate';
import Form from '../../components/Form';
import Alert from '../../components/Alert';
import { CONSTANTS } from '../../globals';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      globalError: '',
      resendEmailVerify: false
    };
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.validator = new Validator({
      emailphone: {
        validators: [{ type: 'required' }, { type: 'emailphone' }]
      },
      password: {
        validator: { type: 'required' }
      }
    });
  }

  onLoginChange(fieldVal, field) {
    this.validator.setValue(field.name, fieldVal.value);
    this.validator.validate(field.name, fieldVal.value);
    this.setState({
      errors: this.validator.errors
    });
  }

  async onLoginClick(user, action) {
    if (action.actionType === 'login') {
      this.validator.setValues(user);
      if (this.validator.validateAll()) {
        const response = await this.props.authActions.login(user);
        if (response.status === CONSTANTS.STATUS.SUCCESS) {
          redirectTo('dashboard');
        } else if (response.status === CONSTANTS.STATUS.ERROR) {
          if (response.error.errors) {
            this.setState({
              errors: response.error.errors,
              resendEmailVerify: response.error.key === 'EMAIL_NOT_VERIFIED'
            });
          } else {
            this.setState({
              globalError: response.error.message,
              resendEmailVerify: response.error.key === 'EMAIL_NOT_VERIFIED'
            });
          }
          return;
        }
      }
      this.setState({
        errors: this.validator.errors,
        globalError: ''
      });
    }
  }

  fields = [
    {
      name: 'emailphone',
      cmpType: 'Input',
      label: translate('Email/Phone')
    },
    {
      name: 'password',
      cmpType: 'Input',
      type: 'password',
      label: translate('Password')
    },
    {
      name: 'link',
      cmpType: 'LinkButton',
      buttonText: translate('Forgot password?'),
      className: 'mb-wide',
      to: 'forgotpassword'
    }
  ];

  actions = [
    {
      cmpType: 'Button',
      actionType: 'login',
      buttonText: translate('Login')
    }
  ];

  render() {
    return (
      <div className="login">
        <h2>{translate('Login')}</h2>
        <Link className="mb-wide" to="register">
          {translate("Don't have login?")}
        </Link>
        {this.state.globalError && <Alert type="error" className={'mb-wide'} message={this.state.globalError} />}
        {this.state.resendEmailVerify === true && (
          <Link className="mb-wide" to="resendverifyemail">
            {translate("Didn't get verificaiton email?")}
          </Link>
        )}
        <Form
          fields={this.fields}
          actions={this.actions}
          onFieldKeyPress={this.onLoginChange}
          onAction={this.onLoginClick}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

Login.propTypes = {
  commonStore: PropTypes.object,
  authActions: PropTypes.object,
  store: PropTypes.object
};

export default Login;
