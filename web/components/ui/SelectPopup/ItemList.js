import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputField from '../InputField';
import Link from '../Link';
import Dialog from '../../Dialog';
import './select-popup.scss';
import { getValue } from '../../../utils/properties';
import Icon from '../../Icon';

const applyFilter = (data, filter, fields = []) => {
  if (!filter) {
    return data;
  }
  const items = _.filter(data, (item) => {
    let isMatch = false;
    Object.keys(item).forEach((fieldName) => {
      if (fields.indexOf(fieldName) > -1) {
        if (!isMatch) {
          isMatch = new RegExp(filter, 'gi').test(item[fieldName]);
        }
      }
    });
    return isMatch;
  });
  return items;
};

const ItemList = ({
  data,
  title,
  textField,
  labelSearch,
  valueField,
  itemTemplate,
  iconField,
  iconProps = {}, 
  iconType = 'img',
  onSelect,
  noDataMessage = 'No data found'
}) => {
  const [timer, setTimerData] = useState(undefined);
  const [filterData, setData] = useState(data); // applyFilter(data, filterText, [textField, valueField]);
  return (
    <div className="sq-select-popup-item-list">
      <InputField
        label={labelSearch}
        onKeyPress={(inputData) => {
          if (timer) {
            clearTimeout(timer);
            setTimerData(undefined);
          }
          setTimerData(
            window.setTimeout(() => {
              setData(applyFilter(data, inputData.value, [textField, valueField]));
            }, 500)
          );
        }}
      />
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {title}
          </ListSubheader>
        }
      >
        {filterData && filterData.length === 0 && noDataMessage}
        {filterData &&
          filterData.map((dataItem, index) => {
            return (
              <ListItem
                key={index}
                button
                onClick={() => {
                  onSelect && onSelect(dataItem[valueField], dataItem);
                }}
              >
                {itemTemplate && itemTemplate(dataItem)}
                {!itemTemplate && (
                  <>
                    {iconField && (
                      <ListItemIcon>
                        {iconType === 'img' && <img alt={dataItem[textField]} src={dataItem[iconField]}></img>}
                        {iconType === 'icon' && <Icon textIcon={dataItem[textField].substr(0,1)} name={dataItem[iconField]} {...iconProps} />}
                      </ListItemIcon>
                    )}
                    <ListItemText primary={dataItem[textField]} />
                  </>
                )}
              </ListItem>
            );
          })}
      </List>
    </div>
  );
};

ItemList.propTypes = {};

export default ItemList;
