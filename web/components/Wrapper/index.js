import React from 'react';
import PropTypes from 'prop-types';
import { getMap } from '../ui';

const Wrapper = ({
  items = [],
  className = '',
  onChange,
  onFieldKeyPress,
  ...rest
}) => {
  const { userData } = rest;
  const map = getMap();
  console.log(userData);
  const handleChange = (value, field, block) => {
    console.log(userData[block.name]);
    onChange &&
      onChange(
        {
          value: {
            ...userData[block.name],
            ...value.value,
          },
        },
        {
          ...field,
          block,
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
          {items.map((item) => {
            const Component = map[item.component] || map.Text;
            return (
              <Component
                {...rest}
                {...item}
                onChange={(value, field) => handleChange(value, field, item)}
                onFieldKeyPress={(value, field, data) =>
                  handleOnFieldChange(value, field, data, item)
                }
                errors={userData[item.name + '_errors']}
                value={userData[item.name]}
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
