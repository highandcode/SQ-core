import React from 'react';
import PropTypes from 'prop-types';
// import { root } from 'qubejs-core/web';
import Dialog from '../Dialog';
import Icon from '../Icon';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

import './left-nav.scss';

// const { Dialog, Icon } = root;

const hasActive = (nav, naviagateChild = true) => {
  let isActive = false;
  if (nav.href === window.location.pathname) {
    return true;
  }
  if (naviagateChild && nav.children) {
    isActive = checkChildren(nav.children, window.location.pathname);
  }
  return isActive;
};

const hasMatchingRoles = (roles, userRoles) => {
  let hasRole = roles ? false : true;
  if (roles && userRoles.length > 0) {
    if (roles.indexOf(userRoles[0]) > -1) {
      hasRole = true;
    }
  }
  return hasRole;
};

const hasPermission = (item, options, children = true) => {
  let result = false;
  if (!item.hideInMenu && (options.permissions.indexOf(item.key) > -1 || !item.key) && (hasMatchingRoles(item.roles, options.roles) || !item.roles)) {
    return true;
  }

  children &&
    item?.children?.forEach((childItem) => {
      if (!item.hideInMenu && options.permissions.indexOf(childItem.key) > -1 && (hasMatchingRoles(item.roles, options.roles) || !item.roles)) {
        result = true;
      }
    });
  return result;
};

const checkChildren = (children, path) => {
  let isActive = false;
  children.forEach((child) => {
    if (!isActive && child.children?.length > 0) {
      isActive = checkChildren(child.children, path);
    }
    if (!isActive && child.href === path) {
      isActive = true;
    }
  });
  return isActive;
};

const LeftNavigation = ({ logo = {}, items = [], onClick, permissions = [], roles = [], openDrawer = false, onCloseDrawer }) => {
  const [openItems, setOpenItems] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuItems, setMenuItems] = React.useState([]);
  const [currentItem, setCurrentItem] = React.useState();
  const open = Boolean(anchorEl);
  const handleClick = (event, item) => {
    if (item.children?.length > 0) {
      setAnchorEl(event.currentTarget);
      setMenuItems(item.children);
      setCurrentItem(item);
    } else {
      onClick && onClick(item);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCurrentItem(null);
  };
  const handleDialogClose = () => {
    setOpenItems({});
    onCloseDrawer && onCloseDrawer();
  };

  const handleItemClick = (item) => {
    onClick && onClick(item);
    handleClose();
    openDrawer && handleDialogClose();
  };

  return (
    <>
      <Dialog
        transitionDir={'right'}
        title={
          <>
            {logo && <div className="sq-global-left-navigation__logo">
              {logo.mobileName && <Icon name={logo.mobileName} size="auto" />}
              {logo.mobileImage && <img src={logo.mobileImage} alt={logo.mobileAlt} />}
            </div>}
          </>
        }
        classes={{
          dialog: {
            root: 'sq-dialog--fixed-menu-left',
          },
        }}
        open={openDrawer}
        onClose={handleDialogClose}
      >
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <nav aria-label="main mailbox folders">
            <List>
              {items.map((item, idx) => {
                const isAllowed = hasPermission(item, { permissions, roles });
                if (!isAllowed) {
                  return undefined;
                }
                const isActive = hasActive(item);
                const isOpen = openItems[idx] !== undefined ? openItems[idx] : isActive;
                return (
                  <React.Fragment key={idx}>
                    <ListItem disablePadding>
                      <ListItemButton
                        onClick={() => {
                          setOpenItems({
                            ...openItems,
                            [idx]: !(isOpen || openItems[idx]),
                          });
                        }}
                      >
                        <ListItemIcon>
                          <Icon name={item.iconName} />
                        </ListItemIcon>
                        <ListItemText primary={item.header} />
                        {item.children?.length > 0 ? isOpen ? <Icon name="arrow-up" /> : <Icon name="arrow-down" /> : undefined}
                      </ListItemButton>
                    </ListItem>
                    {item.children?.length > 0 && (
                      <Collapse in={isOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {renderListItem(item, idx, handleItemClick, { permissions, roles }, false)}
                          {item.children.map((subItem, subIdx) => {
                            return renderListItem(subItem, subIdx, handleItemClick, { permissions, roles }, false);
                          })}
                        </List>
                      </Collapse>
                    )}
                  </React.Fragment>
                );
              })}
            </List>
          </nav>
        </Box>
      </Dialog>
      <div className="sq-global-left-navigation">
        {logo && <div className="sq-global-left-navigation__logo">
          {logo.name && <Icon name={logo.name} />}
          {logo.image && <img src={logo.image} alt={logo.alt} />}
        </div>}
        <div className="sq-global-left-navigation__nav-container">
          {items.map((item, idx) => {
            const isAllowed = hasPermission(item, { permissions, roles });
            if (!isAllowed) {
              return undefined;
            }
            return (
              <div key={idx} className={`sq-global-left-navigation__nav-item ${hasActive(item) ? 'active' : ''}`}>
                <Tooltip key={idx} title={item.tooltip || item.title}>
                  <IconButton size='small' onClick={(e) => handleClick(e, item)}>
                    <Icon name={item.iconName} />
                    {item.children?.length > 0 && (
                      <div className="sq-global-left-navigation__extend-wrapper">
                        <div className="sq-global-left-navigation__nav-extend"></div>
                      </div>
                    )}
                  </IconButton>
                </Tooltip>
              </div>
            );
          })}
        </div>
        <Menu
          anchorEl={anchorEl}
          open={open}
          className={`sq-global-left-navigation__menu`}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              '&.MuiPaper-root': {
                marginLeft: '10px',
              },
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          {currentItem && currentItem.header && <div className="sq-global-left-navigation__menu-header">{currentItem.header}</div>}
          <Divider />
          {currentItem && renderMenuItem(currentItem, -1, handleItemClick, { permissions, roles }, false)}
          {renderMenuItems(menuItems, handleItemClick, { permissions, roles }, false)}
        </Menu>
      </div>
    </>
  );
};

const renderListItem = (item, idx, click, options, children) => {
  const isActive = hasActive(item, false);
  const isAllowed = hasPermission(item, options, children);
  if (!isAllowed || item.hideInMenu) {
    return undefined;
  }
  return (
    <ListItemButton selected={isActive} key={idx} sx={{ pl: 4 }} onClick={() => click(item)}>
      <ListItemIcon>
        <Icon name={item.iconName} />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItemButton>
  );
};

const renderMenuItems = (items, click, options, children) => {
  return items.map((item, idx) => {
    return renderMenuItem(item, idx, click, options, children);
  });
};

const renderMenuItem = (item, idx, click, options, children) => {
  const isActive = hasActive(item, false);
  const isAllowed = hasPermission(item, options, children);
  if (!isAllowed || item.hideInMenu) {
    return undefined;
  }
  return (
    <MenuItem selected={isActive} className={isActive ? 'active' : ''} key={idx} onClick={() => click(item)}>
      {item.iconName && (
        <ListItemIcon>
          <Icon name={item.iconName} />
        </ListItemIcon>
      )}
      {item.title}
    </MenuItem>
  );
};

LeftNavigation.propTypes = {
  items: PropTypes.array,
  permissions: PropTypes.array,
  roles: PropTypes.array,
  openDrawer: PropTypes.bool,
  onClick: PropTypes.func,
  onCloseDrawer: PropTypes.func,
  logo: PropTypes.object,
};
export default LeftNavigation;
