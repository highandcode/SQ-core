import React from 'react';
import PropTypes from 'prop-types';
import { getMap } from '../ui';
import { object, common, validator } from '../../utils';

const Wrapper = ({
  items = [],
  className = '',
  onChange,
  onFieldKeyPress,
  ...rest
}) => {
  const { userData } = rest;
  const map = { ...getMap(), Wrapper };
  const handleChange = (value, field, block) => {
    var finalBlock = field.block || block;
    onChange &&
      onChange(
        {
          value: {
            ...userData[finalBlock.name],
            ...value.value,
          },
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
        <div className="sq-wrapper__body row">
          {items.map((item, idx) => {
            const newItem = object.processBlock(item, {userData});
            const Component = map[newItem.component] || map.Text;
            return (
              <Component
                key={idx}
                {...rest}
                onChange={(value, field) => handleChange(value, field, newItem)}
                onFieldKeyPress={(value, field, data) =>
                  handleOnFieldChange(value, field, data, newItem)
                }
                errors={userData[newItem.name + '_errors']}
                value={userData[newItem.name]}
                {...newItem}
              />
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
