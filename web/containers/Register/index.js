import React, { Component } from 'react';
import Form from '../../components/Form';
import PropTypes from 'prop-types';
import Link from '../../components/ui/Link';
import { Validator } from '../../utils/validator';
import { redirectTo } from '../../utils/redirect';
import { translate } from '../../utils/translate';

class Register extends Component {
  constructor() {
    super();
    this.state = {};
    this.validator = new Validator({
      fullName: {
        validators: [{ type: 'required' }]
      },
      email: {
        validators: [{ type: 'required' }, { type: 'email' }]
      },
      phone: {
        validators: [{ type: 'required' }, { type: 'phone' }]
      },
      password: {
        validators: [{ type: 'required' }, { type: 'password' }]
      }
    });
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.onRegisterChange = this.onRegisterChange.bind(this);
    this.onFieldKeyPress = this.onFieldKeyPress.bind(this);
  }

  onRegisterChange(fieldvalue, field) {}

  onFieldKeyPress(fieldvalue, field) {
    this.validator.setValue(field.name, fieldvalue.value);
    this.validator.validate(field.name);
    this.setState({
      errors: this.validator.errors
    });
  }

  async onRegisterClick(user, action) {
    this.validator.setValues(user);
    if (this.validator.validateAll()) {
      const response = await this.props.authActions.registerUser(user);
      if (response.status == 'success') {
        redirectTo('successregister');
      } else if (response.error) {
        this.setState({
          errors: {
            ...this.state.errors,
            ...response.error.errors
          }
        });
        return;
      }
    }
    this.setState({
      errors: this.validator.errors
    });
  }

  fields = [
    {
      name: 'fullName',
      cmpType: 'Input',
      label: translate('Full Name')
    },
    {
      name: 'email',
      cmpType: 'Input',
      label: translate('Email')
    },
    {
      name: 'phone',
      cmpType: 'Input',
      label: translate('Phone')
    },
    {
      name: 'password',
      cmpType: 'Input',
      type: 'password',
      label: translate('Password')
    }
  ];

  actions = [
    {
      cmpType: 'Button',
      actionType: 'register',
      buttonText: translate('Register')
    }
  ];

  render() {
    return (
      <div className="register">
        <h1>{translate('Register')}</h1>
        <Link className="mb-wide" to="login">
          {translate('Have login?')}
        </Link>
        <Form
          fields={this.fields}
          actions={this.actions}
          onFieldKeyPress={this.onFieldKeyPress}
          onFieldChange={this.onRegisterChange}
          onAction={this.onRegisterClick}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

Register.propTypes = {
  authActions: PropTypes.object,
  store: PropTypes.object
};

export default Register;
