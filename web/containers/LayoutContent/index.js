import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Content from '../Content';
import './_layout-content.scss';
@inject('commonStore', 'contentStore')
@observer
class LayoutContent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { metaData = {}, pageData = {}, ...rest } = this.props;
    eval(pageData.javascript);
  }

  render() {
    const { metaData = {}, pageData = {}, ...rest } = this.props;
    const { className = '', pageLayout = {} } = pageData;
    return (
      <div className={`sq-layout-content sq-content-page__body ${className}`}>
        <div className="container-fluid">
          <div className="row">
            {Object.keys(pageLayout).map((layoutKey) => {
              const layoutObj = pageLayout[layoutKey];
              const { className = '', ...restLayout } = layoutObj;
              return (
                <div className={`sq-layout-content__block ${className}`}>
                  <Content flat={true} {...rest} pageData={{ ...restLayout }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

LayoutContent.propTypes = {};

export default LayoutContent;
