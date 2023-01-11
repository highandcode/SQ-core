import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LinkButton from '../../components/ui/LinkButton';

import './_bread-crumb.scss';

// const { LinkButton } = root;

const hasPermission = (item, permissions) => {
  let result = false;
  if (permissions.indexOf(item.key) > -1 || !item.key) {
    return true;
  }
  return result;
};

const findNode = (data, path, permissions, parents = []) => {
  let returnItems = [];
  data.forEach((item) => {
    let newList;
    if (item.children) {
      parents.push(item);
      newList = findNode(item.children, path, permissions, parents);
    }
    if (newList?.length > 0) {
      returnItems = newList.concat(returnItems);
    }
    if (item.href?.toString().toLowerCase() === path?.toString().toLowerCase()) {
      if (parents) {
        parents.forEach((parent) => {
          if (parent.href && hasPermission(parent, permissions)) {
            returnItems.push({
              cmpType: 'Link',
              ...parent,
            });
          } else {
            returnItems.push({
              cmpType: 'Text',
              ...parent,
            });
          }
        });
      }
      returnItems.push({
        cmpType: 'Text',
        ...item,
      });
    }
  });
  if (returnItems.length === 0) {
    parents = parents.pop();
  }
  return returnItems;
};

const BreadCrumb = ({ navigation, currentPath, permissions = [], breadcrumb }) => {
  if (breadcrumb && breadcrumb.root) {
    currentPath = breadcrumb.root;
  }
  let finalData = findNode(navigation, currentPath, permissions);

  finalData = finalData.map((dataItem) => {
    const override = breadcrumb?.map[dataItem.href] || null;
    return {
      ...dataItem,
      ...override,
      cmpType: override ? 'Link' : dataItem.cmpType,
      title: override?.title || dataItem.title,
    };
  });
  if (breadcrumb?.items) {
    finalData = finalData.concat(breadcrumb.items);
  }
  return (
    <div className="sq-bread-crumbs">
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
        {finalData.map((item) => {
          if (item.cmpType === 'Link') {
            return <LinkButton key={item.href} buttonText={item.title} to={item.href} urlParams={item.urlParams}></LinkButton>;
          }
          return <Typography key={item.href}>{item.title}</Typography>;
        })}
      </Breadcrumbs>
    </div>
  );
};

BreadCrumb.propTypes = {
  navigation: PropTypes.array,
  breadcrumb: PropTypes.array,
  permissions: PropTypes.array,
  onClick: PropTypes.func,
  currentPath: PropTypes.string,
  logo: PropTypes.object,
};
export default BreadCrumb;
