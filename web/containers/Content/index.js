import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { getMap } from '../../components';
import './_content.scss';

@inject('commonStore', 'contentStore')
@observer
class Content extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { pathname } = this.props.location;
    const { pageData = {}, ...rest } = this.props;
    const { className = '' } = pageData;
    const compMap = getMap();
    return (
      <div className={`sq-content-page__body ${className}`}>
        {pageData.items &&
          pageData.items.map((block, idx) => {
            const Comp = compMap[block.component];
            return Comp ? <Comp key={pathname + idx} {...rest} {...block} /> : undefined;
          })}
      </div>
    );
  }
}

Content.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object
};

export default Content;
