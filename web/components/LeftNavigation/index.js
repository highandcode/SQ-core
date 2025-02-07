import React from 'react';
import PropTypes from 'prop-types';
// import { root } from 'qubejs-core/web';
import Dialog from '../Dialog';
import Icon from '../Icon';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import LeftDrawer from './LeftDrawer';
import { Validator } from '../../utils/validator';

// const { Dialog, Icon } = root;

export const hasActive = (nav, naviagateChild = true, userData) => {
  let isActive = false;
  let isValidMatch = true;
  if (nav.match) {
    const valid = new Validator(nav.match);
    valid.setValues(userData);
    isValidMatch = valid.validateAll();
  }
  if (isValidMatch && nav.href === window.location.pathname) {
    return true;
  }
  if (naviagateChild && nav.children) {
    isActive = checkChildren(nav.children, window.location.pathname, userData);
  }
  return isActive;
};

export const hasMatchingRoles = (roles, userRoles) => {
  let hasRole = roles ? false : true;
  if (roles && userRoles.length > 0) {
    if (roles.indexOf(userRoles[0]) > -1) {
      hasRole = true;
    }
  }
  return hasRole;
};

export const hasPermission = (item, options = {}, children = true) => {
  let result = false;
  if (!item.hideInMenu && (options?.permissions?.indexOf(item.key) > -1 || !item.key) && (hasMatchingRoles(item.roles, options.roles) || !item.roles)) {
    return true;
  }

  children &&
    item?.children?.forEach((childItem) => {
      if (!childItem.hideInMenu && options?.permissions?.indexOf(childItem.key) > -1 && (hasMatchingRoles(item.roles, options.roles) || !item.roles)) {
        result = true;
      }
    });
  return result;
};

export const checkChildren = (children, path, userData) => {
  let isActive = false;
  children.forEach((child) => {
    if (!isActive && child.children?.length > 0) {
      isActive = checkChildren(child.children, path, userData);
    }
    let isValidMatch = true;
    if (child.match) {
      const valid = new Validator(child.match);
      valid.setValues(userData);
      isValidMatch = valid.validateAll();
    }
    if (isValidMatch && !isActive && child.href === path) {
      isActive = true;
    }
  });
  return isActive;
};

const LeftNavigation = ({ logo = {}, items = [], onClick, permissions = [], roles = [], rightItems, openDrawer = false, onCloseDrawer, userData = {} }) => {
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
        <LeftDrawer items={items} rightItems={rightItems} permissions={permissions} onClick={handleItemClick} />
      </Dialog>
      <div className="sq-global-left-navigation">
        {logo && <div className="sq-global-left-navigation__logo">
          {logo.leftName && <Icon name={logo.leftName} />}
          {logo.image && <img src={logo.image} alt={logo.alt} />}
        </div>}
        <div className="sq-global-left-navigation__nav-container">
          {items.map((item, idx) => {
            const isAllowed = hasPermission(item, { permissions, roles });
            if (!isAllowed) {
              return undefined;
            }
            return (
              <div key={idx} className={`sq-global-left-navigation__nav-item ${hasActive(item, userData) ? 'active' : ''}`}>
                <Tooltip key={idx} title={item.tooltip || item.title}>
                  <IconButton size='small' onClick={(e) => handleClick(e, item)}>
                    {item.rootIcon && <Icon name={item.rootIcon} />}
                    {!item.rootIcon && <Icon name={item.iconName} />}
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


const renderMenuItems = (items, click, options, children) => {
  return items.map((item, idx) => {
    return renderMenuItem(item, idx, click, options, children);
  });
};

const renderMenuItem = (item, idx, click, options, children) => {
  const isActive = hasActive(item, false);
  const isAllowed = hasPermission(item, options, children);
  if (!isAllowed || item.hideInMenu || !item.href) {
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
