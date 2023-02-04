import React from 'react';
import PropTypes from 'prop-types';
import Link from '../Link';

const LinkBlock = ({ ...rest }) => {
  return (
    <div className="sq-link-block">
      <Link size={'large'} {...rest} />
    </div>
  );
};
LinkBlock.propTypes = {
  size: PropTypes.string,
  iconDirection: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  iconName: PropTypes.string,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  onClick: PropTypes.func,
  to: PropTypes.string
};

export default LinkBlock;
