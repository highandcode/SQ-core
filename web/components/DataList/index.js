import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '../Icon';

const DataList = ({ items = [] }) => {
  return (
    <div className="sq-data-list">
      <List>
        {items.map((item, idx) => {
          const { icon = {} } = item;
          return (
            <ListItem key={`li-${idx}`}>
              <ListItemIcon>
                <Icon name={item.iconName} {...icon} />
              </ListItemIcon>
              <ListItemText primary={item.title} secondary={item.subTitle ? item.subTitle : null} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default DataList;
