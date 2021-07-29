import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { redirectTo } from '../../utils/redirect';
import { Validator } from '../../utils/validator';
import { query } from '../../utils/query-string';
import { translate } from '../../utils/translate';
import Form from '../../components/Form';
import Alert from '../../components/Alert';
import { CONSTANTS } from '../../globals';

@inject('commonStore', 'userStore')
@observer
class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      globalError: ''
    };
    this.onResetClick = this.onResetClick.bind(this);
    this.onResetChange = this.onResetChange.bind(this);
    this.validator = new Validator({
      password: {
        validators: [{ type: 'required' }, { type: 'password' }],
        impactOn: ['confirmPassword']
      },
      confirmPassword: {
        validators: [
          { type: 'required' },
          { type: 'compareField', fieldName: 'password', message: translate('Password and Confirm password should match.') }
        ]
      }
    });
  }

  componentDidMount() {
    const params = query.get();
    if (!params.token) {
      redirectTo('login');
    }
  }

  onResetChange(fieldVal, field) {
    this.validator.setValue(field.name, fieldVal.value);
    this.validator.validate(field.name);
    this.setState({
      errors: this.validator.errors
    });
  }

  async onResetClick(formData, action) {
    if (action.actionType === 'change-password') {
      this.validator.setValues(formData);
      if (this.validator.validateAll()) {
        const params = query.get();
        const resp = await this.props.userStore.changePassword({
          token: params.token,
          password: formData.password
        });
        if (resp.status === CONSTANTS.STATUS.SUCCESS) {
          redirectTo('passwordchanged');
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
      name: 'password',
      cmpType: 'Input',
      type: 'password',
      label: translate('New Password')
    },
    {
      name: 'confirmPassword',
      type: 'password',
      cmpType: 'Input',
      label: translate('Confirm Password')
    }
  ];

  actions = [
    {
      cmpType: 'Button',
      actionType: 'change-password',
      buttonText: 'Change Password'
    }
  ];

  render() {
    return (
      <div className="reset-password">
        <h2>{translate('Reset password')}</h2>
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
  commonStore: PropTypes.object,
  userStore: PropTypes.object,
  store: PropTypes.object
};

export default ForgotPassword;
