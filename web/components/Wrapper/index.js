import React from 'react';
import PropTypes from 'prop-types';
import { getMap } from '../ui';
import { Validator } from '../../utils/validator';
import { object } from '../../utils';
import ErrorBoundary from '../ErrorBoundry';

const Wrapper = ({ items = [], className = '', bodyClassName = 'row', onClick, onAction, onChange, onFieldKeyPress, ...rest }) => {
  const { userData } = rest;
  const map = { ...getMap(), Wrapper };
  const handleChange = (value, field, block) => {
    var finalBlock = field.block || block;

    let latestValue = {};

    if (typeof userData[finalBlock.name] === 'object') {
      latestValue = {
        ...userData[finalBlock.name],
      };
    }
    if (typeof value.value === 'object') {
      latestValue = {
        ...latestValue,
        ...value.value,
      };
    } else {
      latestValue = value.value;
    }

    onChange &&
      onChange(
        {
          value: latestValue,
        },
        {
          ...field,
          block: finalBlock,
        }
      );
  };
  const handleOnFieldChange = (value, field, data, block) => {
    onChange &&
      onChange(
        {
          value: {
            ...userData[block.name],
            [field.name]: value.value,
          },
        },
        {
          ...field,
          block,
        }
      );
  };

  return (
    <div className={`sq-wrapper ${className}`}>
      <div className="container-fluid">
        <div className={`sq-wrapper__body ${bodyClassName}`}>
          {items.map((item, idx) => {
            const newItem = object.processBlock(item, { userData });
            const Component = map[newItem.component] || map.Text;
            let validator;
            let isValid = true;
            if (item.match) {
              validator = new Validator({
                ...item.match,
              });
              validator.setValues(userData);
              isValid = validator.validateAll();
            }
            return (
              isValid && (
                <ErrorBoundary key={idx}>
                  <Component
                    {...rest}
                    onClick={(e, field) => {
                      onClick && onClick(e, field || newItem);
                    }}
                    onAction={(e, field, block) => {
                      onAction && onAction(e, field || newItem, block || newItem);
                    }}
                    onChange={(value, field) => handleChange(value, field, newItem)}
                    onFieldKeyPress={(value, field, data) => handleOnFieldChange(value, field, data, newItem)}
                    errors={userData[newItem.name + '_errors']}
                    value={userData[newItem.name]}
                    {...newItem}
                  />
                </ErrorBoundary>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

Wrapper.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array,
};

export default Wrapper;
