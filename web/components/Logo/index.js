import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../assets/images/logo-new.png';
import { ReactComponent as LogoIcon } from '../../assets/svg/logo.svg';

const Logo = ({ size }) => {

  return (<div className={`tp-logo ${size}`}>
    {true && <img className={`tp-logo__icon`} src={Icon} />}
    {false && <div className="tp-logo__icon">
      <LogoIcon />
    </div>}
  </div>);
};

Logo.propTypes = {
  size: PropTypes.string
};

export default Logo;