import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { redirectTo } from '../../utils/redirect';
import { Validator } from '../../utils/validator';
import { translate } from '../../utils/translate';
import Form from '../../components/Form';
import Alert from '../../components/Alert';
import { CONSTANTS } from '../../globals';

@inject('commonStore', 'userStore')
@observer
class ResendVerifyEmail extends Component {
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
        const resp = await this.props.userStore.resendVerifyEmail(formData.emailphone);
        if (resp.status === CONSTANTS.STATUS.SUCCESS) {
          redirectTo('verifyemailsent');
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
      buttonText: 'Resend'
    }
  ];

  render() {
    return (
      <div className="resend-email">
        <h2>{translate('Resend Email Verify Link')}</h2>
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

ResendVerifyEmail.propTypes = {
  commonStore: PropTypes.object,
  userStore: PropTypes.object,
  store: PropTypes.object
};

export default ResendVerifyEmail;
