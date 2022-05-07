import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { redirectTo } from '../../utils/redirect';
import { Validator } from '../../utils/validator';
import { translate } from '../../utils/translate';
import Form from '../../components/Form';
import Alert from '../../components/Alert';
import { CONSTANTS } from '../../globals';

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      globalError: ''
    };
    this.onResetClick = this.onResetClick.bind(this);
    this.onResetChange = this.onResetChange.bind(this);
    this.validator = new Validator({
      emailphone: {
        validators: [{ type: 'required' }, { type: 'emailphone' }]
      }
    });
  }

  onResetChange(fieldVal, field) {
    this.validator.setValue(field.name, fieldVal.value);
    this.validator.validate(field.name, fieldVal.value);
    this.setState({
      errors: this.validator.errors
    });
  }

  async onResetClick(formData, action) {
    if (action.actionType === 'reset-password') {
      this.validator.setValues(formData);
      if (this.validator.validateAll()) {
        const resp = await this.props.authActions.sendResetPasswordEmail(formData.emailphone);
        if (resp.status === CONSTANTS.STATUS.SUCCESS) {
          redirectTo('resetpasswordlinksent');
        } else {
          redirectTo('badrequest');
        }
      }
      this.setState({
        errors: this.validator.errors
      });
    }
  }

  fields = [
    {
      name: 'emailphone',
      cmpType: 'Input',
      label: 'Email/Phone'
    }
  ];

  actions = [
    {
      cmpType: 'Button',
      actionType: 'reset-password',
      buttonText: 'Reset My Password'
    }
  ];

  render() {
    return (
      <div className="login">
        <h2>{translate('Forgot my password')}</h2>
        {this.state.globalError && <Alert type="error" message={this.state.globalError} />}
        <Form
          fields={this.fields}
          actions={this.actions}
          onFieldKeyPress={this.onResetChange}
          onAction={this.onResetClick}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  authActions: PropTypes.object,
  store: PropTypes.object
};

export default ForgotPassword;
