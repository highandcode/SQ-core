import React from 'react';
import PropTypes from 'prop-types';
import { redirectTo } from 'sq-core/web/utils/redirect';
import AppBar from './AppBar';
import Drawer from './Drawer';
import './navigation.scss';

class SQNavigation extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false
    };

    this.onMenuClick = this.onMenuClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }

  onMenuClick(item) {
    this.setState({
      open: !this.state.open
    });
  }
  handleClose() {
    this.setState({
      open: false
    });
  }

  onMenuItemClick(item) {
    const { onMenuItemClick } = this.props;
    onMenuItemClick && onMenuItemClick(item);
    if (item.to) {
      redirectTo(item.to);
    }
  }

  render() {
    return (
      <nav className="sq-navigation">
        <AppBar
          color={this.props.appBarColor}
          onMenuClick={this.onMenuClick}
          rightMenu={this.props.isLoggedIn ? this.props.appRightMenu : this.props.rightMenu}
          onRightMenuClick={this.onMenuItemClick}
        />
        <Drawer
          logoUrl=""
          logoIcon={this.props.logoIcon}
          open={this.state.open}
          onClose={this.handleClose}
          onMenuItemClick={this.onMenuItemClick}
          appVersion={this.props.appVersion}
          options={this.props.options}
        />
      </nav>
    );
  }
}

SQNavigation.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLogout: PropTypes.func,
  appVersion: PropTypes.string,
  appBarColor: PropTypes.string
};

export default SQNavigation;
