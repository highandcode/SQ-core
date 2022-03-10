import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { getMap } from '../../components';
import { Validator } from '../../utils/validator';
import {object} from '../../utils';
import './_content.scss';

@inject('commonStore', 'contentStore')
@observer
class Content extends Component {
  constructor() {
    super();
    this.state = {};
    this.onChange = this.onChange.bind(this);
  }
  onChange(value, block) {
    const { onChange } = this.props;
    onChange && onChange(value, block);
  }

  onAction(value, action, block) {
    const { onAction } = this.props;
    onAction && onAction(value, action, block);
  }

  processBlock(block) {
    const { userData } = this.props;
    Object.keys(block).forEach((blockey) => {
      if (Array.isArray(block[blockey])) {
        block[blockey].forEach((item) => {
          if (item.inject) {
            Object.keys(item.inject).forEach((key) => {
              item[key] = object.getDataFromKey(userData, item.inject[key]);
            });
          }
        });
      } else if (typeof block[blockey] === 'object') {
        const item = block[blockey];
        if (item.inject) {
          Object.keys(item.inject).forEach((key) => {
            item[key] = object.getDataFromKey(userData, item.inject[key]);
          });
        }
      }
    });
    return block;
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
                ...block.match
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
                {...block}
                value={userData[block.name]}
                onChange={(value) => {
                  this.onChange(value, block);
                }}
                onAction={(value, action) => {
                  this.onAction(value, action, block);
                }}
                onFieldKeyPress={(value, field, data) => {
                  this.onChange(
                    {
                      value: {
                        ...data,
                        [field.name]: value.value
                      }
                    },
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
  contentStore: PropTypes.object
};

export default Content;
