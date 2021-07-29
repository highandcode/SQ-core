import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Icon from 'sq-core/web/components/Icon';
import Badge from '@material-ui/core/Badge';

const styles = {
  root: {
    flexGrow: 1
  },
  colorGray: {
    width: '100%'
  },
  menuButton: {
    fontSize: 24
  },
  title: {
    flexGrow: 1
  }
};

class MenuAppBar extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick() {
    const { onMenuClick } = this.props;
    onMenuClick && onMenuClick();
  }

  handleClose() {}

  handleMenu() {}

  handleRightMenuClick(item) {
    const { onRightMenuClick } = this.props;
    onRightMenuClick && onRightMenuClick(item);
  }

  render() {
    const { classes, showLogo = true, rightMenu = [] } = this.props;
    return (
      <div className={`sq-navigation__app-bar ${classes.root}`}>
        <AppBar position="static" color={this.props.color} classes={{ root: classes.colorGray }}>
          <Toolbar>
            {showLogo && <Icon name="logo-full" variant="normal" size="wide" />}
            <div className="sq-d-flex__grow-yes"></div>
            <div className="sq-navigation__right-menu">
              {rightMenu.length > 0 &&
                rightMenu.map((item, idx) => {
                  const { onClick } = item;
                  return (
                    <IconButton
                      key={idx}
                      aria-label="show 4 new mails"
                      color="inherit"
                      onClick={() => {
                        const result = onClick && onClick(item);
                        if (result !== false) {
                          this.handleRightMenuClick(item);
                        }
                      }}
                    >
                      <Badge badgeContent={item.total} color="secondary">
                        <Icon name={item.icon} variant="normal" />
                      </Badge>
                    </IconButton>
                  );
                })}
            </div>
            <IconButton onClick={this.handleMenuClick} edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
              <Icon name="menu" variant="normal" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  onMenuClick: PropTypes.func,
  onRightMenuClick: PropTypes.func,
  classes: PropTypes.object,
  color: PropTypes.string,
  rightMenu: PropTypes.array,
  open: PropTypes.bool,
  showLogo: PropTypes.bool
};

export default withStyles(styles)(MenuAppBar);
