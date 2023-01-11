import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { initApplication } from '../../redux/content';
import config from '../../admin.config';

class BaseContainer extends Component {
  trackPageView() {
    const { load } = this.analytics || {};
    const { onAnalytics } = this.props;
    if (load) {
      onAnalytics &&
        onAnalytics({
          type: 'pageview',
          ...load,
        });
    }
  }
  componentDidMount() {
    this.props.raiseAction(initApplication(config));
  }

  trackEvent({ eventName, category, section, action, label }) {
    const { onAnalytics } = this.props;
    eventName &&
      onAnalytics &&
      onAnalytics({
        type: 'event',
        eventName,
        category,
        section,
        action,
        label,
      });
  }

  render() {
    return (
      <div className="container-fluid">
        <h1>Not Implemented</h1>
      </div>
    );
  }
}

BaseContainer.propTypes = {
  onAnalytics: PropTypes.func,
  userStore: PropTypes.object,
  commonStore: PropTypes.object,
};

export default BaseContainer;
