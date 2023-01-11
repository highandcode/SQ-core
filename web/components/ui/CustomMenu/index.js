import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '../IconButton';

import './_custom-menu.scss';

export const CustomMenu = ({
  header = 'No header',
  iconName = 'default',
  iconSize = 'normal',
  children,
  onOpen,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="sq-custom-menu">
      <IconButton iconName={iconName} iconSize={iconSize} onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        open={open}
        className={`sq-custom-menu__menu`}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            minWidth: 100,
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
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <div className="sq-custom-menu__header">{header}</div>
        {children}
      </Menu>
    </div>
  );
};
