import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Header from '../../components/ui/Header';
import LinkButton from '../../components/ui/LinkButton';
import { getMap } from '../../components';
import './_toc-index.scss';

@inject('commonStore', 'contentStore')
@observer
class TableOfContent extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { metaData = {}, pageData = {}, ...rest } = this.props;
    const { className = '' } = pageData;
    const categories = Object.keys(metaData.siblingPages || {});
    const compMap = getMap();
    return (
      <div className={`sq-content-toc sq-content-page__body ${className}`}>
        <Header header={pageData.title} className="text-center" />
        <div className="sq-content-toc__container">
          {categories &&
            categories.map((cat, idx) => {
              const category = metaData.siblingPages[cat];
              return (
                <div key={idx} className="sq-content-toc__item">
                  <h4 className="sq-content-toc__header ">{cat} </h4>
                  {category.map((data, cIdx) => {
                    return (
                      <div key={cIdx}>
                        <LinkButton to={data.path} buttonText={data.title} />
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

TableOfContent.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object
};

export default TableOfContent;
