import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Tabs from '../Tabs';

export const NavTabs = ({ onChange, onAction, ...rest }) => {
  const handleChange = (item) => {
    if (item.data.actionType) {
      onAction && onAction({}, item.data);
    }
    onChange && onChange(item);
  };

  return (
    <div className="sq-nav-tabs">
      <Tabs
        {...rest}
        onChange={handleChange}
      />
    </div>
  );
};

NavTabs.propTypes = {
  onChange: PropTypes.func,
  onAction: PropTypes.func,
};

export default NavTabs;
