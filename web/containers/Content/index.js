import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getMap } from '../../components';
import { Validator } from '../../utils/validator';
import { object, common, validator } from '../../utils';
import { addComp } from '../../components/ui';
import Form from '../../components/Form';

import './_content.scss';

addComp({
  Form,
});
class Content extends Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(value, field, block) {
    const { onChange } = this.props;
    let allForms = this.getForms(this.props.pageData.items);
    onChange && onChange(value, field, { ...block, forms: allForms });
  }

  onAction(value, action, block) {
    const { onAction } = this.props;
    let allForms = this.getForms(this.props.pageData.items);
    onAction && onAction(value, action, { ...block, forms: allForms });
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
    const { pageData = {}, location, ...rest } = this.props;
    const { userData = {} } = rest;
    const { pathname } = location;
    const { className = '' } = pageData;
    const compMap = getMap();

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

            const Comp = compMap[block.component];
            block = object.processBlock(block, {userData});
            return Comp && isValid ? (
              <Comp
                key={pathname + idx}
                {...rest}
                value={userData[block.name]}
                errors={userData[block.name + '_errors']}
                {...block}
                onClick={(e, field) => {
                  this.onClick(e, block, field);
                }}
                onChange={(value, field) => {
                  this.onChange(value, field, block);
                }}
                onAction={(value, action) => {
                  this.onAction(value, action, block);
                }}
                onFieldKeyPress={(value, field, data) => {
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
            ) : undefined;
          })}
      </div>
    );
  }
}

Content.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object,
};

export default Content;
