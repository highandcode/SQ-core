import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import BottomNavigation from '../../components/BottomNavigation';
import { redirectTo } from '../../utils/redirect';
import browser from '../../utils/browser';

@inject('commonStore', 'authStore')
@observer
class MultiView extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { className = '', views = [], defaultView, ...rest } = this.props;
    const viewName = defaultView || (views.length > 0 ? views[0].name : '');
    const { routeName, location = {} } = rest;
    const { pathname } = location;
    return (
      <div className={`multi-view screen ${className}`}>
        <div className="screen__content">
          <Switch>
            {views.map((view) => {
              const { container: Container, name } = view;
              return (
                <Route
                  key={name}
                  path={`${routeName}/${name}`}
                  render={(props) => {
                    return <Container {...rest} {...props} />;
                  }}
                />
              );
            })}
            {viewName && <Redirect from={routeName} to={`${routeName}/${viewName}`} />}
          </Switch>
        </div>
        <div className="screen__footer">
          <BottomNavigation
            onChange={(value) => {
              redirectTo(value);
            }}
            iconOnly={browser.breakpoints.down('sm')}
            value={pathname}
            links={views.map((view) => {
              return {
                label: view.label,
                icon: view.iconName,
                value: `${routeName}/${view.name}`
              };
            })}
          />
        </div>
      </div>
    );
  }
}

MultiView.propTypes = {
  commonStore: PropTypes.object,
  authStore: PropTypes.object,
  store: PropTypes.object
};

export default MultiView;
