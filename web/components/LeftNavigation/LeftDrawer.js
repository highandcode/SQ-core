import React from 'react';
import PropTypes from 'prop-types';
// import { root } from 'qubejs-core/web';
import Dialog from '../Dialog';
import Icon from '../Icon';
import LinkButton from '../ui/LinkButton';
import Button from '../ui/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import {
  hasPermission,
  hasActive,
  hasMatchingRoles,
  checkChildren,
} from './index';

const linksComps = {
  Button,
  LinkButton,
};
const LeftDrawer = ({
  logo = {},
  items = [],
  onClick,
  permissions = [],
  roles = [],
  openDrawer = false,
  onCloseDrawer,
  rightItems = [],
  onAnalytics
}) => {
  const [openItems, setOpenItems] = React.useState({});

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
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <nav>
          <List>
            {items.map((item, idx) => {
              console.log('@@@', item);
              const isAllowed = hasPermission(item, { permissions, roles });
              if (!isAllowed) {
                return undefined;
              }
              const isActive = hasActive(item);
              const isOpen =
                openItems[idx] !== undefined ? openItems[idx] : isActive;
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
                      {item.iconName && (
                        <ListItemIcon>
                          <Icon name={item.iconName} />
                        </ListItemIcon>
                      )}
                      <ListItemText primary={item.header || item.title} />
                      {item.children?.length > 0 ? (
                        isOpen ? (
                          <Icon name="arrow-up" />
                        ) : (
                          <Icon name="arrow-down" />
                        )
                      ) : undefined}
                    </ListItemButton>
                  </ListItem>
                  {item.children?.length > 0 && (
                    <Collapse in={isOpen} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {renderListItem(
                          item,
                          idx,
                          handleItemClick,
                          { permissions, roles },
                          false
                        )}
                        {item.children.map((subItem, subIdx) => {
                          return renderListItem(
                            subItem,
                            subIdx,
                            handleItemClick,
                            { permissions, roles },
                            false
                          );
                        })}
                      </List>
                    </Collapse>
                  )}
                </React.Fragment>
              );
            })}
          </List>
          {rightItems &&
            rightItems.map((ritem, idx) => {
              let Comp = linksComps.LinkButton;
              return (
                <div key={idx}>
                  <Comp
                    {...ritem}
                    onAnalytics={onAnalytics}
                    onClick={() => {
                      setOpen(false);
                    }}
                  />
                </div>
              );
            })}
        </nav>
      </Box>
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
    <ListItemButton
      selected={isActive}
      key={idx}
      sx={{ pl: 4 }}
      onClick={() => click(item)}
    >
      <ListItemIcon>
        <Icon name={item.iconName} />
      </ListItemIcon>
      <ListItemText primary={item.title} />
    </ListItemButton>
  );
};

LeftDrawer.propTypes = {
  items: PropTypes.array,
  permissions: PropTypes.array,
  roles: PropTypes.array,
  openDrawer: PropTypes.bool,
  onClick: PropTypes.func,
  onCloseDrawer: PropTypes.func,
  logo: PropTypes.object,
};
export default LeftDrawer;
