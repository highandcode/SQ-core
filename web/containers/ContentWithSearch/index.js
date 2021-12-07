import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import _ from 'lodash';
import Content from '../Content';
import Header from '../../components/ui/Header';
import './_content-with-search.scss';
import animateScrollTo from 'animated-scroll-to';

@inject('commonStore', 'contentStore')
@observer
class ContentWithSearch extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const { metaData = {}, pageData = {} } = this.props;
    const grouped = _.groupBy(pageData.items, 'group');
    this.setState({
      sortedGroups: Object.keys(grouped).sort((a, b) => {
        return a < b ? -1 : 1;
      }),
      grouped
    });
  }

  handleLeftClick(i, idx) {
    const offset = document.getElementById(`${i}${idx}`) && document.getElementById(`${i}${idx}`).offsetTop;
    if (document.querySelector('#app-body') && offset) {
      animateScrollTo(offset, { elementToScroll: document.querySelector('#app-body') });
    }
  }

  render() {
    const { metaData = {}, pageData = {}, ...rest } = this.props;
    const { className = '', pageLayout = {} } = pageData;
    const { grouped = {}, sortedGroups = [] } = this.state;
    return (
      <div className={`sq-search-content sq-content-page sq-content-page__body ${className}`}>
        {Object.keys(pageLayout).map((layoutKey) => {
          const layoutObj = pageLayout[layoutKey];
          const { className = '', ...restLayout } = layoutObj;
          return (
            <div className={`sq-layout-content__block ${className}`}>
              <Content flat={true} {...rest} pageData={{ ...restLayout }} />
            </div>
          );
        })}

        <div className="sq-search-content__root">
          <div className="container sq-search-content__container">
            <div className="row">
              <div className="col-xs-12 col-md-4 sq-search-content__left-nav">
                {sortedGroups.map((i, idx) => {
                  return (
                    <div className="sq-search-content__nav-block" onClick={() => this.handleLeftClick(i, idx)}>
                      {i}
                    </div>
                  );
                })}
              </div>
              <div className="col-xs-12 col-md-8 sq-search-content__right_content">
                {sortedGroups.map((i, idx) => {
                  return (
                    <>
                      <div className="sq-search-content__block">
                        <h2 id={`${i}${idx}`} className="sq-search-content__content-header">
                          {i}
                        </h2>
                        {grouped[i].map((restData) => {
                          return (
                            <>
                              <Header
                                className="sq-search-content__block-header"
                                headerTag={`h5`}
                                header={restData.title}
                                subHeader={restData.description}
                              />
                              <Content flat={true} {...rest} pageData={{ ...restData }} />
                            </>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ContentWithSearch.propTypes = {};

export default ContentWithSearch;
