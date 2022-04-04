import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { getMap } from '../../components';
import { Validator } from '../../utils/validator';
import { object, common } from '../../utils';
import { addComp } from '../../components/ui';
import Form from '../../components/Form';

import './_content.scss';

addComp({
  Form,
});
@inject('commonStore', 'contentStore')
@observer
class Content extends Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChange(value, field, block) {
    const { onChange } = this.props;
    onChange && onChange(value, field, block);
  }

  onAction(value, action, block) {
    const { onAction } = this.props;
    onAction && onAction(value, action, block);
  }

  processBlock(block) {
    const { userData } = this.props;
    Object.keys(block).forEach((keyForBlock) => {
      if (Array.isArray(block[keyForBlock])) {
        block[keyForBlock].forEach((item) => {
          if (item.inject) {
            Object.keys(item.inject).forEach((key) => {
              item[key] = object.getDataFromKey(userData, item.inject[key]);
            });
          }
        });
      } else if (
        typeof block[keyForBlock] === 'object' &&
        !common.isNullOrUndefined(block[keyForBlock])
      ) {
        const item = block[keyForBlock];
        if (item.inject) {
          Object.keys(item.inject).forEach((key) => {
            item[key] = object.getDataFromKey(userData, item.inject[key]);
          });
        }
      }
    });
    if (block.inject) {
      Object.keys(block.inject).forEach((key) => {
        block[key] = object.getDataFromKey(userData, block.inject[key]);
      });
    }
    return block;
  }

  checkForAction(e, block, field) {
    let target = field || block;
    const actionType = target.actionType;
    if (actionType) {
      let allForms = [];
      this.props.pageData.items.forEach((item) => {
        if (item.items) {
          item.items.forEach((item) => {
            if (item.component === 'Form') {
              allForms = allForms.concat(item);
            }
          });
        }
        if (item.component === 'Form') {
          allForms = allForms.concat(item);
        }
      });
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
            block = this.processBlock(block);
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
