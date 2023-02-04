import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from '../Content';
import NavigationList from '../../components/ui/NavigationList';

class ComponentDemo extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { metaData = {}, pageData = {}, ...rest } = this.props;
    if (pageData.javascript) {
      eval(pageData.javascript);
    }
  }
  render() {
    const { metaData = {}, pageData = {}, transitionClass, ...rest } = this.props;
    const { className = '' } = pageData;
    return (
      <div className={`sq-content-doc sq-content-page__body ${className}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <NavigationList links={metaData.siblingPages} />
            </div>
            <div className={`col-xs-12 col-md-9 ${transitionClass}`}>
              <Content pageData={pageData} {...rest} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ComponentDemo.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object
};

export default ComponentDemo;
