import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Icon from '../Icon';
import './data-list.scss';

const DataList = ({ className = '', items = [] }) => {
  return (
    <div className={`sq-data-list ${className}`}>
      <List>
        {items.map((item, idx) => {
          const { icon = {} } = item;
          return (
            <>
              <ListItem key={`li-${idx}`}>
                <ListItemIcon>
                  <Icon name={item.iconName} {...icon} />
                </ListItemIcon>
                <ListItemText primary={item.title} secondary={item.subTitle ? item.subTitle : null} />
              </ListItem>
              {item.items && item.items.length > 0 && <DataList className={`sq-data-list__child`} items={item.items} />}
            </>
          );
        })}
      </List>
    </div>
  );
};

export default DataList;
