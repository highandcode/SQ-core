import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';

const createList = (tag, values) => {
  const Tag = tag;

  return <Tag>
    {values.map((item) => {
      return <li className={`${item.className}`}>
        <div className={`sq-list__item-text`}>{item.text}</div>
        {item.value && createList(item.type || tag, item.value)}
      </li>
    })}
  </Tag>
}

const List = ({
  value = [],
  type: ListTag = 'ul',
  children,
  className = '',
  size = 'normal',
  iconDirection = 'left',
  color = 'default',
  iconName,
  iconColor
}) => {

  return (
    <div className="sq-list">
      {createList(ListTag, value)}
    </div>
  );
};
List.propTypes = {
  className: PropTypes.string
};

export default List;
