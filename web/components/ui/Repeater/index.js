import React from 'react';
import PropTypes from 'prop-types';
import { getMap } from '../index';

const Repeater = ({ items, className }) => {
  const compMap = getMap();
  return (
    <div className={`sq-repeater ${className}`}>
      {items &&
        items.map((block, idx) => {
          const Comp = compMap[block.component] || compMap.Header;
          return Comp ? <Comp key={idx} {...block} /> : undefined;
        })}
    </div>
  );
};

Repeater.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array
};

export default Repeater;
