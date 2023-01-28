import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { redirectTo } from '../../utils/redirect';

import { Validator } from '../../utils/validator';
import { translate } from '../../utils/translate';
import Form from '../../components/Form';
import Alert from '../../components/Alert';
import Progress from '../../components/Progress';

import { CONSTANTS } from '../../globals';

class Contact extends Component {
  constructor() {
    super();
    this.state = {
      globalError: '',
      isSubmitting: false,
      resendEmailVerify: false,
    };
    this.onContactClick = this.onContactClick.bind(this);
    this.onContactChange = this.onContactChange.bind(this);
    this.validator = new Validator({
      fullName: {
        validators: [{ type: 'required' }],
      },
      email: {
        validators: [{ type: 'required' }, { type: 'email' }],
      },
      phone: {
        optional: true,
        validators: [{ type: 'internationalphone' }],
      },
      subject: {
        validators: [{ type: 'required' }],
      },
      body: {
        validators: [{ type: 'required' }],
      },
    });
  }

  onContactChange(fieldVal, field) {
    this.validator.setValue(field.name, fieldVal.value);
    this.validator.validate(field.name, fieldVal.value);
    this.setState({
      errors: this.validator.errors,
    });
  }

  async onContactClick(formData, action) {
    if (action.actionType === 'contact') {
      this.validator.setValues(formData);
      if (this.validator.validateAll()) {
        this.setState({
          isSubmitting: true,
        });
        const response = await this.props.contentActions
          .sendContact({ url: this.props.pageData.postUrl, payload: formData })
          .unwrap();
        this.setState({
          isSubmitting: false,
        });
        if (response.status === CONSTANTS.STATUS.SUCCESS) {
          redirectTo('messagesent');
        } else if (response.status === CONSTANTS.STATUS.ERROR) {
          if (response.error.errors) {
            this.setState({
              errors: response.error.errors,
            });
          } else {
            this.setState({
              globalError: response.error.message,
            });
          }
          return;
        }
      }
      this.setState({
        errors: this.validator.errors,
        globalError: '',
      });
    }
  }

  fields = [
    {
      name: 'fullName',
      cmpType: 'Input',
      label: 'Full Name',
    },
    {
      name: 'email',
      cmpType: 'Input',
      label: 'Email',
    },
    {
      name: 'phone',
      cmpType: 'Input',
      label: 'Contact number (optional)',
    },
    {
      name: 'subject',
      cmpType: 'Input',
      label: 'Subject',
    },
    {
      name: 'body',
      cmpType: 'RichText',
      label: 'Message',
      editorStyle: 'basic',
      placeholder: 'Type your message',
      height: 150,
      multiline: true,
      rowsMax: 6,
      rows: 6,
    },
  ];

  render() {
    return (
      <>
        <h1 className="game-page-title">{translate('Contact us')}</h1>
        {this.state.isSubmitting && <Progress className='tp-progress--active' />}
        {this.state.globalError && (
          <Alert
            type="error"
            className={'mb-wide'}
            message={this.state.globalError}
          />
        )}
        <Form
          fields={this.fields}
          actions={[
            {
              cmpType: 'Button',
              color: 'primary',
              actionType: 'contact',
              buttonText: 'Contact',
              disabled: this.state.isSubmitting,
            },
          ]}
          onFieldKeyPress={this.onContactChange}
          onAction={this.onContactClick}
          errors={this.state.errors}
        />
      </>
    );
  }
}

Contact.propTypes = {
  commonStore: PropTypes.object,
  authStore: PropTypes.object,
  store: PropTypes.object,
};

export default Contact;
