import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { timer } from '../../utils/timer';
import Progress from '../../components/Progress';
import Content from '../Content';
import Default from './Default';
import LayoutContent from '../LayoutContent';
import Documentation from '../Documentation';
import ContentWithLeftNavigation from '../ContentWithLeftNavigation';
import TocIndex from '../TocIndex';
import ComponentDemo from '../ComponentDemo';

import './_dynamic-content.scss';

const _window = window;
let containers = {
  Default,
  LayoutContent,
  Documentation,
  ContentWithLeftNavigation,
  TocIndex,
  ComponentDemo
};

export const registerContainers = (newContainers) => {
  containers = {
    ...containers,
    ...newContainers
  };
};

@inject('commonStore', 'contentStore')
@observer
class DynamicContent extends Component {
  constructor() {
    super();
    this.state = {
      pageData: {},
      page: {
        pageYOffset: _window.pageYOffset,
        innerHeight: _window.innerHeight
      }
    };
    this.handlePageScroll = this.handlePageScroll.bind(this);
  }

  handlePageScroll(e) {
    if (this.scrollExecuting) {
      return;
    }
    this.scrollExecuting = _window.setTimeout(() => {
      this.setState(
        {
          page: {
            ...this.state.page,
            pageYOffset: _window.pageYOffset,
            innerHeight: _window.innerHeight
          }
        },
        () => {
          this.scrollExecuting = null;
        }
      );
    }, 300);
  }

  async componentDidMount() {
    const { location = {}, url: overrideUrl } = this.props;
    this.setState(
      {
        url: overrideUrl || location.pathname
      },
      () => {
        this.fetchPage(true);
      }
    );
    window.addEventListener('scroll', this.handlePageScroll);
    window.addEventListener('resize', this.handlePageScroll);
  }

  async fetchPage(firstTime) {
    const { location = {}, onAnalytics, transitionSpeed = 300 } = this.props;
    if (!firstTime) {
      this.setState({
        isOut: true
      });
      await timer.delay(transitionSpeed);
    }
    const interval = window.setTimeout(() => {
      this.setState({
        isLoading: true
      });
    }, 300);
    const pageData = await this.props.contentStore.getPage(this.state.url);
    window.clearTimeout(interval);
    const { analytics = {} } = pageData;
    this.setState({
      isLoading: false,
      pageData
    });
    onAnalytics &&
      onAnalytics({
        type: 'pageview',
        page_title: pageData.pageData.title,
        ...analytics.load
      });
    this.setState({
      isOut: false,
      isIn: true
    });
    await timer.delay(transitionSpeed);
    this.setState({
      isOut: false,
      isIn: false
    });
  }

  async componentDidUpdate() {
    const { location = {}, url: overrideUrl } = this.props;
    if (this.state.url != (overrideUrl || location.pathname)) {
      this.setState(
        {
          url: overrideUrl || location.pathname
        },
        () => {
          this.fetchPage();
        }
      );
    }
  }


  render() {
    const { containerTemplate: overrideContainerTemplate, ...allProps } = this.props;
    const { dataPacket } = allProps;
    const { pageData = {}, metaData } = this.state.pageData;
    const { container, containerTemplate, contentBodyClass = '', rootClassName = '', transition = {} } = pageData;
    const ContentContainer = containers[overrideContainerTemplate || containerTemplate] || containers.Default;
    const ContentTemplContainer = containers[container] || Content;
    const { out: tranOut = 'out-up', in: tranIn = 'out-in', loading = 'loading' } = transition;
    const classState = this.state.isOut ? `transition transition-page--${tranOut}` : this.state.isIn ? `transition transition-page--${tranIn}` : '';
    const loadingState = this.state.isLoading ? `transition transition-page--${loading}` : '';
    const userData = { ...this.props.contentStore.userData, ...dataPacket, contentPage: true };
    return (
      <div className={`dynamic-content row ${rootClassName} ${loadingState}`}>
        <ContentContainer
          {...allProps}
          pageData={pageData}
          metaData={metaData}
          data={this.state.pageData}
          pageState={this.state.page}
          userData={userData}
        >
          <div className={`${contentBodyClass} dynamic-content__body ${classState}`}>
            <ContentTemplContainer
              {...allProps}
              pageData={pageData}
              metaData={metaData}
              data={this.state.pageData}
              userData={userData}
              pageState={this.state.page}
            />
          </div>
        </ContentContainer>
        {this.state.isLoading && <Progress style={'fixed'} overlayStyle='full' />}
      </div>
    );
  }
}

DynamicContent.propTypes = {
  commonStore: PropTypes.object,
  contentStore: PropTypes.object
};

export default DynamicContent;
