import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import IconExpandLess from '@material-ui/icons/ExpandLess';
import IconExpandMore from '@material-ui/icons/ExpandMore';

import Icon from 'sq-core/web/components/Icon';
import { translate } from 'sq-core/web/utils/translate';

const styles = {
  title: {
    fontSize: 24
  },
  logoItem: {
    backgroundColor: '#fff'
  },
  fullList: {
    paddingTop: 0,
    width: 250
  }
};

class TemporaryDrawer extends React.Component {
  constructor() {
    super();
    this.state = {
      open: {}
    };
    this.handleOnClose = this.handleOnClose.bind(this);
  }

  handleOnClose() {
    const { onClose } = this.props;
    onClose && onClose();
  }
  handleOnMenuItemClick(item) {
    const { onMenuItemClick } = this.props;
    onMenuItemClick && onMenuItemClick(item);
    this.handleOnClose();
  }

  render() {
    const { classes, options = [], appVersion, logoIcon = {} } = this.props;

    return (
      <div className="sq-global-navigation-drawer">
        <Drawer className={classes.root} anchor="right" open={this.props.open} onClose={this.handleOnClose}>
          <div className={classes.fullList} role="presentation" onKeyDown={this.handleOnClose}>
            <List className={classes.fullList}>
              <ListItem
                className={classes.logoItem}
                onClick={() =>
                  this.props.logoUrl &&
                  this.handleOnMenuItemClick({
                    to: this.props.logoUrl
                  })
                }
              >
                <ListItemIcon>
                  <Icon name="logo-full" size="wide" {...logoIcon} />
                </ListItemIcon>
              </ListItem>
              <Divider />
              {options.map((item, index) => {
                if (item === '-') {
                  return <Divider key={index} />;
                }
                const isExpandable = item.children && item.children.length > 0;
                if (!isExpandable) {
                  return (
                    <ListItem
                      button
                      key={index}
                      onClick={() => {
                        const result = item.onClick && item.onClick();
                        if (result !== false) {
                          this.handleOnMenuItemClick(item);
                        }
                      }}
                    >
                      <ListItemIcon>{item.icon && <Icon name={item.icon} size={item.iconSize} />}</ListItemIcon>
                      <ListItemText primary={translate(item.text)} />
                    </ListItem>
                  );
                } else {
                  return (
                    <Fragment key={index}>
                      <ListItem
                        button
                        key={index}
                        onClick={() => {
                          this.setState({
                            open: {
                              ...this.state.open,
                              [index]: !this.state.open[index]
                            }
                          });
                        }}
                      >
                        <ListItemIcon>{item.icon && <Icon name={item.icon} size={item.iconSize} />}</ListItemIcon>
                        <ListItemText primary={translate(item.text)} />
                        {isExpandable && !this.state.open[index] && <IconExpandMore />}
                        {isExpandable && this.state.open[index] && <IconExpandLess />}
                      </ListItem>
                      <Collapse in={this.state.open[index]} timeout="auto" unmountOnExit>
                        <Divider />
                        <List component="div" disablePadding>
                          {item.children.map((item, index) => (
                            <ListItem
                              button
                              key={index}
                              onClick={() => {
                                const result = item.onClick && item.onClick();
                                if (result !== false) {
                                  this.handleOnMenuItemClick(item);
                                }
                              }}
                            >
                              <ListItemIcon>{item.icon && <Icon name={item.icon} size={item.iconSize} />}</ListItemIcon>
                              <ListItemText primary={translate(item.text)} />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </Fragment>
                  );
                }
              })}
            </List>
            <div className="sq-global-navigation-drawer__app-version">
              {appVersion && translate('v')}
              {appVersion}
            </div>
          </div>
        </Drawer>
      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  onClose: PropTypes.func,
  classes: PropTypes.object,
  logoUrl: PropTypes.string,
  onMenuItemClick: PropTypes.func,
  open: PropTypes.bool,
  appVersion: PropTypes.string,
  options: PropTypes.array
};

export default withStyles(styles)(TemporaryDrawer);
