import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Form from '../../components/Form';
import Wrapper from '../../components/Wrapper';
import { getMap, addComp } from '../../components';
import { Validator } from '../../utils/validator';
import { object, common, validator } from '../../utils';
import { addComp as addUIComp, getMap as getUIMap } from '../../components/ui';
import ErrorBoundary from '../../components/ErrorBoundry';
import Dialog from '../../components/Dialog';

class Content extends Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDialogAction = this.onDialogAction.bind(this);
    addUIComp({
      ...getMap(),
      Form,
      Wrapper,
    });
    addComp({
      ...getUIMap(),
    });
  }

  onChange(value, field, block) {
    const { onChange } = this.props;
    const { checkForAction = true } = value || {};
    let allForms = this.getForms(this.props.pageData.items);
    onChange && onChange(value, field, { ...block, forms: allForms });
    if (checkForAction === true) {
      this.checkForAction(value, { ...block, forms: allForms }, field);
    }
  }

  onAction(value, action, block) {
    if (action.confirm) {
      this.setState({
        confirmAction: true,
        action: action,
        actionValue: value,
      });
      return;
    }
    const { onAction } = this.props;
    let allForms = this.getForms(this.props.pageData.items);
    onAction && onAction(value, action, { ...block, forms: allForms });
  }
  onDialogAction(dialgAction, action, block) {
    if (dialgAction.action === 'ok') {
      const { onAction } = this.props;
      let allForms = this.getForms(this.props.pageData.items);
      onAction &&
        onAction(this.state.actionValue, action, { ...block, forms: allForms });
      setTimeout(() => {
        this.setState({
          confirmAction: false,
          action: null,
          actionValue: null,
        });
      }, 200);
      return;
    }
    this.setState({
      confirmAction: false,
      action: null,
      actionValue: null,
    });
  }

  getForms(items = []) {
    let allForms = [];
    items.forEach((item) => {
      let forms = [];
      if (item.items) {
        forms = this.getForms(item.items);
      }
      allForms = allForms.concat(forms);
      if (item.component === 'Form') {
        allForms.push(item);
      }
    });
    return allForms;
  }

  checkForAction(e, block, field) {
    let target = field || block;
    const actionType = target.actionType;
    if (actionType) {
      let allForms = this.getForms(this.props.pageData.items);
      this.onAction(
        {},
        {
          ...target,
        },
        { ...block, forms: allForms }
      );
    }
  }

  onClick(e, block, field) {
    this.checkForAction(e, block, field);
  }

  render() {
    const {
      pageData = {},
      location,
      keyPressChange = true,
      ...rest
    } = this.props;
    const { userData = {} } = rest;
    const { className = '' } = pageData;
    const compMap = { ...getMap(), ...getUIMap() };
    return (
      <div className={`sq-content-page__body ${className}`}>
        {pageData.items &&
          pageData.items.map((block, idx) => {
            let validator;
            let isValid = true;
            if (block.match) {
              validator = new Validator({
                ...block.match,
              });
              validator.setValues(userData);
              isValid = validator.validateAll();
            }

            const { component, ...restBlock } = block;
            const Comp = compMap[component];
            block = object.processBlock(block, { userData });
            return Comp && isValid ? (
              <ErrorBoundary key={idx}>
                <Comp
                  {...rest}
                  value={userData[block.name]}
                  {...block}
                  errors={userData[block.name + '_errors']}
                  onClick={(e, field) => {
                    this.onClick(e, block, field);
                  }}
                  onChange={(value, field) => {
                    this.onChange(value, field, block);
                  }}
                  onAction={(value, action, overrideBlock) => {
                    this.onAction(value, action, overrideBlock || block);
                  }}
                  onFieldKeyPress={(value, field, data) => {
                    keyPressChange &&
                      this.onChange(
                        {
                          value: {
                            ...data,
                            [field.name]: value.value,
                          },
                        },
                        field,
                        block
                      );
                  }}
                />
              </ErrorBoundary>
            ) : undefined;
          })}
        {this.state.action && this.state.action.confirm && (
          <Dialog
            title={this.state.action.confirm.title}
            content={this.state.action.confirm.content}
            classes={{
              body: 'sq-dialog__content-body--confirm',
            }}
            closeButton={false}
            open={this.state.confirmAction}
            onAction={(data, dialgAction) =>
              this.onDialogAction(dialgAction, this.state.action)
            }
            actions={
              this.state.action.confirm.actions || [
                {
                  buttonText: 'Yes',
                  action: 'ok',
                },
                {
                  buttonText: 'Cancel',
                  variant: 'outlined',
                  action: 'cancel',
                },
              ]
            }
          />
        )}
      </div>
    );
  }
}

Content.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object,
};

export default Content;
