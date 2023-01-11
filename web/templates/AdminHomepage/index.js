import React from 'react';
import PropTypes from 'prop-types';
import GlobalNavigation from '../../components/ui/GlobalNavigation';
import Footer from '../../components/ui/Footer';
import BaseContainer from '../../containers/BaseContainer';

class Homepage extends BaseContainer {
  constructor() {
    super();
  }

  render() {
    const { children, pageData = {}, data = {}, store } = this.props;
    const { metaData = {}, siteMap = {} } = data;
    let props = {};
    if (!store.authentication?.currentUser) {
      props = { ...siteMap.siteMap.globalNavigation };
    } else {
      props = { ...siteMap.siteMap.globalNavigationLoggedIn };
    }
    return (
      <div
        className={`sq-content-page sq-content-page--header-footer-body  ${
          pageData.className || ''
        }`}
      >
        <header>
          <GlobalNavigation
            logo={siteMap.siteMap.logo}
            items={metaData.navigation}
            {...props}
          />
        </header>
        {children}
        <footer>
          <Footer
            logo={siteMap.siteMap.logo}
            items={metaData.navigation}
            {...siteMap.siteMap.globalFooter}
          />
        </footer>
      </div>
    );
  }
}

Homepage.propTypes = {
  children: PropTypes.node,
  pageData: PropTypes.object,
  userStore: PropTypes.object,
  data: PropTypes.object,
};

export default Homepage;
